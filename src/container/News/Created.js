import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import classnames from 'classnames';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NewActions, CategoryActions, FormBuilderActions, MediaActions, GroupActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { map } from 'lodash';
import history from 'helpers/history';
import { connect } from 'react-redux';
import ModalMedia from '../../components/Media/ModalMedia';
import UploadAdapter from '../../services/uploadImage';
import { useForm } from 'react-hook-form';

const PropsType = {
  listOptions: PropTypes.array,
  listForm: PropTypes.array,
  getCategory: PropTypes.func,
  newsCreate: PropTypes.func,
  getForm: PropTypes.func,
  imageSeletedata: PropTypes.object,
  addFiles: PropTypes.func
};
function NewsCreate({ newsCreate, getCategory, listOptions, listForm, getForm, imageSeletedata, addFiles }) {
  const [formState, setFormState] = useState({
    values: {
      description: '',
      categories: []
    },
    touched: {}
  });

  const [activeTab, setActiveTab] = useState('1');
  const { t } = useTranslation();
  const [status, setStatus] = useState({
    description: false,
    categories: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getCategory();
    getForm();
  }, [getCategory, getForm]);

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
    Success('Tạo thành công');
    history.push('/news/list');
  };

  const onFail = () => {
    Error('Tạo thất bại');
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
      Error(t('errors.create'));
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
  const createdNews = () => {
    const body = {
      ...formState.values,
      newsBlocks: []
    };
    console.log(status);
    if (status.description === false && status.categories === false) newsCreate(body, onSuccess, onFail);
    else Error(t('errors.create'));
  };
  return (
    <React.Fragment>
      <Row style={{ background: '#fff', padding: '15px 0' }}>
        <Col>
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
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(createdNews)}>
                <h4>{t('create')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('title')}</Label>
                  <input
                    type="text"
                    name="title"
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
                    config="my_styles"
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      ckEditorChange(event, data);
                    }}
                    onInit={editor => {
                      editor.ui.view.editable.element.style.height = 'auto%';
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
                  <Input type="text" name="author_name" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('baseImages')}</Label>
                  <div style={{ maxHeight: '100px', maxWidth: '100px' }} className="mb-2">
                    <img
                      src={formState.values.base_image === undefined ? '' : formState.values.base_image}
                      style={{ maxWidth: '100px' }}
                      alt="logo"
                    />
                  </div>
                  <ModalMedia setState={onSetState} />
                </FormGroup>
                <div className="check__box">
                  <Label>{t('sticky')}</Label>
                  <div>
                    <Input type="checkbox" name="is_sticky" onChange={handleChange} />
                    <span>{t('category_page.form.activeCategory')}</span>
                  </div>
                </div>
                <FormGroup>
                  <Label for="exampleSelect">{t('category')}</Label>
                  <Select
                    name="categorys"
                    closeMenuOnSelect={false}
                    components={makeAnimated}
                    options={map(listOptions, values => {
                      return {
                        value: values.id,
                        label: values.name
                      };
                    })}
                    isMulti
                    onChange={handleChangeSelect}
                  />
                  {formState.values.categories.length === 0 && status.categories && (
                    <span style={{ color: 'red' }}>{t('errors.minone')}</span>
                  )}
                </FormGroup>
                <Button color="primary" type="submit" onClick={handleError}>
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(createdNews)}>
                <h4>{t('seo')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('meta.title')}</Label>
                  <input
                    type="text"
                    name="meta_title"
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
                  <Input type="text" name="url" value={formState.values.title} onChange={handleChange} />
                </FormGroup>
                <Button color="primary" type="submit" onClick={handleError}>
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
}

NewsCreate.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    listOptions: state.GroupReducer.listCategories,
    listForm: state.FormBuilderReducer.listForm,
    imageSeletedata: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  newsCreate: NewActions.AddNews,
  getCategory: GroupActions.getGroupByUserAction,
  getForm: FormBuilderActions.getFormAction,
  addFiles: MediaActions.AddImages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsCreate);
