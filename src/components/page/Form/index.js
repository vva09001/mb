import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import ModalMedia from 'components/Media/ModalMedia';
import IconNoImage from 'assets/img/mb/no_image.png';
import { map } from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  PageActions,
  TagActions,
  GroupActions,
  NewActions,
  CategoryActions,
  MenuActions
} from '../../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  listTags: PropTypes.array,
  listGroup: PropTypes.array,
  listCategory: PropTypes.array,
  listNew: PropTypes.array,
  listMenu: PropTypes.array,
  imageSeletedata: PropTypes.object,
  formState: PropTypes.object,
  children: PropTypes.func,
  getListTags: PropTypes.func,
  getGroup: PropTypes.func,
  pageCreate: PropTypes.func,
  getCategory: PropTypes.func,
  getNewByCategory: PropTypes.func,
  getMenuMiddle: PropTypes.func,
  handleChange: PropTypes.func,
  getImage: PropTypes.func,
  onSubmit: PropTypes.func
};

function PageCreate({
  listGroup,
  listMenu,
  formState,
  imageSeletedata,
  getListTags,
  getGroup,
  getCategory,
  getMenuMiddle,
  handleChange,
  children,
  getImage,
  onSubmit
}) {
  const [activeTab, setActiveTab] = useState('1');
  const { t } = useTranslation();
  useEffect(() => {
    getListTags();
    getGroup();
    getCategory();
    getMenuMiddle();
  }, [getListTags, getGroup, getCategory, getMenuMiddle]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
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
      <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmit}>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="name" value={formState.values.name} required onChange={handleChange} />
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
                  onChange={handleChange}
                />
                <span>{t('page.sidebar')}</span>
              </div>
            </div>
            <FormGroup>
              <Label for="template">{t('page.menuMiddle')}</Label>
              <Input
                type="select"
                name="menuMiddleId"
                required
                value={formState.values.menuMiddleId === undefined ? 0 : formState.values.menuMiddleId}
                onChange={handleChange}
              >
                <option value={0}>{t('select')}</option>
                {map(listMenu, value => (
                  <option value={value.id} key={value.id}>
                    {value.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
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
              <Label for="teams">{t('page.group')}</Label>
              <Input
                type="select"
                name="teams"
                value={formState.values.team === undefined ? 0 : formState.values.team}
                required
                onChange={handleChange}
              >
                <option value={0}>{t('select')}</option>
                {map(listGroup, (value, index) => (
                  <option key={index} value={value.idTeam}>
                    {value.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">{t('baseImages')}</Label>
              <div style={{ maxHeight: '100px', maxWidth: '100px' }} className="block_image mb-2">
                <img
                  src={formState.values.baseImage === undefined ? IconNoImage : formState.values.baseImage}
                  style={{ maxWidth: '100px' }}
                  alt="logo"
                />
              </div>
              <ModalMedia setState={() => getImage('baseImage', imageSeletedata)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">{t('miniImages')}</Label>
              <div style={{ maxHeight: '100px', maxWidth: '100px' }} className="mb-2">
                <img
                  src={formState.values.miniImage === undefined ? IconNoImage : formState.values.miniImage}
                  style={{ maxWidth: '100px' }}
                  alt="logo"
                />
              </div>
              <ModalMedia setState={() => getImage('miniImage', imageSeletedata)} />
            </FormGroup>
            <FormGroup>{children}</FormGroup>
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
                value={formState.values.meta_keyword === undefined ? '' : formState.values.meta_title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('meta.description')}</Label>
              <Input
                type="textarea"
                name="meta_description"
                value={formState.values.meta_description === undefined ? '' : formState.values.meta_title}
                rows="5"
                onChange={handleChange}
              />
            </FormGroup>
          </TabPane>
        </TabContent>
        <Button color="primary" type="submit">
          {t('save')}
        </Button>
      </Form>
    </React.Fragment>
  );
}

PageCreate.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    listTags: state.TagReducer.listTags,
    listGroup: state.GroupReducer.listGroupByUser,
    listCategory: state.CategoryReducer.data,
    listNew: state.NewReducer.listNewByCategory,
    imageSeletedata: state.MediaReducer.detail,
    listMenu: state.MenuReducer.listMenuMiddle
  };
};

const mapDispatchToProps = {
  getListTags: TagActions.getTagAction,
  pageCreate: PageActions.AddPages,
  getGroup: GroupActions.getGroupByUserAction,
  getCategory: CategoryActions.getCategoryAction,
  getNewByCategory: NewActions.getNewByCategory,
  getMenuMiddle: MenuActions.getMenuMiddleAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreate);
