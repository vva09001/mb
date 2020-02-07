import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Collapse } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroupItem, ListGroup } from 'reactstrap';
import { map } from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { PageActions, TagActions, GroupActions } from 'store/actions';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import history from 'helpers/history';

const PropsType = {
  detail: PropTypes.object,
  listTags: PropTypes.array,
  listGroups: PropTypes.array,
  getDetailById: PropTypes.func,
  getListTags: PropTypes.func,
  getGroup: PropTypes.func,
  apprPage: PropTypes.func,
  onEdit: PropTypes.func
};

function PagesAppr({ detail, listTags, listGroups, getDetailById, getListTags, getGroup, onEdit, apprPage }) {
  const [formState, setFormState] = useState({ values: {} });
  const [opened, setOpened] = useState(null);
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    getDetailById(id);
    getListTags();
    getGroup();
  }, [getDetailById, id, getListTags, getGroup]);

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detail
    }));
  }, [detail]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
      }
    }));
  };

  const setListData = (data, index) => {};

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpened(opened === index ? null : index);
  };

  const editPage = event => {
    event.preventDefault();
    onEdit({ ...formState.values, teams: formState.values.team, pageBlocks: [] }, `/pages/approved/${id}`);
  };

  const onSubmit = event => {
    event.preventDefault();
    apprPage(id);
    history.push('/pages/approved_listings');
  };

  return (
    <Row style={{ background: '#fff', padding: '15px 0' }}>
      <Col lg={3} md={4}>
        <h4 className="text-center">{t('block_page.title')}</h4>
        <div className="listBlock">
          {map(listTags, (values, index) => (
            <React.Fragment key={index}>
              <ListGroupItem onClick={e => toggleOpened(e, index)}>{values.name}</ListGroupItem>
              <Collapse isOpen={opened === index}>
                {map(values.blocks, (items, index) => {
                  return (
                    <ListGroup key={index}>
                      <ListGroupItem
                        style={{ backgroundColor: '#f5f5f5' }}
                        onClick={() => setListData(items, items.blockValues[0].type_id, index)}
                      >
                        {items.name}
                      </ListGroupItem>
                    </ListGroup>
                  );
                })}
              </Collapse>
            </React.Fragment>
          ))}
        </div>
      </Col>
      <Col lg={9} md={8}>
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
        <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmit}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <FormGroup>
                <Label for="exampleName">{t('name')}</Label>
                <Input
                  type="text"
                  name="name"
                  required
                  value={formState.values.name === undefined ? '' : formState.values.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <div className="check__box">
                <Label>{t('sidebar')}</Label>
                <div>
                  <Input
                    type="checkbox"
                    name="has_sidebar"
                    checked={
                      formState.values.has_sidebar === 0 || formState.values.has_sidebar === undefined ? false : true
                    }
                    value={formState.values.has_sidebar === 0 ? false : formState.values.has_sidebar}
                    onChange={handleChange}
                  />
                  <span>{t('page.sidebar')}</span>
                </div>
              </div>
              <FormGroup>
                <Label for="template">{t('page.template')}</Label>
                <Input
                  type="select"
                  name="template"
                  required
                  value={formState.values.template === undefined ? 1 : formState.values.template}
                  onChange={handleChange}
                >
                  <option value={1}>{t('select')}</option>
                  <option value={2}>{t('page.default')}</option>
                  <option value={3}>{t('page.full')}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="team">{t('page.group')}</Label>
                <Input
                  type="select"
                  name="team"
                  required
                  value={formState.values.team === undefined ? 0 : formState.values.team}
                  onChange={handleChange}
                >
                  <option value={0}>{t('select')}</option>
                  {map(listGroups, (value, index) => (
                    <option key={index} value={value.idTeam}>
                      {value.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </TabPane>
            <TabPane tabId="2">
              <h4>{t('seo')}</h4>
              <FormGroup>
                {(() => {
                  if (formState.values.id) {
                    return (
                      <div>
                        <Label for="exampleSlug">{t('slug')}</Label>
                        <Input
                          type="text"
                          name="slug"
                          value={formState.values.slug === undefined ? '' : formState.values.slug}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })()}
              </FormGroup>
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
            </TabPane>
          </TabContent>
          <Button color="primary" onClick={editPage} className="mr-2">
            {t('edit')}
          </Button>
          <Button color="primary" type="submit">
            {t('approved.approved')}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

PagesAppr.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    detail: state.PageReducer.detail,
    listTags: state.TagReducer.listTags,
    listGroups: state.GroupReducer.listGroupByUser
  };
};
const mapDispatchToProps = {
  getDetailById: PageActions.getPageByID,
  getListTags: TagActions.getTagAction,
  getGroup: GroupActions.getGroupByUserAction,
  apprPage: PageActions.apprPages,
  onEdit: PageActions.EditPages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PagesAppr);
