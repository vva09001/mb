import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NewActions, CategoryActions, FormBuilderActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import { map } from 'lodash';
import history from 'helpers/history';
import classnames from 'classnames';
import { connect } from 'react-redux';

const PropsType = {
  listForm: PropTypes.array,
  listOptions: PropTypes.array,
  detail: PropTypes.object,
  editNew: PropTypes.func,
  getCategory: PropTypes.func,
  getForm: PropTypes.func
};

function Edit({ detail, editNew, getCategory, listOptions, listForm, getForm }) {
  const [formState, setFormState] = useState({
    values: detail,
    touched: {}
  });

  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  useEffect(() => {
    getCategory();
    getForm();
  }, [getCategory, getForm]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
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

  const onSuccess = () => {
    Success('Sửa thành công');
    history.goBack();
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
      url: '',
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={editNews}>
            <h4>{t('edit')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="title" value={formState.values.title} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('summary')}</Label>
              <Input
                type="textarea"
                name="shortDescription"
                rows="5"
                value={formState.values.shortDescription}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>{t('description')}</Label>
              <CKEditor
                editor={ClassicEditor}
                data={formState.values.description}
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
              <Input type="file" name="base_Images" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('category')}</Label>
              <Input type="select" name="category" value={formState.values.category} onChange={handleChange}>
                <option>Chọn...</option>
                {map(listOptions, value => (
                  <option value={value.id} key={value.id}>
                    {value.name}
                  </option>
                ))}
              </Input>
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
            <Button color="primary" type="submit">
              {t('edit')}
            </Button>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={editNews}>
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
            <Button color="primary" type="submit">
              {t('save')}
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
    listForm: state.FormBuilderReducer.listForm
  };
};

const mamapDispatchToProps = {
  editNew: NewActions.EditNew,
  getCategory: CategoryActions.getCategoryAction,
  getForm: FormBuilderActions.getFormAction
};

export default connect(
  mapStateToProps,
  mamapDispatchToProps
)(Edit);
