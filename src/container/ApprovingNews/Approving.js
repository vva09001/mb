import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NewActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import history from 'helpers/history';
import classnames from 'classnames';
import { connect } from 'react-redux';

const PropsType = {
  detail: PropTypes.object,
  editNew: PropTypes.func,
  AprrNew: PropTypes.func
};

function AprrEdit({ detail, aprrNew }) {
  const [formState, setFormState] = useState({
    values: detail,
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
    aprrNew(formState.values, onSuccess, onFail)    
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
              <Input type="text" name="name" value={formState.values.name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('summary')}</Label>
              <Input type="textarea" name="slug" rows="5" value={formState.values.slug} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">{t('imgDescription')}</Label>
              <Input type="file" name="file" id="exampleFile" />
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
              <Input type="file" name="file" id="exampleFile" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('category')}</Label>
              <Input
                type="select"
                name="category_news_id"
                value={formState.values.category_news_id}
                onChange={handleChange}
              >
                <option value={0}>Tin tức</option>
                <option value={1}>Doanh nghiệp</option>
                <option value={2}>Hoạt động</option>
              </Input>
            </FormGroup>  
            <FormGroup>          
              <Button color="primary" type="submit">
                Phê Duyệt                        
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
                Phê Duyệt                        
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
  return { detail: state.NewReducer.detail };
};

const mapDispatchToProps = {  
  aprrNew: NewActions.AprrNew
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AprrEdit);
