import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import PagesCreate from '../../components/page/Form/PageCreate';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { useTranslation } from 'react-i18next';
import { PageActions, TagActions, CategoryActions, GroupActions } from '../../store/actions';
import { map, filter } from 'lodash';
import PopupComfirm from 'components/common/PopupComfirm';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  data: Proptypes.array.isRequired,
  listTags: Proptypes.array.isRequired,
  listGroup: Proptypes.array.isRequired,
  homeID: Proptypes.number,
  listCategory: Proptypes.array,
  getPage: Proptypes.func.isRequired,
  getTags: Proptypes.func.isRequired,
  addPage: Proptypes.func,
  editPage: Proptypes.func,
  deletePage: Proptypes.func,
  expanstion: Proptypes.func,
  updatePositionPages: Proptypes.func,
  deletePageBlock: Proptypes.func,
  getHomeID: Proptypes.func,
  getCategory: Proptypes.func,
  getGroup: Proptypes.func
};

function Page({
  data,
  homeID,
  listCategory,
  listTags,
  listGroup,
  getPage,
  getTags,
  addPage,
  editPage,
  deletePage,
  expanstion,
  updatePositionPages,
  deletePageBlock,
  getHomeID,
  getCategory,
  getGroup
}) {
  const [deleteActive, setDeleteActive] = useState(false);
  const [PageDetail, setPageDetai] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const [addChildrenActive, setAddChildrenActive] = useState(true);
  const [treeActive, setTreeActive] = useState({
    show: false,
    hiden: false
  });
  const [opened, setOpened] = useState(null);
  const [listBlock, setListBlock] = useState([]);
  const [formBlock, setFormBlock] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [formEdit, setFormEdit] = useState([]);
  const [actionChildrenSubmit, setActionChildrenSubmit] = useState(false);
  const [mutileImage, setMutileImage] = useState([]);
  const [mutileEditor, setMutileEditor] = useState([]);
  const [singerImage, setSingerImage] = useState([]);

  useEffect(() => {
    getPage();
    getTags();
    getHomeID();
    getCategory();
    getGroup();
  }, [getPage, getTags, getHomeID, getCategory, getGroup]);

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
  const editorChange = (data, key, index) => {
    let newForm = map(formBlock, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          [key]: data,
          position: index
        };
      }
    });
    let content = map(contentData, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          [key]: data
        };
      }
    });
    setContentData(content);
    setFormBlock(newForm);
  };
  const handleFomBlock = (event, index) => {
    event.persist();
    let newFormAddMore = map(formBlock, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          [event.target.name]:
            event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value,
          position: index,
          id_block: values.block_id,
          id: 0
        };
      }
    });
    let newContent = map(contentData, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        if (event.target.name !== 'title') {
          return {
            ...values,
            [event.target.name]:
              event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
          };
        }
      }
    });
    setContentData(newContent);
    setFormBlock(newFormAddMore);
  };
  const handleEidt = (event, index) => {
    event.persist();
    let newValues = map(formEdit, (values, indexs) => {
      if (index !== indexs) {
        return values;
      } else {
        return {
          ...values,
          [event.target.name]:
            event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value,
          id: 0,
          position: index
        };
      }
    });
    let newContent = map(contentData, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        if (values.length > 0) {
          return {
            content: values,
            [event.target.name]:
              event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
          };
        } else {
          return {
            ...values,
            [event.target.name]:
              event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
          };
        }
      }
    });
    setContentData(newContent);
    setFormEdit(newValues);
  };

  const handlePost = (data, index) => {
    let items = JSON.parse(data);
    let newValues = map(formBlock, (values, indexs) => {
      if (index !== indexs) {
        return values;
      } else {
        return {
          ...values,
          ...items,
          id: 0,
          position: index
        };
      }
    });
    let newContent = map(contentData, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          ...items
        };
      }
    });
    setContentData(newContent);
    setFormBlock(newValues);
  };

  const handlePostEdit = (data, index) => {
    let items = JSON.parse(data);
    let newValues = map(formEdit, (values, indexs) => {
      if (index !== indexs) {
        return values;
      } else {
        return {
          ...values,
          ...items,
          position: index
        };
      }
    });
    let newContent = map(contentData, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          ...items
        };
      }
    });
    setContentData(newContent);
    setFormEdit(newValues);
  };

  const mutiPost = (data, index) => {
    let newValues = map(formBlock, (values, indexs) => {
      if (index !== indexs) {
        return values;
      } else {
        return {
          ...values,
          position: index,
          mutilePost: data
        };
      }
    });
    let newContent = map(contentData, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          mutilePost: data
        };
      }
    });
    setContentData(newContent);
    setFormBlock(newValues);
  };

  const mutiPostEdit = (data, index) => {
    let newValues = map(formEdit, (values, indexs) => {
      if (index !== indexs) {
        return values;
      } else {
        return {
          ...values,
          position: index,
          mutilePost: data
        };
      }
    });
    let newContent = map(contentData, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          mutilePost: data
        };
      }
    });
    setContentData(newContent);
    setFormEdit(newValues);
  };

  const handleImge = (data, index) => {
    let newForm = map(formBlock, (value, indexItems) => {
      if (index !== indexItems) {
        return value;
      } else {
        return {
          ...value,
          id: 0,
          position: index,
          id_block: value.block_id,
          mutileImge: data
        };
      }
    });
    let content = map(contentData, (values, indexItems) => {
      if (index !== indexItems) {
        return values;
      } else {
        return {
          ...values,
          mutileImge: data
        };
      }
    });
    setContentData(content);
    setFormBlock(newForm);
  };

  const handleEditImge = (data, index) => {
    let newValues = map(formEdit, (values, indexs) => {
      if (index !== indexs) {
        return values;
      } else {
        return {
          ...values,
          position: index,
          mutileImge: data
        };
      }
    });
    let newContent = map(contentData, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          mutileImge: data
        };
      }
    });
    setContentData(newContent);
    setFormEdit(newValues);
  };

  const handleMutiEditor = (data, index) => {
    let newForm = map(formBlock, (value, indexItems) => {
      if (index !== indexItems) {
        return value;
      } else {
        return {
          ...value,
          id: 0,
          position: index,
          id_block: value.block_id,
          mutileEditor: data
        };
      }
    });
    let content = map(contentData, (values, indexItems) => {
      if (index !== indexItems) {
        return values;
      } else {
        return {
          ...values,
          mutileEditor: data
        };
      }
    });
    setContentData(content);
    setFormBlock(newForm);
  };

  const handleEditMutileEditor = (data, index) => {
    let newForm = map(formEdit, (value, indexItems) => {
      if (index !== indexItems) {
        return value;
      } else {
        return {
          ...value,
          position: index,
          mutileEditor: data
        };
      }
    });
    let content = map(contentData, (values, indexItems) => {
      if (index !== indexItems) {
        return values;
      } else {
        return {
          ...values,
          mutileEditor: data
        };
      }
    });
    setContentData(content);
    setFormBlock(newForm);
  };
  const onSubmit = event => {
    event.preventDefault();
    if (deleteActive) {
      for (let i = 0; i < listBlock.length; i++) {
        let html = listBlock[i].html;
        let muitle_post_html = '';
        if (contentData[i] !== undefined && contentData[i]) {
          let key = Object.keys(contentData[i]);
          let regexp = '';
          let replaceHTML = '';
          key.forEach(items => {
            regexp += items + '|';
          });
          let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
          replaceHTML = html.replace(regex, function(match) {
            return contentData[i][match];
          });
          let contentHtml = replaceHTML.replace(/[{}]/g, '');
          formEdit[i] = {
            ...formEdit[i],
            ...formBlock[i],
            position: i,
            title: contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title,
            content: JSON.stringify(contentData[i]),
            contentHtml: `<div><h2>${
              contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title
            }</h2> ${contentHtml}</div`
          };
        }
        if (contentData[i] !== undefined && contentData[i].mutileImge && contentData[i].mutileImge !== undefined) {
          for (let j = 0; j < contentData[i].mutileImge.length; j++) {
            let key = Object.keys(contentData[i].mutileImge[j]);
            let regexp = '';
            let replaceHTML = '';
            key.forEach(items => {
              regexp += items + '|';
            });
            let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
            replaceHTML = html.replace(regex, function(match) {
              return contentData[i].mutileImge[j][match];
            });
            let contentHtml = replaceHTML.replace(/[{}]/g, '');
            muitle_post_html = muitle_post_html + contentHtml;
          }
          let content = contentData[i].mutileImge;
          formEdit[i] = {
            ...formEdit[i],
            ...formBlock[i],
            title: contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title,
            content: JSON.stringify(content),
            contentHtml: `<div><h2>${
              contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title
            }</h2><div class="post_container">${muitle_post_html}</div></div>`
          };
        }
        if (contentData[i] !== undefined && contentData[i].mutileEditor && contentData[i].mutileEditor !== undefined) {
          for (let j = 0; j < contentData[i].mutileEditor.length; j++) {
            let key = Object.keys(contentData[i].mutileEditor[j]);
            let regexp = '';
            let replaceHTML = '';
            key.forEach(items => {
              regexp += items + '|';
            });
            let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
            replaceHTML = html.replace(regex, function(match) {
              return contentData[i].mutileEditor[j][match];
            });
            let contentHtml = replaceHTML.replace(/[{}]/g, '');
            muitle_post_html = muitle_post_html + contentHtml;
          }
          let content = contentData[i].mutileEditor;
          formEdit[i] = {
            ...formEdit[i],
            ...formBlock[i],
            title: contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title,
            content: JSON.stringify(content),
            contentHtml: `<div><h2>${
              contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title
            }</h2>${muitle_post_html}</div>`
          };
        }
        if (contentData[i] !== undefined && contentData[i].content) {
          for (let j = 0; j < contentData[i].content.length; j++) {
            let key = Object.keys(contentData[i].content[j]);
            let regexp = '';
            let replaceHTML = '';
            key.forEach(items => {
              regexp += items + '|';
            });
            let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
            replaceHTML = html.replace(regex, function(match) {
              return contentData[i].content[j][match];
            });
            let contentHtml = replaceHTML.replace(/[{}]/g, '');
            muitle_post_html = muitle_post_html + contentHtml;
          }
          formEdit[i] = {
            ...formEdit[i],
            ...formBlock[i],
            position: i,
            title: contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title,
            content: JSON.stringify(contentData[i].content),
            contentHtml: `<div><h2>${
              contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title
            }</h2> <div class="post_container">${muitle_post_html}</div> </div>`
          };
        }
        if (contentData[i] !== undefined && contentData[i].length > 0) {
          for (let j = 0; j < contentData[i].length; j++) {
            let key = Object.keys(contentData[i][j]);
            let regexp = '';
            let replaceHTML = '';
            key.forEach(items => {
              regexp += items + '|';
            });
            let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
            replaceHTML = html.replace(regex, function(match) {
              return contentData[i][j][match];
            });
            let contentHtml = replaceHTML.replace(/[{}]/g, '');
            muitle_post_html = muitle_post_html + contentHtml;
          }
          formEdit[i] = {
            ...formEdit[i],
            ...formBlock[i],
            position: i,
            title: contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title,
            content: JSON.stringify(contentData[i]),
            contentHtml: `<div><h2>${
              contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title
            }</h2> <div class="post_container">${muitle_post_html}</div> </div>`
          };
        }
        if (contentData[i] !== undefined && contentData[i].mutilePost) {
          for (let j = 0; j < contentData[i].mutilePost.length; j++) {
            let key = Object.keys(contentData[i].mutilePost[j]);
            let regexp = '';
            let replaceHTML = '';
            key.forEach(items => {
              regexp += items + '|';
            });
            let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
            replaceHTML = html.replace(regex, function(match) {
              return contentData[i].mutilePost[j][match];
            });
            let contentHtml = replaceHTML.replace(/[{}]/g, '');
            muitle_post_html = muitle_post_html + contentHtml;
          }
          let content = contentData[i].mutilePost;
          formEdit[i] = {
            ...formEdit[i],
            ...formBlock[i],
            position: i,
            title: contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title,
            content: JSON.stringify(content),
            contentHtml: `<div><h2>${
              contentData[i].title !== undefined ? contentData[i].title : formBlock[i].title
            }</h2> <div class="post_container">${muitle_post_html}</div> </div>`
          };
        }
      }
      const data = {
        ...formState.values,
        pageBlocks: [...formEdit]
      };
      editPage(data);
      setFormState({
        values: {},
        touched: {}
      });
      setListBlock([]);
      setFormBlock([]);
      setContentData([]);
    } else {
      for (let i = 0; i < listBlock.length; i++) {
        let html = listBlock[i].html;
        let muitle_post_html = '';
        if (contentData[i] !== undefined && contentData[i]) {
          let key = Object.keys(contentData[i]);
          let regexp = '';
          let replaceHTML = '';
          key.forEach(items => {
            regexp += items + '|';
          });
          let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
          replaceHTML = html.replace(regex, function(match) {
            return contentData[i][match];
          });
          let contentHtml = replaceHTML.replace(/[{}]/g, '');
          formBlock[i] = {
            ...formBlock[i],
            content: JSON.stringify(contentData[i]),
            contentHtml: contentHtml
          };
        }

        if (contentData[i] !== undefined && contentData[i].mutileImge) {
          for (let j = 0; j < contentData[i].mutileImge.length; j++) {
            let key = Object.keys(contentData[i].mutileImge[j]);
            let regexp = '';
            let replaceHTML = '';
            key.forEach(items => {
              regexp += items + '|';
            });
            let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
            replaceHTML = html.replace(regex, function(match) {
              return contentData[i].mutileImge[j][match];
            });
            let contentHtml = replaceHTML.replace(/[{}]/g, '');
            muitle_post_html = muitle_post_html + contentHtml;
          }
          let content = contentData[i].mutileImge;
          formBlock[i] = {
            ...formBlock[i],
            content: JSON.stringify(content),
            contentHtml: `<div class="post_container"><h2>${formBlock[i].title}</h2>${muitle_post_html}</div>`
          };
        }
        if (contentData[i] !== undefined && contentData[i].mutileEditor) {
          for (let j = 0; j < contentData[i].mutileEditor.length; j++) {
            let key = Object.keys(contentData[i].mutileEditor[j]);
            let regexp = '';
            let replaceHTML = '';
            key.forEach(items => {
              regexp += items + '|';
            });
            let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
            replaceHTML = html.replace(regex, function(match) {
              return contentData[i].mutileEditor[j][match];
            });
            let contentHtml = replaceHTML.replace(/[{}]/g, '');
            muitle_post_html = muitle_post_html + contentHtml;
          }
          let content = contentData[i].mutileImge;
          formEdit[i] = {
            ...formEdit[i],
            ...formBlock[i],
            content: JSON.stringify(content),
            contentHtml: `<div class="post_container"><h2>${formBlock[i].title}</h2>${muitle_post_html}</div>`
          };
        }
        if (contentData[i] !== undefined && contentData[i].mutilePost) {
          for (let j = 0; j < contentData[i].mutilePost.length; j++) {
            let key = Object.keys(contentData[i].mutilePost[j]);
            let regexp = '';
            let replaceHTML = '';
            key.forEach(items => {
              regexp += items + '|';
            });
            let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
            replaceHTML = html.replace(regex, function(match) {
              return contentData[i].mutilePost[j][match];
            });
            let contentHtml = replaceHTML.replace(/[{}]/g, '');
            muitle_post_html = muitle_post_html + contentHtml;
          }
          let content = contentData[i].mutilePost;
          formBlock[i] = {
            ...formBlock[i],
            content: JSON.stringify(content),
            contentHtml: `<div class="post_container"><h2>${formBlock[i].title}</h2>${muitle_post_html}</div>`
          };
        }
      }
      let data = {};
      if (actionChildrenSubmit) {
        data = {
          ...formState.values,
          parent_id: PageDetail.id,
          pageBlocks: [...formBlock]
        };
      } else {
        data = {
          ...formState.values,
          is_active: formState.values.is_active === null ? 0 : formState.values.is_active,
          parent_id: homeID,
          pageBlocks: [...formBlock]
        };
      }
      addPage(data);
      setFormState({
        values: {},
        touched: {}
      });
      setListBlock([]);
      setFormBlock([]);
      setContentData([]);
    }
  };
  const changeTree = treeData => {
    expanstion(treeData);
  };
  const expansion = expanded => {
    if (expanded) {
      setTreeActive(treeActive => ({
        ...treeActive,
        show: true,
        hiden: false
      }));
    } else {
      setTreeActive(treeActive => ({
        ...treeActive,
        show: false,
        hiden: true
      }));
    }
    const newData = toggleExpandedForAll({ treeData: data, expanded });
    expanstion(newData);
  };

  const addNode = () => {
    setFormState({
      values: {},
      touched: {}
    });
    setListBlock([]);
    setFormBlock([]);
    setContentData([]);
    setDeleteActive(false);
    setAddChildrenActive(true);
    setActionChildrenSubmit(false);
  };

  const click = (node, path) => {
    setFormState(formState => ({
      ...formState,
      values: node
    }));
    setPageDetai(node);
    let stateEdit = [];
    let newContent = [];
    let listBlock = [];
    let mutileImage = [];
    let mutileEditor = [];
    let singerImage = [];
    map(node.pageBlocks, (values, index) => {
      let content = JSON.parse(values.content);
      newContent.push(content);
      let block = values.blocks;
      let blockValue = block.blockValues;
      let type = null;
      if (blockValue[0] !== undefined) {
        type = blockValue[0].type_id;
      }
      if (type === 4) {
        mutileEditor.push(...content);
      }
      if (type === 9) {
        mutileImage.push(...content);
      }
      if (type === 10) {
        singerImage.push(...content);
      }
      listBlock.push({ ...values.blocks, content: values.content, title: values.title });

      stateEdit = [
        ...stateEdit,
        { ...content, id: values.id, id_page: values.id_page, id_block: values.blocks.id, title: values.title }
      ];
    });
    setMutileImage(mutileImage);
    setMutileEditor(mutileEditor);
    setSingerImage(singerImage);
    setFormBlock(stateEdit);
    setContentData([...newContent]);
    setFormEdit([...stateEdit]);
    setListBlock(listBlock);
    setAddChildrenActive(false);
    setDeleteActive(true);
    setPageDetai(node);
  };

  const onMove = treeData => {
    if (treeData.nextParentNode !== null) {
      let idParent = treeData.nextParentNode.id;
      let idPage = treeData.node.id;
      let positions = 0;
      let childrenData = treeData.nextParentNode.children;
      for (let i = 0; i < childrenData.length; i++) {
        if (childrenData[i].id === idPage) {
          positions = i;
          break;
        }
      }
      updatePositionPages(idPage, idParent, positions);
    } else {
      getPage();
    }
  };
  const onDelete = () => {
    deletePage(formState.values.id);
    setIsOpen(!isOpen);
    setListBlock([]);
    setFormBlock([]);
    setContentData([]);
    setFormState(formState => ({
      ...formState,
      values: {}
    }));
    setDeleteActive(false);
  };
  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpened(opened === index ? null : index);
  };

  const removeItem = indexItems => {
    const newValues = filter(listBlock, (items, index) => index !== indexItems);
    setListBlock(newValues);
    setFormBlock(newValues);
  };

  const setListData = (items, index) => {
    let newItems = {
      ...items,
      newItem: 0
    };
    setListBlock([...listBlock, newItems]);
    setFormBlock([...formBlock, items.blockValues[0]]);
    setContentData([...contentData, {}]);
  };

  const deletePageBlockItems = (id, pageid, indexItems) => {
    if (pageid !== null) {
      deletePageBlock(id, pageid);
      const newValues = filter(listBlock, (items, index) => index !== indexItems);
      setListBlock(newValues);
      setFormBlock(newValues);
    } else {
      const newValues = filter(listBlock, (items, index) => index !== indexItems);
      setListBlock(newValues);
      setFormBlock(newValues);
    }
  };

  return (
    <React.Fragment>
      <h4> {t('page.page')}</h4>
      <Row className="category__wapper" style={{ height: '100%' }}>
        <Col lg={3} md={4}>
          <Button className="mb-2 mr-2" onClick={addNode}>
            {t('page.addRoot')}
          </Button>
          <Button
            className="mb-2"
            disabled={addChildrenActive}
            onClick={() => {
              setDeleteActive(false);
              setFormState({
                values: {},
                touched: {}
              });
              setListBlock([]);
              setFormBlock([]);
              setContentData([]);
              setActionChildrenSubmit(true);
            }}
          >
            {t('page.addChildren')}
          </Button>
          <div>
            <span
              className={treeActive.hiden ? 'active__tree span__link' : 'span__link'}
              onClick={() => expansion(false)}
            >
              {t('category_page.hideAll')}
            </span>
            |
            <span
              className={treeActive.show ? 'active__tree span__link' : 'span__link'}
              onClick={() => expansion(true)}
            >
              {t('category_page.showAll')}
            </span>
          </div>
          <div style={{ height: '50%' }}>
            <SortableTree
              treeData={data}
              onChange={treeData => changeTree(treeData)}
              generateNodeProps={({ node, path }) => ({
                onClick: () => click(node, path)
              })}
              onMoveNode={treeData => onMove(treeData)}
              theme={FileExplorerTheme}
            />
          </div>
          <div className="listBlock">
            {map(listTags, (values, index) => (
              <React.Fragment key={index}>
                <ListGroupItem onClick={e => toggleOpened(e, index)}>{values.name}</ListGroupItem>
                <Collapse isOpen={opened === index}>
                  {map(values.blocks, (items, index) => (
                    <ListGroup key={index}>
                      <ListGroupItem style={{ backgroundColor: '#f5f5f5' }} onClick={() => setListData(items, index)}>
                        {items.name}
                      </ListGroupItem>
                    </ListGroup>
                  ))}
                </Collapse>
              </React.Fragment>
            ))}
          </div>
        </Col>
        <Col lg={9} md={8}>
          <Row>
            <Col sm="12">
              <PagesCreate
                handleChange={handleChange}
                onSubmit={onSubmit}
                value={formState.values}
                stateEdit={formEdit}
                detail={PageDetail}
                blockData={listBlock}
                handleEidt={(event, index) => handleEidt(event, index)}
                handleFomBlock={(event, index) => handleFomBlock(event, index)}
                onRemoveBlock={index => removeItem(index)}
                onRemoveBlockValue={(id, pageid, indexItems) => deletePageBlockItems(id, pageid, indexItems)}
                deleteActive={deleteActive}
                listCategory={listCategory}
                listGroup={listGroup}
                handlePost={handlePost}
                handlePostEdit={handlePostEdit}
                mutiPost={mutiPost}
                mutiPostEdit={mutiPostEdit}
                mutileImage={mutileImage}
                handleImge={handleImge}
                handleEditImge={handleEditImge}
                mutileEditor={mutileEditor}
                handleMutiEditor={handleMutiEditor}
                handleEditMutileEditor={handleEditMutileEditor}
                singerImageData={singerImage}
                editorChange={(data, key, index) => editorChange(data, key, index)}
                onDelete={() => setIsOpen(!isOpen)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

Page.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    data: state.PageReducer.data,
    listTags: state.TagReducer.listTags,
    listCategory: state.CategoryReducer.data,
    homeID: state.PageReducer.homeID,
    listGroup: state.GroupReducer.listGroupByUser
  };
};

const mapDispatchToProps = {
  getPage: PageActions.GetPages,
  getTags: TagActions.getTagAction,
  addPage: PageActions.AddPages,
  editPage: PageActions.EditPages,
  deletePage: PageActions.DeletePages,
  expanstion: PageActions.expansionPageAction,
  updatePositionPages: PageActions.updatePositionPages,
  deletePageBlock: PageActions.detelePageBlockAction,
  getHomeID: PageActions.getHomepageIDAction,
  getCategory: CategoryActions.getCategoryAction,
  getGroup: GroupActions.getGroupByUserAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
