import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { PageActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from '../../helpers/notify';
import history from '../../helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  pagesCreate: PropTypes.func
};

function PagesCreate({ pagesCreate }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { t } = useTranslation();

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: (event.target.type === 'checkbox' ? (event.target.checked==false ? 0 : 1) : event.target.value)
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    
  };

const onSuccess = () => {
    Success('Tạo thành công');
    history.goBack();
  };

  const onFail = () => {
    Error('Tạo thất bại');
  };

  const createdPages = event => {
    event.preventDefault();    
    pagesCreate(formState.values, onSuccess, onFail);
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={createdPages}>
            <h4>{t('create')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="name" id="exampleName" onChange={handleChange} />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="status" value={0}  onChange={handleChange} />{' '}
                Enable the page
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="has_sidebar"  onChange = {handleChange} />{' '}
                Enable sidebar
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="template">Select</Label>
              <Input type="select" name="template" id="template" onChange={handleChange} >
                  <option>Default</option>
                  <option>Full</option>                  
              </Input>
            </FormGroup>
            <Button color="primary" type="submit">
              {t('save')}
            </Button>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={createdPages}>
            <h4>{t('seo')}</h4>
            <FormGroup>
              <Label for="exampleName">Slug</Label>
              <Input type="text" name="slug" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Meta Title</Label>
              <Input type="text" name="meta_title" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Meta keywords</Label>
              <Input type="text" name="meta_keywords" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Meta Description</Label>
              <Input type="textarea" name="meta_description" rows="5" onChange={handleChange} />
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

PagesCreate.propTypes = PropsType;

const mapDispatchToProps = {
  pagesCreate: PageActions.AddPages
};

export default connect(
  null,
  mapDispatchToProps
)(PagesCreate);
