import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CategoryForm from 'components/New/Category/CategoryForm';
import CategoryFormChildren from 'components/New/Category/CategoryFormChildren';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { CategoryActions } from '../../../store/actions';
import PopupComfirm from 'components/common/PopupComfirm';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  listCategory: Proptypes.array.isRequired,
  getCategory: Proptypes.func.isRequired,
  addCategory: Proptypes.func,
  editCategory: Proptypes.func,
  deleteCategory: Proptypes.func,
  expanstion: Proptypes.func,
  updatePosition: Proptypes.func
};

function Category({
  listCategory,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
  expanstion,
  updatePosition
}) {
  const [activeTab, setActiveTab] = useState('1');
  const [deleteActive, setDeleteActive] = useState(false);
  const [categoryDetail, setCategoryDetai] = useState({});
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

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const { t } = useTranslation();

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
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const onSubmit = event => {
    event.preventDefault();
    if (deleteActive) {
      editCategory(formState.values);
    } else {
      addCategory(formState.values);
      setFormState({
        values: {},
        touched: {}
      });
    }
  };

  const onSubmitChildren = event => {
    event.preventDefault();
    if (deleteActive) {
      editCategory(formState.values);
    } else {
      const values = {
        ...formState.values,
        parentId: categoryDetail.id
      };
      addCategory(values);
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
    const newData = toggleExpandedForAll({ treeData: listCategory, expanded });
    console.log(newData);
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
    setCategoryDetai(node);
  };

  const onMove = treeData => {
    if (treeData.nextParentNode !== null) {
      let idParent = treeData.nextParentNode.id;
      let idCategory = treeData.node.id;
      let positions = 0;
      let childrenData = treeData.nextParentNode.children;
      for (let i = 0; i < childrenData.length; i++) {
        if (childrenData[i].id === idCategory) {
          positions = i;
          break;
        }
      }
      updatePosition(idCategory, idParent, positions);
    } else {
      getCategory();
    }
  };

  const onDelete = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <h4> {t('category')}</h4>
      <Row className="category__wapper">
        <Col lg={3} md={4}>
          <Button className="mb-2" onClick={addNode}>
            {t('category_page.addRoot')}
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
            {t('category_page.addChildren')}
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
          <div style={{ height: '100%' }}>
            <SortableTree
              treeData={listCategory}
              onChange={treeData => changeTree(treeData)}
              generateNodeProps={({ node, path }) => ({
                onClick: () => click(node, path)
              })}
              onMoveNode={treeData => onMove(treeData)}
              theme={FileExplorerTheme}
            />
          </div>
        </Col>
        <Col lg={9} md={8}>
          <div>
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
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    {!formChildren && (
                      <CategoryForm
                        handleChange={handleChange}
                        onSubmit={onSubmit}
                        value={formState.values}
                        deleteActive={deleteActive}
                        onDelete={() => setIsOpen(!isOpen)}
                      />
                    )}
                    {formChildren && (
                      <CategoryFormChildren
                        handleChange={handleChange}
                        value={formState.values}
                        deleteActive={deleteActive}
                        onSubmit={onSubmitChildren}
                      />
                    )}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

Category.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    listCategory: state.CategoryReducer.listCategory
  };
};

const mapDispatchToProps = {
  getCategory: CategoryActions.getCategoryAction,
  addCategory: CategoryActions.addCategoryAction,
  editCategory: CategoryActions.editCategoryAction,
  deleteCategory: CategoryActions.deleteCategoryAction,
  expanstion: CategoryActions.expansionAction,
  updatePosition: CategoryActions.updatePositionAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
