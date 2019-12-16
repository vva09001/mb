import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { PageActions } from 'store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  deleteActive: PropTypes.bool,
  onSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  value: PropTypes.object,
  onDelete: PropTypes.func
};

function PagesCreateChildren({ onSubmit, handleChange, value, onDelete, deleteActive }) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { t } = useTranslation();

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
              <Input type="text" name="name" value={value.name} onChange={handleChange} />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="is_active"
                  checked={value.is_active === 0 || value.is_active === undefined ? false : true}
                  value={value.is_active === 0 ? false : value.is_active}
                  onChange={handleChange}
                />
                {t('page.active')}
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="has_sidebar"
                  checked={value.has_sidebar === 0 || value.has_sidebar === undefined ? false : true}
                  value={value.has_sidebar === 0 ? false : value.has_sidebar}
                  onChange={handleChange}
                />
                {t('page.sidebar')}
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="template">{t('page.template')}</Label>
              <Input type="select" name="template" onChange={handleChange}>
                <option>{t('page.default')}</option>
                <option>{t('page.full')}</option>
              </Input>
            </FormGroup>
            <Button color="primary" type="submit">
              {t('save')}
            </Button>
            {deleteActive && (
              <Button color="danger" className="ml-2" onClick={onDelete}>
                {t('delete')}
              </Button>
            )}
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmit}>
            <h4>{t('seo')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('meta.title')}</Label>
              <Input type="text" name="meta_title" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>{t('meta.keywords')}</Label>
              <Input type="text" name="meta_keywords" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('meta.description')}</Label>
              <Input type="textarea" name="meta_description" rows="5" onChange={handleChange} />
            </FormGroup>
            <Button color="primary" type="submit">
              {t('save')}
            </Button>
            {deleteActive && (
              <Button color="danger" className="ml-2" onClick={onDelete}>
                {t('delete')}
              </Button>
            )}
          </Form>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}

PagesCreateChildren.propTypes = PropsType;

const mapDispatchToProps = {
  pagesCreate: PageActions.AddPages
};

export default connect(
  null,
  mapDispatchToProps
)(PagesCreateChildren);
