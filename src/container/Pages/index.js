import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import PagesCreate from '../../components/page/Form/PageCreate';
import PagesCreateChild from '../../components/page/Form/PageCreate';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { useTranslation } from 'react-i18next';
import { PageActions, TagActions } from '../../store/actions';
import { map, filter } from 'lodash';
import PopupComfirm from 'components/common/PopupComfirm';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  data: Proptypes.array.isRequired,
  listTags: Proptypes.array.isRequired,
  getPage: Proptypes.func.isRequired,
  getTags: Proptypes.func.isRequired,
  addPage: Proptypes.func,
  editPage: Proptypes.func,
  deletePage: Proptypes.func,
  expanstion: Proptypes.func,
  updatePositionPages: Proptypes.func
};

function Page({ data, listTags, getPage, getTags, addPage, editPage, deletePage, expanstion, updatePositionPages }) {
  const [deleteActive, setDeleteActive] = useState(false);
  const [PageDetail, setPageDetai] = useState({});
  const [formChildren, setFormChildren] = useState(false);
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

  useEffect(() => {
    getPage();
    getTags();
  }, [getPage, getTags]);

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
          id_block: values.block_id
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
  const onSubmit = event => {
    event.preventDefault();
    if (deleteActive) {
      editPage(formState.values);
    } else {
      for (let i = 0; i < formBlock.length; i++) {
        console.log(formBlock);
        formBlock[i] = {
          ...formBlock[i],
          content: JSON.stringify(contentData[i])
        };
      }
      const data = {
        ...formState.values,
        pageBlocks: [...formBlock]
      };
      // console.log(data);
      addPage(data);
      setFormState({
        values: {},
        touched: {}
      });
    }
  };

  const onSubmitChildren = event => {
    event.preventDefault();
    if (deleteActive) {
      editPage(formState.values);
    } else {
      const values = {
        ...formState.values,
        parentId: PageDetail.id
      };
      addPage(values);
      setFormState({
        values: {},
        touched: {}
      });
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
    setDeleteActive(false);
  };

  const click = (node, path) => {
    setFormState(formState => ({
      ...formState,
      values: node
    }));
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
    setListBlock([...listBlock, items]);
    setFormBlock([...formBlock, items.blockValues[index]]);
    setContentData([...contentData, {}]);
  };

  return (
    <React.Fragment>
      <h4> {t('page.page')}</h4>
      <Row className="category__wapper">
        <Col lg={3} md={4}>
          <Button className="mb-2" onClick={addNode}>
            {t('page.addRoot')}
          </Button>
          <Button
            className="mb-2"
            disabled={addChildrenActive}
            onClick={() => {
              setFormChildren(true);
              setDeleteActive(false);
              setFormState({
                values: {},
                touched: {}
              });
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
          <div style={{ height: '30%' }}>
            <SortableTree
              treeData={data}
              onChange={treeData => changeTree(treeData)}
              generateNodeProps={({ node, path }) => ({
                onClick: () => click(node, path)
              })}
              onMoveNode={treeData => onMove(treeData)}
              theme={FileExplorerTheme}
            />
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
          <div>
            <Row>
              <Col sm="12">
                {!formChildren && (
                  <PagesCreate
                    handleChange={handleChange}
                    onSubmit={onSubmit}
                    value={formState.values}
                    blockData={listBlock}
                    handleFomBlock={(event, index) => handleFomBlock(event, index)}
                    onRemoveBlock={index => removeItem(index)}
                    deleteActive={deleteActive}
                    onDelete={() => setIsOpen(!isOpen)}
                  />
                )}
                {formChildren && (
                  <PagesCreateChild
                    handleChange={handleChange}
                    value={formState.values}
                    deleteActive={deleteActive}
                    onSubmit={onSubmitChildren}
                    onDelete={() => setIsOpen(!isOpen)}
                  />
                )}
              </Col>
            </Row>
          </div>
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
    listTags: state.TagReducer.listTags
  };
};

const mapDispatchToProps = {
  getPage: PageActions.GetPages,
  getTags: TagActions.getTagAction,
  addPage: PageActions.AddPages,
  editPage: PageActions.EditPages,
  deletePage: PageActions.DeletePages,
  expanstion: PageActions.expansionPageAction,
  updatePositionPages: PageActions.updatePositionPages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
