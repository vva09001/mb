import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { PageActions } from 'store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  deleteActive: PropTypes.bool,
  blockData: PropTypes.array,
  onSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  value: PropTypes.object,
  onDelete: PropTypes.func,
  onRemoveBlock: PropTypes.func,
  handleFomBlock: PropTypes.func
};

function PagesCreate({
  blockData,
  onSubmit,
  handleChange,
  value,
  onDelete,
  onRemoveBlock,
  deleteActive,
  handleFomBlock
}) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { t } = useTranslation();
  const [opened, setOpened] = useState(null);
  // console.log(blockData);

  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpened(opened === index ? null : index);
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
              <Input
                type="text"
                name="name"
                required
                value={value.name === undefined ? '' : value.name}
                onChange={handleChange}
              />
            </FormGroup>
            <div className="check__box">
              <Label>{t('status')}</Label>
              <div>
                <Input
                  type="checkbox"
                  name="status"
                  required
                  checked={value.status === 0 || value.status === undefined ? false : true}
                  value={value.status === 0 ? false : value.status}
                  onChange={handleChange}
                />
                <span>{t('page.active')}</span>
              </div>
            </div>
            <div className="check__box">
              <Label>{t('page.active')}</Label>
              <div>
                <Input
                  type="checkbox"
                  name="is_active"
                  required
                  checked={value.is_active === 0 || value.is_active === undefined ? false : true}
                  value={value.is_active === 0 ? false : value.is_active}
                  onChange={handleChange}
                />
                <span>{t('page.active')}</span>
              </div>
            </div>
            <div className="check__box">
              <Label>{t('sidebar')}</Label>
              <div>
                <Input
                  type="checkbox"
                  name="has_sidebar"
                  required
                  checked={value.has_sidebar === 0 || value.has_sidebar === undefined ? false : true}
                  value={value.has_sidebar === 0 ? false : value.has_sidebar}
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
                value={value.template === undefined ? 1 : value.template}
                onChange={handleChange}
              >
                <option value={1}>{t('select')}</option>
                <option value={2}>{t('page.default')}</option>
                <option value={3}>{t('page.full')}</option>
              </Input>
            </FormGroup>
            <div className="mb-3">
              {blockData.length > 0 &&
                map(blockData, (value, index) => (
                  <div key={index} className="mt-2 mb-2">
                    <ListGroupItem className="block__title" onClick={e => toggleOpened(e, index)}>
                      Khối mới
                      <div>
                        <Button onClick={() => onRemoveBlock(index)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </ListGroupItem>
                    <Collapse isOpen={opened === index}>
                      <ListGroup>
                        <ListGroupItem>
                          <FormGroup>
                            <Label>Tên khối</Label>
                            <Input type="text" name="title" required onChange={event => handleFomBlock(event, index)} />
                          </FormGroup>
                          {map(value.blockValues, (items, itemIndex) => (
                            <FormGroup key={items.id}>
                              <Label>{items.title}</Label>
                              <Input
                                type="text"
                                name={items.key}
                                required
                                onChange={event => handleFomBlock(event, index)}
                              />
                            </FormGroup>
                          ))}
                        </ListGroupItem>
                      </ListGroup>
                    </Collapse>
                  </div>
                ))}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <h4>{t('seo')}</h4>
            <FormGroup>
              {(() => {
                if (value.id) {
                  return (
                    <div>
                      <Label for="exampleSlug">{t('slug')}</Label>
                      <Input
                        type="text"
                        name="slug"
                        value={value.slug === undefined ? '' : value.slug}
                        onChange={handleChange}
                      />
                    </div>
                  )
                } else {
                  return false
                }
              })()}
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">{t('meta.title')}</Label>
              <Input
                type="text"
                name="meta_title"
                value={value.meta_title === undefined ? '' : value.meta_title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>{t('meta.keywords')}</Label>
              <Input
                type="text"
                name="meta_keyword"
                value={value.meta_keyword === undefined ? '' : value.meta_keyword}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">{t('meta.description')}</Label>
              <Input
                type="textarea"
                name="meta_description"
                value={value.meta_description === undefined ? '' : value.meta_description}
                rows="5"
                onChange={handleChange}
              />
            </FormGroup>
          </TabPane>
        </TabContent>
        <Button color="primary" type="submit">
          {t('save')}
        </Button>
        {deleteActive && (
          <Button color="danger" className="ml-2" onClick={onDelete}>
            {t('delete')}
          </Button>
        )}
      </Form>
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
