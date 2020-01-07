import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import IconNoImage from 'assets/img/mb/no_image.png';
import { map } from 'lodash';
import { PageActions } from 'store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  deleteActive: PropTypes.bool,
  detail: PropTypes.object,
  blockData: PropTypes.array,
  stateEdit: PropTypes.array,
  onSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  value: PropTypes.object,
  onDelete: PropTypes.func,
  onRemoveBlock: PropTypes.func,
  handleFomBlock: PropTypes.func,
  handleEidt: PropTypes.func,
  onRemoveBlockValue: PropTypes.func,
  editorChange: PropTypes.func
};

function PagesCreate({
  blockData,
  onSubmit,
  handleChange,
  value,
  detail,
  stateEdit,
  onDelete,
  onRemoveBlock,
  deleteActive,
  handleFomBlock,
  handleEidt,
  onRemoveBlockValue,
  editorChange
}) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { t } = useTranslation();
  const [opened, setOpened] = useState(null);
  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpened(opened === index ? null : index);
  };

  const renderInput = (data, index) => {
    switch (data.type_id) {
      case 1:
        return (
          <FormGroup key={data.id}>
            <Label>{data.title}</Label>
            <Input type="text" name={data.key} required onChange={event => handleFomBlock(event, index)} />
          </FormGroup>
        );
      case 2: //nutile post
        return (
          <FormGroup>
            <Label for="template">{data.title}</Label>
            <Input type="select" name={data.key} required onChange={event => handleFomBlock(event, index)}>
              <option value={1}>{t('select')}</option>
              <option value={2}>{t('page.default')}</option>
              <option value={3}>{t('page.full')}</option>
            </Input>
          </FormGroup>
        );
      case 3: //singer post
        return (
          <FormGroup>
            <Label for="template">{data.title}</Label>
            <Input type="select" name={data.key} required onChange={event => handleFomBlock(event, index)}>
              <option value={1}>{t('select')}</option>
              <option value={2}>{t('page.default')}</option>
              <option value={3}>{t('page.full')}</option>
            </Input>
          </FormGroup>
        );
      case 4:
        return (
          <FormGroup>
            <Label>{data.title}</Label>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const editorData = editor.getData();
                editorChange(editorData, data.key, index);
              }}
            />
          </FormGroup>
        );
      case 11:
        return (
          <FormGroup>
            <Label>{data.title}</Label>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const editorData = editor.getData();
                editorChange(editorData, data.key, index);
              }}
            />
          </FormGroup>
        );
      case 5: // image
        return (
          <FormGroup>
            <Label for="template">{data.title}</Label>
            <div class="form-img">
              <div class="block_image">
                <img alt="items" src={IconNoImage} style={{ maxWidth: '100%' }} />
              </div>
              <div class="input_image">
                <div className="input_wapper">
                  <div>
                    <Label>Chú thích 1</Label>
                    <Input type="text" name={data.key} />
                  </div>
                  <div>
                    <Label>Chú thích 2</Label>
                    <Input type="text" name={data.key} />
                  </div>
                  <div>
                    <Label>Chú thích 3</Label>
                    <Input type="text" name={data.key} />
                  </div>
                </div>
                <div className="input_wapper">
                  <div>
                    <Label>Gọi hành động văn bản</Label>
                    <Input type="text" name={data.key} />
                  </div>
                  <div>
                    <Label>Gọi hành động URL</Label>
                    <Input type="text" name={data.key} />
                  </div>
                  <div>
                    <Label>Video URL</Label>
                    <Input type="text" name={data.key} />
                  </div>
                </div>
              </div>
            </div>
          </FormGroup>
        );
      case 6: // image
        return (
          <FormGroup>
            <Label for="template">{data.title}</Label>
            <div class="form-img">
              <div class="block_image">
                <img alt="items" src={IconNoImage} style={{ maxWidth: '100%' }} />
              </div>
              <div class="input_image">
                <div className="input_wapper">
                  <div>
                    <Label>Chú thích 1</Label>
                    <Input type="text" name={data.key} />
                  </div>
                  <div>
                    <Label>Chú thích 2</Label>
                    <Input type="text" name={data.key} />
                  </div>
                  <div>
                    <Label>Chú thích 3</Label>
                    <Input type="text" name={data.key} />
                  </div>
                </div>
                <div className="input_wapper">
                  <div>
                    <Label>Gọi hành động văn bản</Label>
                    <Input type="text" name={data.key} />
                  </div>
                  <div>
                    <Label>Gọi hành động URL</Label>
                    <Input type="text" name={data.key} />
                  </div>
                  <div>
                    <Label>Video URL</Label>
                    <Input type="text" name={data.key} />
                  </div>
                </div>
              </div>
            </div>
          </FormGroup>
        );
      case 13:
        return (
          <FormGroup>
            <Label for="template">{data.title}</Label>
            <Input type="textarea" name={data.key} rows="5" onChange={event => handleFomBlock(event, index)} />
          </FormGroup>
        );

      default:
        return (
          <FormGroup key={data.id}>
            <Label>{data.title}</Label>
            <Input type="text" name={data.key} required onChange={event => handleFomBlock(event, index)} />
          </FormGroup>
        );
    }
  };

  const renderInputEdit = (items, value, index) => {
    console.log(items);
    switch (items.type_id) {
      case 1:
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <Input
              type="text"
              value={value}
              name={items.key}
              required
              onChange={event => handleFomBlock(event, index)}
            />
          </FormGroup>
        );
      case 2: //nutile post
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <Input
              type="select"
              name={items.key}
              value={value}
              required
              onChange={event => handleFomBlock(event, index)}
            >
              <option value={1}>{t('select')}</option>
              <option value={2}>{t('page.default')}</option>
              <option value={3}>{t('page.full')}</option>
            </Input>
          </FormGroup>
        );
      case 3: //singer post
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <Input
              type="select"
              name={items.key}
              value={value}
              required
              onChange={event => handleFomBlock(event, index)}
            >
              <option value={1}>{t('select')}</option>
              <option value={2}>{t('page.default')}</option>
              <option value={3}>{t('page.full')}</option>
            </Input>
          </FormGroup>
        );
      case 4:
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <CKEditor
              editor={ClassicEditor}
              data={value}
              onChange={(event, editor) => {
                const editorData = editor.getData();
                editorChange(editorData, items.key, index);
              }}
            />
          </FormGroup>
        );
      case 11:
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <CKEditor
              editor={ClassicEditor}
              data={value}
              onChange={(event, editor) => {
                const editorData = editor.getData();
                editorChange(editorData, items.key, index);
              }}
            />
          </FormGroup>
        );
      case 5: // image
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <div class="form-img">
              <div class="block_image">
                <img alt="items" src={IconNoImage} style={{ maxWidth: '100%' }} />
              </div>
              <div class="input_image">
                <div className="input_wapper">
                  <div>
                    <Label>Chú thích 1</Label>
                    <Input type="text" name={items.key} />
                  </div>
                  <div>
                    <Label>Chú thích 2</Label>
                    <Input type="text" name={items.key} />
                  </div>
                  <div>
                    <Label>Chú thích 3</Label>
                    <Input type="text" name={items.key} />
                  </div>
                </div>
                <div className="input_wapper">
                  <div>
                    <Label>Gọi hành động văn bản</Label>
                    <Input type="text" name={items.key} />
                  </div>
                  <div>
                    <Label>Gọi hành động URL</Label>
                    <Input type="text" name={items.key} />
                  </div>
                  <div>
                    <Label>Video URL</Label>
                    <Input type="text" name={items.key} />
                  </div>
                </div>
              </div>
            </div>
          </FormGroup>
        );
      case 6: // image
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <div class="form-img">
              <div class="block_image">
                <img alt="items" src={IconNoImage} style={{ maxWidth: '100%' }} />
              </div>
              <div class="input_image">
                <div className="input_wapper">
                  <div>
                    <Label>Chú thích 1</Label>
                    <Input type="text" name={items.key} />
                  </div>
                  <div>
                    <Label>Chú thích 2</Label>
                    <Input type="text" name={items.key} />
                  </div>
                  <div>
                    <Label>Chú thích 3</Label>
                    <Input type="text" name={items.key} />
                  </div>
                </div>
                <div className="input_wapper">
                  <div>
                    <Label>Gọi hành động văn bản</Label>
                    <Input type="text" name={items.key} />
                  </div>
                  <div>
                    <Label>Gọi hành động URL</Label>
                    <Input type="text" name={items.key} />
                  </div>
                  <div>
                    <Label>Video URL</Label>
                    <Input type="text" name={items.key} />
                  </div>
                </div>
              </div>
            </div>
          </FormGroup>
        );
      case 13:
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <Input
              type="textarea"
              name={items.key}
              value={value}
              rows="5"
              onChange={event => handleFomBlock(event, index)}
            />
          </FormGroup>
        );
      default:
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <Input type="text" name={items.key} value={value} required onChange={event => handleEidt(event, index)} />
          </FormGroup>
        );
    }
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
                      {value.newItem !== 0 && deleteActive ? value.title : `Khối mới`}
                      <div>
                        {!deleteActive && (
                          <Button onClick={() => onRemoveBlock(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        )}
                        {deleteActive && (
                          <Button onClick={() => onRemoveBlockValue(detail.id, detail.pageBlocks[index].id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        )}
                      </div>
                    </ListGroupItem>
                    <Collapse isOpen={opened === index}>
                      <ListGroup>
                        <ListGroupItem>
                          <FormGroup>
                            <Label>Tên khối</Label>
                            {value.newItem === 0 && (
                              <Input
                                type="text"
                                name="title"
                                onChange={event => handleFomBlock(event, index)}
                                required
                              />
                            )}

                            {value.newItem !== 0 && deleteActive && (
                              <Input
                                type="text"
                                name="title"
                                value={stateEdit[index] === undefined ? '' : stateEdit[index].title}
                                onChange={event => handleEidt(event, index)}
                                required
                              />
                            )}
                          </FormGroup>
                          {!deleteActive &&
                            map(value.blockValues, (items, itemIndex) => {
                              return <div key={itemIndex}>{renderInput(items, index)}</div>;
                            })}
                          {deleteActive &&
                            map(value.blockValues, (items, indexItems) => {
                              if (value.newItem === 0) {
                                return (
                                  <FormGroup key={items.id}>
                                    <Label>{items.title}</Label>
                                    <Input
                                      type="text"
                                      name={items.key}
                                      required
                                      onChange={event => handleFomBlock(event, index)}
                                    />
                                  </FormGroup>
                                );
                              } else {
                                let values = JSON.parse(value.content);
                                let key = Object.keys(values);
                                let arr = [];
                                map(key, content => {
                                  arr = [...arr, content];
                                });
                                let tem = arr[indexItems];
                                return (
                                  <div key={indexItems}>{renderInputEdit(items, stateEdit[index][tem], index)}</div>
                                );
                              }
                            })}
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
                  );
                } else {
                  return false;
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
