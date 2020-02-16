import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import ButtonIcon from 'components/common/ButtonIcon';
import PopupComfirm from 'components/common/PopupComfirm';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import { PageActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import history from 'helpers/history';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  data: Proptypes.array,
  homeID: Proptypes.number,
  getPage: Proptypes.func,
  getHomeID: Proptypes.func,
  deletePage: Proptypes.func,
  expanstion: Proptypes.func,
  updatePositionPages: Proptypes.func
};

function Page({ data, homeID, getPage, getHomeID, deletePage, expanstion, updatePositionPages }) {
  const [pageID, setPageID] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [treeActive, setTreeActive] = useState({
    show: false,
    hiden: false
  });

  const { t } = useTranslation();

  useEffect(() => {
    getPage();
    getHomeID();
  }, [getPage, getHomeID]);

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

  const clickDelete = (node, path) => {
    setPageID(node.id);
    setIsOpen(!isOpen);
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
    deletePage(pageID);
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <h4> {t('page.page')}</h4>
      <Row className="category__wapper" style={{ minHeight: '590px' }}>
        <Col lg={3} md={4}>
          <Button className="mb-2 mr-2" color="primary" onClick={() => history.push(`/pages/create/${homeID}`)}>
            {t('create')}
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
        </Col>
        <Col lg={9} md={8}>
          <div style={{ height: '100%' }}>
            <SortableTree
              treeData={data}
              onChange={treeData => changeTree(treeData)}
              generateNodeProps={({ node, path }) => ({
                buttons: [
                  // eslint-disable-next-line react/jsx-key
                  <ButtonIcon
                    className="mr-1"
                    color="primary"
                    icon="plus"
                    iconAlign="left"
                    onClick={() => history.push(`/pages/create/${node.id}`)}
                    size="sm"
                    outline
                  />,
                  // eslint-disable-next-line react/jsx-key
                  <ButtonIcon
                    className="mr-1"
                    color="primary"
                    icon="pencil-alt"
                    iconAlign="left"
                    onClick={() => history.push(`/pages/edit/${node.id}`)}
                    size="sm"
                    outline
                  />,
                  // eslint-disable-next-line react/jsx-key
                  <ButtonIcon
                    color="danger"
                    icon="trash"
                    iconAlign="left"
                    onClick={() => clickDelete(node, path)}
                    size="sm"
                    outline
                  />
                ]
              })}
              onMoveNode={treeData => onMove(treeData)}
            />
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
    homeID: state.PageReducer.homeID
  };
};

const mapDispatchToProps = {
  getPage: PageActions.GetPages,
  deletePage: PageActions.DeletePages,
  expanstion: PageActions.expansionPageAction,
  updatePositionPages: PageActions.updatePositionPages,
  getHomeID: PageActions.getHomepageIDAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
