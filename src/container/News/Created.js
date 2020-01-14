import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import classnames from 'classnames';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NewActions, CategoryActions, FormBuilderActions, MediaActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { map } from 'lodash';
import history from 'helpers/history';
import { connect } from 'react-redux';
import ModalMedia from '../../components/Media/ModalMedia';
import UploadAdapter from '../../services/uploadImage';

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
    values: {},
    touched: {}
  });

  const [activeTab, setActiveTab] = useState('1');
  const { t } = useTranslation();

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

  // const upload = loader => {
  //   let formData = new FormData();
  //   formData.append('files', loader.file);
  //   formData.append('folderName', 'News/');
  //   addFiles(formData);
  // };
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

  const createdNews = event => {
    event.preventDefault();
    const body = {
      ...formState.values,
      newsBlocks: []
    };
    newsCreate(body, onSuccess, onFail);
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
              <Form className="p-3" style={{ background: '#fff' }}>
                <h4>{t('create')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('name')}</Label>
                  <Input type="text" name="title" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">{t('summary')}</Label>
                  <Input type="textarea" name="shortDescription" rows="5" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>{t('description')}</Label>
                  <CKEditor
                    editor={ClassicEditor}
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
                </FormGroup>
                <FormGroup>
                  <Label>{t('authName')}</Label>
                  <Input type="text" name="author_name" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('baseImages')}</Label>
                  <img
                    src={formState.values.base_image === undefined ? '' : formState.values.base_image}
                    style={{ width: '100px' }}
                    alt="logo"
                  />
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
                </FormGroup>
                <Button color="primary" type="submit" onClick={createdNews}>
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Form className="p-3" style={{ background: '#fff' }}>
                <h4>{t('seo')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('meta.title')}</Label>
                  <Input type="text" name="meta_title" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>{t('meta.keywords')}</Label>
                  <Input type="text" name="meta_keyword" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">{t('meta.description')}</Label>
                  <Input type="textarea" name="meta_description" rows="5" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>{t('URL')}</Label>
                  <Input type="text" name="url" value={formState.values.title} onChange={handleChange} />
                </FormGroup>
                <Button color="primary" type="submit" onClick={createdNews}>
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
    listOptions: state.CategoryReducer.listOption,
    listForm: state.FormBuilderReducer.listForm,
    imageSeletedata: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  newsCreate: NewActions.AddNews,
  getCategory: CategoryActions.getCategoryAction,
  getForm: FormBuilderActions.getFormAction,
  addFiles: MediaActions.AddImages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsCreate);
