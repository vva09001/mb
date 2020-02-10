import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Collapse } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from 'services/uploadImage';
import ModalMedia from 'components/Media/ModalMedia';
import Select from 'react-select';
import IconNoImage from 'assets/img/mb/no_image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { map, filter } from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { PageActions, TagActions, GroupActions, NewActions, CategoryActions } from '../../store/actions';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  listTags: PropTypes.array,
  listGroup: PropTypes.array,
  listCategory: PropTypes.array,
  listNew: PropTypes.array,
  imageSeletedata: PropTypes.object,
  getListTags: PropTypes.func,
  getGroup: PropTypes.func,
  pageCreate: PropTypes.func,
  getCategory: PropTypes.func,
  getNewByCategory: PropTypes.func
};

function PageCreate({
  listTags,
  listGroup,
  listCategory,
  listNew,
  imageSeletedata,
  getListTags,
  getGroup,
  getCategory,
  getNewByCategory,
  pageCreate
}) {
  const [formState, setFormState] = useState({ values: {} });
  const [fomEditor, setFomEditor] = useState([{}]);
  const [formImg, setFormImg] = useState([]);
  const [singleImage, setSingleImage] = useState([
    { id: 1, title: '', description: '', image: '', learnMore: '', text: '', url: '', video_url: '' }
  ]);
  const [blockValue, setBlockValue] = useState([]);
  const [formBlock, setFormBlock] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [categoryID, setCategoryID] = useState(null);
  const [opened, setOpened] = useState(null);
  const [blockOpened, setBlockOpened] = useState(null);
  const [listBlock, setListBlock] = useState([]);

  const { id } = useParams();
  const { t } = useTranslation();
  useEffect(() => {
    getListTags();
    getGroup();
    getCategory();
  }, [getListTags, getGroup, getCategory]);

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
  const removeBlock = index => {
    let data = filter(listBlock, (item, itemIndex) => itemIndex !== index);
    let form = filter(formBlock, (item, itemIndex) => itemIndex !== index);
    setListBlock(data);
    setFormBlock(form);
    setBlockOpened(null);
  };

  const getNewsByCategoryID = id => {
    setCategoryID(JSON.parse(id));
    getNewByCategory(id);
  };

  const addMoreFormEdittor = () => {};

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
    for (let i = 0; i < listBlock.length; i++) {
      let html = listBlock[i].html;
      let htmlelement = [];
      if (html.indexOf('#enfor') >= 0) {
        htmlelement = html.split('#enfor');
      }
      let content = JSON.parse(formBlock[i].content);

      let elementIdOrderSort = Array.from(new Set(content.map(x => x.id).sort())); // [37, 38]

      let resultHtml = '';
      for (let j = 0; j < content.length; j++) {
        let elementHtml = html;
        if (html.indexOf('#enfor') >= 0) {
          // find html index in array.
          let elementId = content[j].form_id; // eg: 38
          let htmlId = elementIdOrderSort.indexOf(elementId); // eg: 1
          elementHtml = htmlelement[htmlId];
        }

        let key = Object.keys(content[j]);
        if (content[j].mutile_post) {
          key = Object.keys(content[j].mutile_post[j]);
          content = content[j].mutile_post;
        }
        let regexp = '';
        let replaceHTML = '';
        key.forEach(items => {
          regexp += items + '|';
        });

        let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
        replaceHTML = elementHtml.replace(regex, function(match) {
          return content[j][match];
        });
        resultHtml += replaceHTML;
        //html = replaceHTML; // TODO: meo hieu lam gi
        formBlock[i] = {
          ...formBlock[i],
          contentHtml: resultHtml
        };
      }
    }
    for (let i = 0; i < formBlock.length; i++) {
      formBlock[i] = {
        ...formBlock[i],
        contentHtml: formBlock[i].contentHtml.replace(/[{}]/g, '')
      };
    }
    if (formState.values.has_sidebar === undefined)
    formState.values.has_sidebar = 0;
  
    // console.log(formBlock);

    pageCreate({ ...formState.values, parent_id: id, is_active: 0, pageBlocks: formBlock });
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
                      <ListGroupItem style={{ backgroundColor: '#f5f5f5' }} onClick={() => setListData(items, index)}>
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
                <Input type="text" name="name" required onChange={handleChange} />
              </FormGroup>
              <div className="check__box">
                <Label>{t('sidebar')}</Label>
                <div>
                  <Input type="checkbox" name="has_sidebar" onChange={handleChange} />
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
                <Label for="teams">{t('page.group')}</Label>
                <Input type="select" name="teams" required onChange={handleChange}>
                  <option value={0}>{t('select')}</option>
                  {map(listGroup, (value, index) => (
                    <option key={index} value={value.idTeam}>
                      {value.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <div className="mb-3">
                {listBlock.length > 0 &&
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
                <Label for="exampleName">{t('meta.title')}</Label>
                <Input type="text" name="meta_title" onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>{t('meta.keywords')}</Label>
                <Input type="text" name="meta_keyword" onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">{t('meta.description')}</Label>
                <Input type="textarea" name="meta_description" rows="5" onChange={handleChange} />
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

PageCreate.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    listTags: state.TagReducer.listTags,
    listGroup: state.GroupReducer.listGroupByUser,
    listCategory: state.CategoryReducer.data,
    listNew: state.NewReducer.listNewByCategory,
    imageSeletedata: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  getListTags: TagActions.getTagAction,
  pageCreate: PageActions.AddPages,
  getGroup: GroupActions.getGroupByUserAction,
  getCategory: CategoryActions.getCategoryAction,
  getNewByCategory: NewActions.getNewByCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCreate);
