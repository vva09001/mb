import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import PagesCreate from '../../components/page/Form/PageCreate';
import PagesCreateChild from '../../components/page/Form/PageCreate';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { useTranslation } from 'react-i18next';
import { PageActions } from '../../store/actions';
import PopupComfirm from 'components/common/PopupComfirm';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  data: Proptypes.array.isRequired,
  getPage: Proptypes.func.isRequired,
  addPage: Proptypes.func,
  editPage: Proptypes.func,
  deletePage: Proptypes.func,
  expanstion: Proptypes.func,
  updatePosition: Proptypes.func
};

function Page({ data, getPage, addPage, editPage, deletePage, expanstion, updatePosition }) {
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

  useEffect(() => {
    getPage();
  }, [getPage]);

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
  const onSubmit = event => {
    event.preventDefault();
    if (deleteActive) {
      editPage(formState.values);
    } else {
      addPage(formState.values);
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
      updatePosition(idPage, idParent, positions);
    } else {
      getPage();
    }
  };

  const onDelete = () => {
    deletePage(formState.values.id);
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <h4> {t('page.page')}</h4>
      <Row className="catelogy__wapper">
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
          <div style={{ height: '100%' }}>
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
    data: state.PageReducer.data
  };
};

const mapDispatchToProps = {
  getPage: PageActions.GetPages,
  addPage: PageActions.AddPages,
  editPage: PageActions.EditPages,
  deletePage: PageActions.DeletePages,
  expanstion: PageActions.expansionAction,
  updatePosition: PageActions.updatePositionAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
