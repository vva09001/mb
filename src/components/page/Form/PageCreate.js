import React, { useState, useEffect } from 'react';
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
import Select from 'react-select';
import ModalMedia from 'components/Media/ModalMedia';
import { map, filter } from 'lodash';
import { NewActions } from 'store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  deleteActive: PropTypes.bool,
  detail: PropTypes.object,
  blockData: PropTypes.array,
  stateEdit: PropTypes.array,
  listNew: PropTypes.array,
  listCategory: PropTypes.array,
  imageSeletedata: PropTypes.object,
  listGroup: PropTypes.array,
  mutileImage: PropTypes.array,
  onSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  value: PropTypes.object,
  onDelete: PropTypes.func,
  onRemoveBlock: PropTypes.func,
  handleFomBlock: PropTypes.func,
  handleEidt: PropTypes.func,
  onRemoveBlockValue: PropTypes.func,
  editorChange: PropTypes.func,
  getNewByCategory: PropTypes.func,
  handlePost: PropTypes.func,
  handlePostEdit: PropTypes.func,
  mutiPost: PropTypes.func,
  mutiPostEdit: PropTypes.func,
  handleImge: PropTypes.func,
  handleEditImge: PropTypes.func
};

function PagesCreate({
  blockData,
  listCategory,
  listNew,
  listGroup,
  onSubmit,
  handleChange,
  value,
  detail,
  mutileImage,
  imageSeletedata,
  stateEdit,
  onDelete,
  onRemoveBlock,
  deleteActive,
  handleFomBlock,
  handleEidt,
  onRemoveBlockValue,
  editorChange,
  getNewByCategory,
  handlePost,
  handlePostEdit,
  mutiPost,
  mutiPostEdit,
  handleImge,
  handleEditImge
}) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { t } = useTranslation();
  const [opened, setOpened] = useState(null);
  const [categoryID, setID] = useState(null);
  const [formImg, setFormImg] = useState([
    { title: '', description: '', learnMore: '', text: '', url: '', video_url: '' }
  ]);

  useEffect(() => {
    setFormImg(mutileImage);
  }, [setFormImg, mutileImage]);

  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpened(opened === index ? null : index);
  };

  const addMoreFormImge = () => {
    setFormImg([...formImg, { title: '', description: '', learnMore: '', text: '', url: '', video_url: '' }]);
  };
  const removeItem = indexItems => {
    const newValues = filter(formImg, (items, index) => index !== indexItems);
    setFormImg(newValues);
  };

  const onSetState = itemIndex => {
    let newData = map(formImg, (value, index) => {
      if (itemIndex !== index) {
        return value;
      } else {
        return {
          ...value,
          image: imageSeletedata.url
        };
      }
    });
    setFormImg(newData);
  };

  const handleChangeImge = (event, itemIndex, index, acitve) => {
    let newData = map(formImg, (value, indexValue) => {
      if (itemIndex !== indexValue) {
        return value;
      } else {
        return {
          ...value,
          [event.target.name]: event.target.value
        };
      }
    });
    setFormImg(newData);
    if (acitve) {
      handleEditImge(newData, index);
    } else {
      handleImge(newData, index);
    }
  };

  const getNewsByCategoryID = id => {
    setID(JSON.parse(id));
    getNewByCategory(id);
  };

  const handleChangeSupportLocales = (event, index) => {
    let data = [];
    map(event, items => data.push(JSON.parse(items.value)));
    mutiPost(data, index);
  };

  const handleMutilePostEdit = (event, index) => {
    let data = [];
    map(event, items => data.push(JSON.parse(items.value)));
    mutiPostEdit(data, index);
  };

  const renderInput = (data, index) => {
    switch (data.type_id) {
      case 1: // input
        return (
          <FormGroup key={data.id}>
            <Label>{data.title}</Label>
            <Input type="text" name={data.key} required onChange={event => handleFomBlock(event, index)} />
          </FormGroup>
        );
      case 3: //singer post
        return (
          <React.Fragment>
            <FormGroup>
              <Label>{t('category')}</Label>
              <Input type="select" name="category" required onChange={event => getNewsByCategoryID(event.target.value)}>
                <option value={0}>chọn...</option>
                {map(listCategory, category => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            {listNew.length > 0 && (
              <FormGroup>
                <Label for="template">{data.title}</Label>
                <Input type="select" name={data.key} required onChange={event => handlePost(event.target.value, index)}>
                  <option value={0}>chọn...</option>
                  {map(listNew, news => (
                    <option
                      key={news.newsId}
                      value={JSON.stringify({
                        categoryID: categoryID,
                        newsID: news.newsId,
                        name: news.title,
                        url: news.url,
                        description: news.shortDescription,
                        image:
                          news.base_image === null
                            ? `https://th2dev.mangoads.com.vn/themes/storefront/public/images/image.svg?v=5e12e47624638`
                            : news.base_image
                      })}
                    >
                      {news.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
          </React.Fragment>
        );
      case 4: // mutile editor
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
      case 8: //nutile post
        return (
          <React.Fragment>
            <FormGroup>
              <Label>{t('category')}</Label>
              <Input type="select" name="category" required onChange={event => getNewsByCategoryID(event.target.value)}>
                <option value={0}>chọn...</option>
                {map(listCategory, category => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            {listNew.length > 0 && (
              <FormGroup>
                <Label for="template">{data.title}</Label>
                <Select
                  name="supportLocales"
                  closeMenuOnSelect={false}
                  options={listNew}
                  isMulti
                  onChange={event => handleChangeSupportLocales(event, index)}
                />
              </FormGroup>
            )}
          </React.Fragment>
        );

      case 9: // mutile image
        // console.log(index);
        return (
          <FormGroup>
            <Label for="template">{data.title}</Label>
            {map(formImg, (items, itemIndex) => {
              return (
                <div key={itemIndex}>
                  <div className="mt-3 btnBlock-remove">
                    <Button onClick={() => removeItem(itemIndex)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                  <div className="form-img">
                    <div>
                      <div className="block_image mb-2">
                        <img
                          alt="items"
                          src={items.image === '' ? IconNoImage : items.image}
                          style={{ maxWidth: '100%' }}
                        />
                      </div>
                      <ModalMedia setState={() => onSetState(itemIndex)} />
                    </div>
                    <div className="input_image">
                      <div className="input_wapper">
                        <div>
                          <Label>{t('block.image.title')}</Label>
                          <Input
                            type="text"
                            name="title"
                            onChange={event => handleChangeImge(event, itemIndex, index)}
                          />
                        </div>
                        <div>
                          <Label>{t('block.image.description')}</Label>
                          <Input
                            type="text"
                            name="description"
                            onChange={event => handleChangeImge(event, itemIndex, index)}
                          />
                        </div>
                        <div>
                          <Label>{t('block.image.learn_more')}</Label>
                          <Input
                            type="text"
                            name="learnMore"
                            onChange={event => handleChangeImge(event, itemIndex, index)}
                          />
                        </div>
                      </div>
                      <div className="input_wapper">
                        <div>
                          <Label>{t('block.image.text')}</Label>
                          <Input
                            type="text"
                            name="text"
                            onChange={event => handleChangeImge(event, itemIndex, index)}
                          />
                        </div>
                        <div>
                          <Label>{t('block.image.url')}</Label>
                          <Input type="text" name="url" onChange={event => handleChangeImge(event, itemIndex, index)} />
                        </div>
                        <div>
                          <Label>{t('block.image.video_url')}</Label>
                          <Input
                            type="text"
                            name="video_url"
                            onChange={event => handleChangeImge(event, itemIndex, index)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <Button className="mt-3" onClick={addMoreFormImge}>
                {t('addBlock')}
              </Button>
            </div>
          </FormGroup>
        );
      case 10: // singer image
        return (
          <FormGroup>
            <Label for="template">{data.title}</Label>
            <div className="form-img">
              <div className="block_image">
                <img alt="items" src={IconNoImage} style={{ maxWidth: '100%' }} />
              </div>
              <div className="input_image">
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
      case 11: //editor
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
      case 13: // textara
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

  const renderInputEdit = (items, value, newID, index) => {
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
      case 8: //nutile post
        return (
          <React.Fragment>
            <FormGroup>
              <Label>{t('category')}</Label>
              <Input
                type="select"
                name="category"
                required
                value={value.categoryID}
                onChange={event => getNewsByCategoryID(event.target.value)}
              >
                <option value={0}>chọn...</option>
                {map(listCategory, category => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            {listNew.length > 0 && (
              <FormGroup>
                <Label>{items.title}</Label>
                <Select
                  name="supportLocales"
                  closeMenuOnSelect={false}
                  options={listNew}
                  isMulti
                  onChange={event => handleMutilePostEdit(event, index)}
                />
              </FormGroup>
            )}
          </React.Fragment>
        );
      case 3: //singer post
        return (
          <React.Fragment>
            <FormGroup>
              <Label for="template">{t('category')}</Label>
              <Input
                type="select"
                name="category"
                required
                value={value}
                onChange={event => getNewsByCategoryID(event.target.value)}
              >
                <option value={0}>chọn...</option>
                {map(listCategory, category => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            {listNew.length > 0 && (
              <FormGroup>
                <Label for="template">{items.title}</Label>
                <Input
                  type="select"
                  name={items.key}
                  required
                  onChange={event => handlePostEdit(event.target.value, index)}
                >
                  <option value={0}>chọn...</option>
                  {map(listNew, news => (
                    <option
                      key={news.newsId}
                      value={JSON.stringify({
                        categoryID: categoryID,
                        newsID: news.newsId,
                        name: news.title,
                        url: news.url,
                        description: news.shortDescription,
                        image:
                          news.base_image === null
                            ? `https://th2dev.mangoads.com.vn/themes/storefront/public/images/image.svg?v=5e12e47624638`
                            : news.base_image
                      })}
                    >
                      {news.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
          </React.Fragment>
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
      case 9: // mutile image
        // setFormImg(form);
        return (
          <FormGroup>
            <Label for="template">{items.title}</Label>
            {map(formImg, (value, itemIndex) => {
              return (
                <div key={itemIndex}>
                  <div className="mt-3 btnBlock-remove">
                    <Button onClick={() => removeItem(itemIndex)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                  <div className="form-img">
                    <div>
                      <div className="block_image mb-2">
                        <img
                          alt="items"
                          src={value.image === '' ? IconNoImage : value.image}
                          style={{ maxWidth: '100%' }}
                        />
                      </div>
                      <ModalMedia setState={() => onSetState(itemIndex)} />
                    </div>
                    <div className="input_image">
                      <div className="input_wapper">
                        <div>
                          <Label>{t('block.image.title')}</Label>
                          <Input
                            type="text"
                            name="title"
                            value={value.title}
                            onChange={event => handleChangeImge(event, itemIndex, index, true)}
                          />
                        </div>
                        <div>
                          <Label>{t('block.image.description')}</Label>
                          <Input
                            type="text"
                            name="description"
                            value={value.description}
                            onChange={event => handleChangeImge(event, itemIndex, index, true)}
                          />
                        </div>
                        <div>
                          <Label>{t('block.image.learn_more')}</Label>
                          <Input
                            type="text"
                            name="learnMore"
                            value={value.learnMore}
                            onChange={event => handleChangeImge(event, itemIndex, index, true)}
                          />
                        </div>
                      </div>
                      <div className="input_wapper">
                        <div>
                          <Label>{t('block.image.text')}</Label>
                          <Input
                            type="text"
                            name="text"
                            value={value.text}
                            onChange={event => handleChangeImge(event, itemIndex, index, true)}
                          />
                        </div>
                        <div>
                          <Label>{t('block.image.url')}</Label>
                          <Input
                            type="text"
                            name="url"
                            value={value.url}
                            onChange={event => handleChangeImge(event, itemIndex, index, true)}
                          />
                        </div>
                        <div>
                          <Label>{t('block.image.video_url')}</Label>
                          <Input
                            type="text"
                            name="video_url"
                            value={value.video_url}
                            onChange={event => handleChangeImge(event, itemIndex, index, true)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <Button className="mt-3" onClick={addMoreFormImge}>
                {t('addBlock')}
              </Button>
            </div>
          </FormGroup>
        );
      case 6: // image
        return (
          <FormGroup>
            <Label>{items.title}</Label>
            <div className="form-img">
              <div className="block_image">
                <img alt="items" src={IconNoImage} style={{ maxWidth: '100%' }} />
              </div>
              <div className="input_image">
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
            <FormGroup>
              <Label for="teams">{t('page.group')}</Label>
              <Input
                type="select"
                name="teams"
                required
                value={value.teams === undefined ? 1 : value.teams}
                onChange={handleChange}
              >
                <option value={1}>{t('select')}</option>
                {map(listGroup, (value, index) => (
                  <option key={index} value={value.idTeam}>
                    {value.name}
                  </option>
                ))}
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
                                return <div key={indexItems}>{renderInput(items, index)}</div>;
                              } else {
                                let values = JSON.parse(value.content);
                                let key = Object.keys(values);
                                let arr = [];
                                map(key, content => {
                                  arr = [...arr, content];
                                });
                                let tem = arr[indexItems];

                                return (
                                  <div key={indexItems}>
                                    {renderInputEdit(items, stateEdit[index][tem], stateEdit[index][`newsID`], index)}
                                  </div>
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

const mapStateToProps = state => {
  return {
    listNew: state.NewReducer.listNewByCategory,
    imageSeletedata: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  getNewByCategory: NewActions.getNewByCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PagesCreate);
