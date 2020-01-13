import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NewActions, CategoryActions, FormBuilderActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { map } from 'lodash';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ModalMedia from '../../components/Media/ModalMedia';

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

  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();
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
    map(event, items => arr.push(items.value));
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        categorys: arr
      },
      touched: {
        ...formState.touched,
        categorys: true
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

  const editNews = event => {
    event.preventDefault();
    const body = {
      ...formState.values,
      newsBlocks: []
    };
    editNew(body, onSuccess, onFail);
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
          <Form className="p-3" style={{ background: '#fff' }}>
            <h4>{t('edit')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input
                type="text"
                name="title"
                value={formState.values.title === undefined ? '' : formState.values.title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('summary')}</Label>
              <Input
                type="textarea"
                name="shortDescription"
                rows="5"
                value={formState.values.shortDescription === undefined ? '' : formState.values.shortDescription}
                onChange={handleChange}
              />
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
              />
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
                <Input
                  type="checkbox"
                  name="is_active"
                  checked={formState.values.is_active === 0 ? false : true}
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
                // value={{ value: formState.values.category, label: '123' }}
                options={map(listOptions, values => {
                  return {
                    value: values.id,
                    label: values.name
                  };
                })}
                isMulti
                onChange={handleChangeSelect}
              />
            </FormGroup>
            <Button color="primary" onClick={editNews}>
              {t('edit')}
            </Button>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form className="p-3" style={{ background: '#fff' }}>
            <h4>{t('edit')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('meta.title')}</Label>
              <Input
                type="text"
                name="meta_title"
                value={formState.values.meta_title === null ? '' : formState.values.meta_title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>{t('meta.keywords')}</Label>
              <Input
                type="text"
                name="meta_keyword"
                value={formState.values.meta_keyword === undefined ? '' : formState.values.meta_keyword}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('meta.description')}</Label>
              <Input
                type="textarea"
                name="meta_description"
                value={formState.values.meta_description === undefined ? '' : formState.values.meta_description}
                rows="5"
                onChange={handleChange}
              />
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
            <Button color="primary" onClick={editNews}>
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
    listOptions: state.CategoryReducer.listOption,
    listForm: state.FormBuilderReducer.listForm,
    imageSeletedata: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  editNew: NewActions.EditNew,
  getCategory: CategoryActions.getCategoryAction,
  getForm: FormBuilderActions.getFormAction,
  getNewsId: NewActions.GetNewsId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
