import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NewActions, CategoryActions, FormBuilderActions } from '../../store/actions';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import history from 'helpers/history';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const PropsType = {
  detail: PropTypes.object,
  editNew: PropTypes.func,
  AprrNew: PropTypes.func,
  listOptions : PropTypes.array,
  getCategory: PropTypes.func,
  getForm: PropTypes.func,
  listForm: PropTypes.array,
};

function AprrEdit({ detail, AprrNew, getCategory, listOptions, listForm, getForm, getNewsId }) {
  let { id } = useParams();
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

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
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

  const onSuccess = () => {
    Success('Phê Duyệt Thành Công');
    history.goBack();
  };

  const onFail = () => {
    Error('Phê Duyệt Thất Bại');
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
  const aprrNews = event => {
    event.preventDefault();
    const body = {
      ...formState.values,
      newsBlocks: []
    };
    AprrNew(formState.values, onSuccess, onFail, body);
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={aprrNews}>
            <h4>{t('edit')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="title" 
              value={formState.values.title === undefined ? '' : formState.values.title}
              onChange={handleChange} />
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
              <Input type="text" name="author_name" value={formState.values.author_name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">{t('baseImages')}</Label>
              <Input type="file" name="base_image" id="exampleFile" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('category')}</Label>
              <Input type="select" name="category" 
              value={formState.values.category} onChange={handleChange}>
                <option>{t('select')}</option>
                {map(listOptions, value => (
                  <option value={value.id} key={value.id}>
                    {value.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                {t('approved.approved')}
              </Button>
            </FormGroup>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={aprrNews}>
            <h4>{t('edit')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('meta.title')}</Label>
              <Input type="text" name="meta_title" value={formState.values.meta_title} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>{t('meta.keywords')}</Label>
              <Input type="text" name="meta_keyword" value={formState.values.meta_keyword} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('meta.description')}</Label>
              <Input
                type="textarea"
                name="meta_description"
                value={formState.values.meta_description}
                rows="5"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
              {t('approved.approved')}
              </Button>
            </FormGroup>
          </Form>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}

AprrEdit.propTypes = PropsType;

const mapStateToProps = state => {
  return { 
    detail: state.NewReducer.detail,
    listOptions: state.CategoryReducer.listOption,
    listForm: state.FormBuilderReducer.listForm
  };
};

const mapDispatchToProps = {
  AprrNew: NewActions.AprrNew,
  getCategory: CategoryActions.getCategoryAction,
  getForm: FormBuilderActions.getFormAction,
  getNewsId: NewActions.GetNewsId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AprrEdit);
