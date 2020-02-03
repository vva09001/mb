import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { PageActions } from 'store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import history from 'helpers/history';

const PropsType = {
  detail: PropTypes.object,
  apprPage: PropTypes.func
};

function PagesAppr({ detail, apprPage }) {
  const [formState, setFormState] = useState({
    values: detail,
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
        [event.target.name]:
          event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const onSubmit = event => {
    event.preventDefault();
    apprPage(formState.values);
    history.push('/pages/approved_listings');
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmit}>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input
                type="text"
                name="name"
                value={formState.values.name === undefined ? '' : formState.values.name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="is_active"
                  checked={formState.values.is_active === 0 || formState.values.is_active === undefined ? false : true}
                  value={formState.values.is_active === 0 ? false : formState.values.is_active}
                  onChange={handleChange}
                />
                {t('page.active')}
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="status"
                  checked={formState.values.status === 0 || formState.values.status === undefined ? false : true}
                  value={formState.values.status === 0 ? false : formState.values.status}
                  onChange={handleChange}
                />
                {t('status')}
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="has_sidebar"
                  checked={
                    formState.values.has_sidebar === 0 || formState.values.has_sidebar === undefined ? false : true
                  }
                  value={formState.values.has_sidebar === 0 ? false : formState.values.has_sidebar}
                  onChange={handleChange}
                />
                {t('page.sidebar')}
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="template">{t('page.template')}</Label>
              <Input type="select" name="template" value={formState.values.template} onChange={handleChange}>
                <option>{t('Select')}</option>
                <option>{t('page.default')}</option>
                <option>{t('page.full')}</option>
              </Input>
            </FormGroup>
            <Button color="primary" type="submit">
              {t('approved.approved')}
            </Button>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmit}>
            <h4>{t('seo')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('meta.title')}</Label>
              <Input
                type="text"
                name="meta_title"
                value={formState.values.meta_title === undefined ? '' : formState.values.meta_title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>{t('meta.keywords')}</Label>
              <Input
                type="text"
                name="meta_keywords"
                value={formState.values.meta_keywords === undefined ? '' : formState.values.meta_keywords}
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
            <Button color="primary" type="submit">
              {t('approved.approved')}
            </Button>
          </Form>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}

PagesAppr.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    detail: state.PageReducer.detail
  };
};
const mapDispatchToProps = {
  apprPage: PageActions.apprPages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PagesAppr);
