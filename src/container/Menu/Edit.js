import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import PopupComfirm from '../../components/common/PopupComfirm';
import ButtonIcon from '../../components/common/ButtonIcon';
import { useForm } from 'react-hook-form';

const Proptype = {
  editMenu: Proptypes.func,
  detail: Proptypes.object,
  data: Proptypes.array,
  deleteMenuItem: Proptypes.func,
  expanstion: Proptypes.func,
  updatePositionMenuItem: Proptypes.func,
  getMenuItems: Proptypes.func,
  detailItem: Proptypes.object,
  dataItem: Proptypes.array,
  getDetailMenuItem: Proptypes.func
};

function EditMenus({
  editMenu,
  data,
  detail,
  deleteMenuItem,
  expanstion,
  updatePositionMenuItem,
  getMenuItems,
  detailItem,
  dataItem,
  getDetailMenuItem
}) {
  const [formState, setFormState] = useState({
    values: detail,
    touched: {}
  });

  useEffect(() => {
    getMenuItems(formState.values.id);
  }, [formState.values.id, getMenuItems]);

  const [isOpen, setIsOpen] = useState(false);
  const [treeActive, setTreeActive] = useState({
    show: false,
    hiden: false
  });
  const [status, setStatus] = useState({
    position: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();

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
  const onSubmit = () => {
    if (status.position === false) editMenu(formState.values);
    else Error(t('errors.edit'));
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
    const newData = toggleExpandedForAll({ treeData: dataItem, expanded });
    expanstion(newData);
  };
  const click = (node, path) => {
    getDetailMenuItem(node);
    history.push('/menu/edit/item/edit');
  };
  const clickDelete = (node, path) => {
    getDetailMenuItem(node);
    setIsOpen(!isOpen);
  };
  const onMove = treeData => {
    if (treeData.nextParentNode !== null) {
      let idParent = treeData.nextParentNode.id;
      let idPage = treeData.node.id;
      let positions = 1;
      let childrenData = treeData.nextParentNode.children;
      for (let i = 0; i < childrenData.length; i++) {
        if (childrenData[i].id === idPage) {
          positions = i + 1;
          break;
        }
      }
      updatePositionMenuItem(idPage, idParent, positions);
    } else {
      updatePositionMenuItem(treeData.node.id, -1, treeData.nextTreeIndex + 1);
    }
  };
  const handleError = async () => {
    var name = await triggerValidation('name');
    if (name === false) {
      Error(t('errors.edit'));
    }
    if (formState.values.position === '')
      setStatus(status => ({
        ...status,
        position: true
      }));
    else {
      setStatus(status => ({
        ...status,
        position: false
      }));
    }
  };
  const onDelete = () => {
    deleteMenuItem(detailItem);
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <h4> {t('Menu')}</h4>
      <Row className="category__wapper" style={{ height: '650px' }}>
        <Col lg={7} sm={10}>
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
              treeData={dataItem}
              onChange={treeData => changeTree(treeData)}
              onMoveNode={treeData => onMove(treeData)}
              getNodeKey={({ node }) => node.id}
              generateNodeProps={({ node, path }) => ({
                buttons: [
                  // eslint-disable-next-line react/jsx-key
                  <ButtonIcon
                    className="mr-1"
                    color="primary"
                    icon="pencil-alt"
                    iconAlign="left"
                    onClick={() => click(node, path)}
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
            />
          </div>
        </Col>
        <Col lg={5} md={8}>
          <div>
            <Form className="cetegoryFrom" onSubmit={handleSubmit(onSubmit)}>
              <h4>{t('menu.EditMenu')}</h4>
              <FormGroup>
                <Label for="exampleName">{t('name')}</Label>
                <input
                  type="text"
                  name="name"
                  value={formState.values.name}
                  onChange={handleChange}
                  ref={register({
                    required: true
                  })}
                  className={errors.name === undefined ? 'inputStyle' : 'inputStyleError'}
                />
                {errors.name && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
              </FormGroup>
              <FormGroup>
                <Label for="exampleName">{t('title')}</Label>
                <input
                  type="text"
                  name="title"
                  value={formState.values.title}
                  onChange={handleChange}
                  ref={register({
                    required: true
                  })}
                  className={errors.name === undefined ? 'inputStyle' : 'inputStyleError'}
                />
                {errors.name && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">{t('menu.Postion')}</Label>
                <Input
                  type="select"
                  name="position"
                  value={formState.values.position === null ? '' : formState.values.position}
                  onChange={handleChange}
                >
                  <option value={''}>{t('menu.Select')}</option>
                  <option value={'bottom'}>{t('menu.Bottom')}</option>
                  <option value={'top'}>{t('menu.Top')}</option>
                  <option value={'side'}>{t('menu.Side')}</option>
                  <option value={'middle'}>{t('menu.Middle')}</option>
                </Input>
                {formState.values.position === '' && status.position && (
                  <span style={{ color: 'red' }}>{t('errors.required')}</span>
                )}
              </FormGroup>
              <FormGroup>
                <div className="check__box">
                  <Label>{t('status')}</Label>
                  <div>
                    <Input
                      type="checkbox"
                      name="status"
                      checked={formState.values.status === 1 ? true : false}
                      onChange={handleChange}
                    />
                    <span>{t('active')}</span>
                  </div>
                </div>
              </FormGroup>
              <Button color="primary" type="submit" onClick={handleError}>
                {t('save')}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

EditMenus.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    detail: state.MenuReducer.detail,
    data: state.MenuReducer.data,
    detailItem: state.MenuReducer.detailItem,
    dataItem: state.MenuReducer.dataItem
  };
};

const mapDispatchToProps = {
  editMenu: MenuActions.EditMenus,
  deleteMenuItem: MenuActions.DeleteMenuItems,
  expanstion: MenuActions.expansionMenuItemAction,
  updatePositionMenuItem: MenuActions.updatePositionMenuItems,
  getMenuItems: MenuActions.GetMenuItems,
  getDetailMenuItem: MenuActions.getDetailMenuItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMenus);
