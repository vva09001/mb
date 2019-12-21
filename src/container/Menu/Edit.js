import React, { useState } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { getMenuItems } from '../../services/menu';

const Proptype = {
  editMenu: Proptypes.func,
  detail: Proptypes.object,
  data: Proptypes.object,
  deleteMenuItem: Proptypes.func,
  expanstion: Proptypes.func,
  updatePositionMenuItem: Proptypes.func
};

function EditMenus({ editMenu, data, detail, deleteMenuItem, expanstion, updatePositionMenuItem }) {
  const [formState, setFormState] = useState({
    values: detail,
    touched: {}
  });
  // const [isOpen, setIsOpen] = useState(false);
  const [treeActive, setTreeActive] = useState({
    show: false,
    hiden: false
  });

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
    editMenu(formState.values);
    history.push('/menu/edit');
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

  const click = (node, path) => {
    setFormState(formState => ({
      ...formState,
      values: node
    }));
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
      updatePositionMenuItem(idPage, idParent, positions);
    } else {
      getMenuItems();
    }
  };

  /*const onDelete = () => {
    deleteMenuItem(formState.values.id);
    setIsOpen(!isOpen);
  };*/
  return (
    <React.Fragment>
      <h4> {t('Menu')}</h4>
      <Row className="category__wapper">
        <Col lg={7} md={4}>
          <div>
            <Button
              color="primary"
              onClick={() => {
                history.push('/menu/edit/item');
              }}
            >
              {t('create')}
            </Button>
          </div>
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
          <div>
            <Alert color="primary">Dang cho API</Alert>
          </div>
        </Col>
        <Col lg={5} md={4}>
          <div>
            <Form className="cetegoryFrom" onSubmit={onSubmit}>
              <h4>Tạo Menu</h4>
              <FormGroup>
                <Label for="exampleName">{t('name')}</Label>
                <Input type="text" name="name" value={formState.values.name} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <div className="check__box">
                  <Label>{t('status')}</Label>
                  <div>
                    <Input type="checkbox" name="_Active" onChange={handleChange} />
                    <span>{t('active')}</span>
                  </div>
                </div>
              </FormGroup>
              <Button color="primary" type="submit">
                {t('save')}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

EditMenus.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    detail: state.MenuReducer.detail,
    data: state.MenuReducer.data
  };
};

const mapDispatchToProps = {
  editMenu: MenuActions.EditMenus,
  deleteMenuItem: MenuActions.DeleteMenuItems,
  expanstion: MenuActions.expansionMenuItemAction,
  updatePositionMenuItem: MenuActions.updatePositionMenuItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMenus);
