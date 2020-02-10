import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Collapse } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from 'services/uploadImage';
import ModalMedia from 'components/Media/ModalMedia';
import Select from 'react-select';
import IconNoImage from 'assets/img/mb/no_image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { map, filter } from 'lodash';
import { PageActions, TagActions, GroupActions, NewActions, CategoryActions } from '../../store/actions';

const PropsType = {
  detail: PropTypes.object,
  listTags: PropTypes.array,
  listGroup: PropTypes.array,
  getDetailById: PropTypes.func,
  getListTags: PropTypes.func,
  getGroup: PropTypes.func,
  pageEdit: PropTypes.func,
  listCategory: PropTypes.array,
  listNew: PropTypes.array,
  imageSeletedata: PropTypes.object,
  pageCreate: PropTypes.func,
  getCategory: PropTypes.func,
  getNewByCategory: PropTypes.func
};

function PageEdit({ detail, 
  listCategory, 
  imageSeletedata, 
  getNewByCategory, 
  listNew,
  listTags, listGroup, getDetailById, getListTags, getGroup, pageEdit }) {
  const [formState, setFormState] = useState({ values: {} });
  const [activeTab, setActiveTab] = useState('1');
  const [opened, setOpened] = useState(null);
  const [fomEditor, setFomEditor] = useState([{}]);
  const [formImg, setFormImg] = useState([]);
  const [singleImage, setSingleImage] = useState([
    { id: 1, title: '', description: '', image: '', learnMore: '', text: '', url: '', video_url: '' }
  ]);
  const [blockValue, setBlockValue] = useState([]);
  const [formBlock, setFormBlock] = useState([]);
  const [categoryID, setCategoryID] = useState(null);
  const [blockOpened, setBlockOpened] = useState(null);
  const [listBlock, setListBlock] = useState([]);
  const { id } = useParams();
  const { t } = useTranslation();

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
    // console.log(detail.pageBlocks);
    setListBlock(detail.pageBlocks);
  }, [detail]);

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
      }
    }));
  };

  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpened(opened === index ? null : index);
  };

  const toggleOpeneBlock = (e, value, index) => {
    e.preventDefault();
    let data = [];
    map(value.blockValues, value => (data = [...data, { id: value.id, form_id: value.id }]));
    setBlockValue(data);
    return setBlockOpened(blockOpened === index ? null : index);
  };
  const setListData = (data, index) => {
    let formimage = [];
    data.blockValues.forEach(value => {
      if (value.type_id === 9) {
        formimage.push({
          id: listBlock.length,
          title: '',
          description: '',
          image: '',
          learnMore: '',
          text: '',
          url: '',
          video_url: '',
          form_id: value.id
        });
      }
    });
    setFormImg([...formImg, ...formimage]);
    setListBlock([...listBlock, data]);
    setFormBlock([...formBlock, { id_block: data.blockValues[0].block_id }]);
  };
  const addMoreFormImge = (id, form_id) => {
    setFormImg([
      ...formImg,
      {
        id: id,
        title: '',
        description: '',
        image: '',
        learnMore: '',
        text: '',
        url: '',
        video_url: '',
        form_id: form_id
      }
    ]);

    setBlockValue([
      ...blockValue,
      {
        id: id,
        title: '',
        description: '',
        image: '',
        learnMore: '',
        text: '',
        url: '',
        video_url: '',
        form_id: form_id
      }
    ]);
  };
  const removeItem = indexItems => {
    const newValues = filter(formImg, (items, index) => index !== indexItems);
    setFormImg(newValues);
    setBlockValue(newValues);
  };
  const getNewsByCategoryID = id => {
    setCategoryID(JSON.parse(id));
    getNewByCategory(id);
  };
  const addMoreFormEdittor = () => {};
  const onSetState = (itemIndex, index) => {};
  const setImage = (type_id, index, indexItem) => {
    let newData = map(singleImage, (value, i) => {
      if (index !== i) {
        return value;
      } else {
        return {
          ...value,
          image: imageSeletedata.url
        };
      }
    });
    setSingleImage(newData);
    handleFormBlock(imageSeletedata.url, 99, index, indexItem);
  };
  const removeBlock = index => {
    let data = filter(listBlock, (item, itemIndex) => itemIndex !== index);
    let form = filter(formBlock, (item, itemIndex) => itemIndex !== index);
    setListBlock(data);
    setFormBlock(form);
    setBlockOpened(null);
  };
  const handleFormBlock = (event, type_id, index, indexElement) => {
    let block_value = map(blockValue, (data, i) => {
      // if (indexElement !== i) {
      //   console.log(indexElement);
      //   return data;
      // } else {
      if (type_id === 1 || type_id === 13 || type_id === 10 || type_id === 12 || type_id === 9) {
        return {
          ...data,
          [event.target.name]: event.target.value
        };
      }
      if (type_id === 3) {
        return {
          ...data,
          ...JSON.parse(event)
        };
      }
      if (type_id === 8) {
        return {
          ...data,
          mutile_post: event
        };
      }
      if (type_id === 11) {
        return {
          ...data,
          ...event
        };
      }
      if (type_id === 99) {
        return {
          ...data,
          image: event
        };
        // }
      }
    });
    setBlockValue(block_value);

    let value = map(formBlock, (item, indexItem) => {
      if (indexItem !== index) {
        return item;
      } else {
        if (type_id === 1 || type_id === 13 || type_id === 10 || type_id === 12 || type_id === 9) {
          return {
            ...item,
            position: index,
            content: JSON.stringify(block_value)
          };
        }
        if (type_id === 3) {
          return {
            ...item,
            position: index,
            content: JSON.stringify(block_value)
          };
        }
        if (type_id === 8) {
          return {
            ...item,
            position: index,
            content: JSON.stringify(block_value)
          };
        }
        if (type_id === 11) {
          return {
            ...item,
            content: JSON.stringify(block_value),
            position: index
          };
        }
      }
    });
    setFormBlock(value);
  };
  const handleTitle = (event, itemIndex) => {
    let data = map(formBlock, (value, index) => {
      if (itemIndex !== index) {
        return value;
      } else {
        return {
          ...value,
          [event.target.name]: event.target.value
        };
      }
    });
    setFormBlock(data);
  };

  const handleMutiPost = (event, type_id, index, indexItem) => {
    let data = [];
    map(event, items => data.push(JSON.parse(items.value)));
    handleFormBlock(data, type_id, index, indexItem);
  };

  const editorChange = (data, type_id, key, index, indexItem) => {
    let value = { [key]: data };
    handleFormBlock(value, type_id, index, indexItem);
  };
  const renderElement = (item, index, indexItem) => {
    switch (item.type_id) {
      case 1: // input
        return (
          <FormGroup key={item.id}>
            <Label>{item.title}</Label>
            <Input
              type="text"
              name={item.key}
              required
              onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
            />
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
            <FormGroup>
              <Label for="template">{item.title}</Label>
              <Input
                type="select"
                name={item.key}
                required
                onChange={event => handleFormBlock(event.target.value, item.type_id, index, indexItem)}
              >
                <option value={0}>chọn...</option>
                {map(listNew, (news, i) => (
                  <option
                    key={i}
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
          </React.Fragment>
        );
      case 4: // mutile editor
        return (
          <FormGroup>
            <Label>{item.title}</Label>
            {map(fomEditor, (value, indexEdittor) => {
              return (
                <div key={indexEdittor} className="mt-2">
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const editorData = editor.getData();
                      // handleMutiEditors(editorData, data.key, indexEdittor, index, false, temple);
                    }}
                    onInit={editor => {
                      editor.ui.view.editable.element.style.height = 'auto';
                      editor.plugins.get('FileRepository').createUploadAdapter = function(loader) {
                        return new UploadAdapter(loader);
                      };
                    }}
                  />
                </div>
              );
            })}
            <div>
              <Button className="mt-3" onClick={() => addMoreFormEdittor(1, indexItem)}>
                {t('addBlock')}
              </Button>
            </div>
          </FormGroup>
        );
      case 8: //mutile post
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
            <FormGroup>
              <Label for="template">{item.title}</Label>
              <Select
                name="supportLocales"
                closeMenuOnSelect={false}
                options={listNew}
                isMulti
                onChange={event => handleMutiPost(event, item.type_id, index, indexItem)}
              />
            </FormGroup>
          </React.Fragment>
        );
      case 9: // mutile image
        return (
          <FormGroup>
            <Label for="template">{item.title}</Label>
            {map(formImg, (items, itemIndex) => {
              if (items.id === index && item.id === items.form_id) {
                return (
                  <div key={itemIndex}>
                    <div className="mt-3 btnBlock-remove">
                      <Button onClick={() => removeItem(itemIndex, index, false)}>
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
                              onChange={event => handleFormBlock(event, item.type_id, index, itemIndex)}
                            />
                          </div>
                          <div>
                            <Label>{t('block.image.description')}</Label>
                            <Input
                              type="text"
                              name="description"
                              onChange={event => handleFormBlock(event, item.type_id, index, itemIndex)}
                            />
                          </div>
                          <div>
                            <Label>{t('block.image.learn_more')}</Label>
                            <Input
                              type="text"
                              name="learnMore"
                              onChange={event => handleFormBlock(event, item.type_id, index, itemIndex)}
                            />
                          </div>
                        </div>
                        <div className="input_wapper">
                          <div>
                            <Label>{t('block.image.text')}</Label>
                            <Input
                              type="text"
                              name="text"
                              onChange={event => handleFormBlock(event, item.type_id, index, itemIndex)}
                            />
                          </div>
                          <div>
                            <Label>{t('block.image.url')}</Label>
                            <Input
                              type="text"
                              name="url"
                              onChange={event => handleFormBlock(event, item.type_id, index, itemIndex)}
                            />
                          </div>
                          <div>
                            <Label>{t('block.image.video_url')}</Label>
                            <Input
                              type="text"
                              name="video_url"
                              onChange={event => handleFormBlock(event, item.type_id, index, itemIndex)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            <div>
              <Button className="mt-3" onClick={() => addMoreFormImge(index, item.id)}>
                {t('addBlock')}
              </Button>
            </div>
          </FormGroup>
        );
      case 10: // singer image
        return (
          <FormGroup>
            <Label for="template">{item.title}</Label>
            {map(singleImage, (value, itemIndex) => {
              return (
                <div className="form-img" key={value.id}>
                  <div>
                    <div className="block_image mb-2">
                      <img
                        alt="items"
                        src={value.image === '' ? IconNoImage : value.image}
                        style={{ maxWidth: '100%' }}
                      />
                    </div>
                    <ModalMedia setState={() => setImage(item.type_id, index, indexItem)} />
                  </div>
                  <div className="input_image">
                    <div className="input_wapper">
                      <div>
                        <Label>{t('block.image.title')}</Label>
                        <Input
                          type="text"
                          name="title"
                          onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
                        />
                      </div>
                      <div>
                        <Label>{t('block.image.description')}</Label>
                        <Input
                          type="text"
                          name="description"
                          onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
                        />
                      </div>
                      <div>
                        <Label>{t('block.image.learn_more')}</Label>
                        <Input
                          type="text"
                          name="learnMore"
                          onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
                        />
                      </div>
                    </div>
                    <div className="input_wapper">
                      <div>
                        <Label>{t('block.image.text')}</Label>
                        <Input
                          type="text"
                          name="text"
                          onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
                        />
                      </div>
                      <div>
                        <Label>{t('block.image.url')}</Label>
                        <Input
                          type="text"
                          name="url"
                          onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
                        />
                      </div>
                      <div>
                        <Label>{t('block.image.video_url')}</Label>
                        <Input
                          type="text"
                          name="video_url"
                          onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </FormGroup>
        );
      case 11: //editor
        return (
          <FormGroup>
            <Label>{item.title}</Label>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const editorData = editor.getData();
                editorChange(editorData, item.type_id, item.key, index, indexItem);
              }}
              onInit={editor => {
                editor.ui.view.editable.element.style.height = 'auto';
                editor.plugins.get('FileRepository').createUploadAdapter = function(loader) {
                  return new UploadAdapter(loader);
                };
              }}
            />
          </FormGroup>
        );
      case 13: // textara
        return (
          <FormGroup>
            <Label for="template">{item.title}</Label>
            <Input
              type="textarea"
              name={item.key}
              rows="5"
              required
              onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
            />
          </FormGroup>
        );
      default:
        return (
          <FormGroup key={item.id}>
            <Label>{item.title}</Label>
            <Input
              type="text"
              name={item.key}
              required
              onChange={event => handleFormBlock(event, item.type_id, index, indexItem)}
            />
          </FormGroup>
        );
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    pageEdit({ ...formState.values, teams: formState.values.team, pageBlocks: [] }, '/pages/list');
  };

  return (
    <Row style={{ background: '#fff', padding: '15px 0' }}>
      <Col lg={3} md={4}>
        <h4 className="text-center">{t('block_page.title')}</h4>
        <div className="listBlock">
          {listTags && map(listTags, (values, index) => (
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
                  {map(listGroup, (value, index) => (
                    <option key={index} value={value.idTeam}>
                      {value.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <div className="mb-3">
              {listBlock && listBlock.length > 0 &&
                  map(listBlock, (value, index) => (
                    <div key={index + 1} className="mt-2 mb-2">
                      <ListGroupItem className="block__title" onClick={e => toggleOpeneBlock(e, value, index)}>
                        {`Khối mới`}
                        <div>
                          <Button onClick={() => removeBlock(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </div>
                      </ListGroupItem>
                      <Collapse isOpen={blockOpened === index}>
                        <ListGroup>
                          <ListGroupItem>
                            <FormGroup>
                              <Label>Tên khối</Label>
                              <Input type="text" name="title" onChange={event => handleTitle(event, index)} required />
                            </FormGroup>
                            {map(value.blockValues, (item, indexItem) => {
                              return renderElement(item, index, indexItem);
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
          <Button color="primary" type="submit">
            {t('save')}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

PageEdit.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    detail: state.PageReducer.detail,
    listTags: state.TagReducer.listTags,
    listGroup: state.GroupReducer.listGroupByUser
  };
};

const mapDispatchToProps = {
  getDetailById: PageActions.getPageByID,
  getListTags: TagActions.getTagAction,
  pageEdit: PageActions.EditPages,
  getGroup: GroupActions.getGroupByUserAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageEdit);
