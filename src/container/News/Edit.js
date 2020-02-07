import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NewActions, FormBuilderActions, GroupActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { map } from 'lodash';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ModalMedia from '../../components/Media/ModalMedia';
import UploadAdapter from '../../services/uploadImage';
import { useForm } from 'react-hook-form';

const PropsType = {
  listForm: PropTypes.array,
  listOptions: PropTypes.array,
  detail: PropTypes.object,
  editNew: PropTypes.func,
  getCategory: PropTypes.func,
  getForm: PropTypes.func,
  getNewsId: PropTypes.func,
  imageSeletedata: PropTypes.object
};

function Edit({ detail, editNew, getCategory, listOptions, listForm, getForm, getNewsId, imageSeletedata }) {
  const { id } = useParams();
  const [formState, setFormState] = useState({
    values: {
      description: '',
      categories: []
    },
    touched: {}
  });
  const [status, setStatus] = useState({
    description: false,
    categories: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();
  useEffect(() => {
    getNewsId(id);
    getCategory();
    getForm();
  }, [getCategory, getForm, getNewsId, id]);

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detail
    }));
  }, [detail]);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const onSetState = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        base_image: imageSeletedata.url
      }
    }));
  };
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    if (event.target.name === 'name') {
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]: event.target.value
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true
        }
      }));
    }
  };

  const handleChangeSelect = event => {
    let arr = [];
    map(event, items => arr.push({ id: items.value, name: items.label }));
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        categories: arr
      },
      touched: {
        ...formState.touched,
        categories: true
      }
    }));
  };

  const onSuccess = () => {
    Success('Sửa thành công');
  };

  const onFail = () => {
    Error('Sửa thất bại');
  };
  const ckEditorChange = (event, data) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        description: data
      },
      touched: {
        ...formState.touched,
        description: true
      }
    }));
  };
  const handleError = async () => {
    var title = await triggerValidation('title');
    var shortDescription = await triggerValidation('shortDescription');
    var meta_title = await triggerValidation('meta_title');
    var meta_keyword = await triggerValidation('meta_keyword');
    var meta_description = await triggerValidation('meta_description');
    if (
      title === false ||
      shortDescription === false ||
      meta_title === false ||
      meta_keyword === false ||
      meta_description === false
    )
      Error(t('errors.edit'));
      if (formState.values.description === '')
      setStatus(status => ({
        ...status,
        description: true
      }));
      else {
        setStatus(status => ({
          ...status,
          description: false
        }));
      }
    if (formState.values.categories.length === 0)
      setStatus(status => ({
        ...status,
        categories: true
      }));
      else {
        setStatus(status => ({
          ...status,
          categories: false
        }));
      }
  };

  const editNews = () => {
    const body = {
      ...formState.values,
      newsBlocks: []
    };
    if (status.description === false && status.categories === false) editNew(body, onSuccess, onFail);
    else Error(t('errors.edit'));
  };
  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            {t('general')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            {t('seo')}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(editNews)}>
            <h4>{t('edit')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <input
                type="text"
                name="title"
                value={formState.values.title === undefined ? '' : formState.values.title}
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.title === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.title && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('summary')}</Label>
              <input
                type="textarea"
                name="shortDescription"
                rows="5"
                value={formState.values.shortDescription === undefined ? '' : formState.values.shortDescription}
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.shortDescription === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.shortDescription && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
              <Label>{t('description')}</Label>
              <CKEditor
                editor={ClassicEditor}
                data={formState.values.description === undefined ? '' : formState.values.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  ckEditorChange(event, data);
                }}
                onInit={editor => {
                  editor.ui.view.editable.element.style.height = 'auto';
                  editor.plugins.get('FileRepository').createUploadAdapter = function(loader) {
                    return new UploadAdapter(loader);
                  };
                }}
              />
              {formState.values.description === '' && status.description && (
                <span style={{ color: 'red' }}>{t('errors.required')}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>{t('authName')}</Label>
              <Input
                type="text"
                name="author_name"
                value={formState.values.author_name === undefined ? '' : formState.values.author_name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <img
                src={formState.values.base_image === undefined ? '' : formState.values.base_image}
                style={{ width: '100px' }}
                alt="icon"
              />
              <ModalMedia setState={onSetState} />
            </FormGroup>
            <div className="check__box">
              <Label>{t('sticky')}</Label>
              <div>
                <Input
                  type="checkbox"
                  name="is_sticky"
                  checked={formState.values.is_sticky === 0 ? false : true}
                  onChange={handleChange}
                />
                <span>{t('category_page.form.activeCategory')}</span>
              </div>
            </div>
            <FormGroup>
              <Label for="exampleSelect">{t('category')}</Label>
              <Select
                name="categorys"
                closeMenuOnSelect={false}
                components={makeAnimated}
                value={map(formState.values.categories, items => {
                  return {
                    value: items.id,
                    label: items.name
                  };
                })}
                options={map(listOptions, values => {
                  return {
                    value: values.id,
                    label: values.name
                  };
                })}
                isMulti
                onChange={handleChangeSelect}
              />
              {status.categories && <span style={{ color: 'red' }}>{t('errors.minone')}</span>}
            </FormGroup>
            <Button color="primary" type="submit" onClick={handleError}>
              {t('edit')}
            </Button>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(editNews)}>
            <h4>{t('edit')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('meta.title')}</Label>
              <input
                type="text"
                name="meta_title"
                value={formState.values.meta_title === null ? '' : formState.values.meta_title}
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.meta_title === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.meta_title && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
              <Label>{t('meta.keywords')}</Label>
              <input
                type="text"
                name="meta_keyword"
                value={formState.values.meta_keyword === undefined ? '' : formState.values.meta_keyword}
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.meta_keyword === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.meta_keyword && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('meta.description')}</Label>
              <input
                type="textarea"
                name="meta_description"
                value={formState.values.meta_description === undefined ? '' : formState.values.meta_description}
                rows="5"
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.meta_description === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.meta_description && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
              <Label>{t('URL')}</Label>
              <Input
                type="text"
                name="url"
                value={formState.values.url === undefined ? '' : formState.values.url}
                onChange={handleChange}
              />
            </FormGroup>
            <Button color="primary" type="submit"  onClick={handleError}>
              {t('edit')}
            </Button>
          </Form>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}

Edit.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    detail: state.NewReducer.detail,
    listOptions: state.GroupReducer.listCategories,
    listForm: state.FormBuilderReducer.listForm,
    imageSeletedata: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  editNew: NewActions.EditNew,
  getCategory: GroupActions.getGroupByUserAction,
  getForm: FormBuilderActions.getFormAction,
  getNewsId: NewActions.GetNewsId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
