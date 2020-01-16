import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions, CategoryActions, PageActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';
import { map } from 'lodash';

const Proptype = {
  addMenuItem: Proptypes.func,
  getCategorys: Proptypes.func,
  getPages: Proptypes.func,
  getMenu: Proptypes.func,
  getMenuItems: Proptypes.func,
  dataCategory: Proptypes.array,
  dataPage: Proptypes.array,
  dataMenu: Proptypes.object,
  dataAllItem: Proptypes.array
};

function CreateMenusItem({
  addMenuItem,
  dataPage,
  dataCategory,
  getPages,
  getCategorys,
  dataMenu,
  getMenu,
  getMenuItems,
  dataAllItem
}) {
  const [active, setActive] = useState(0);
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  useEffect(() => {
    getPages();
    getCategorys();
    getMenuItems(dataMenu.id);
  }, [getPages, getCategorys, getMenu, getMenuItems, dataMenu.id]);
 
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

    setActive(event.target.name === 'type' ? parseInt(event.target.value) : active);
  };
  const onSubmit = event => {
    event.preventDefault();
    addMenuItem(dataMenu.id, formState.values);
    history.push('/menu/edit');
  };

  return (
    <React.Fragment>
      <Row style={{ background: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <Col lg={7} md={4}>
          <Form className="p-3" onSubmit={onSubmit}>
            <h4>{t('menu.createMenuItem')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="name" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('menu.Type')}</Label>
              <Input type="select" name="type" onChange={handleChange}>
                <option>{t('menu.Select')}</option>
                <option value={1}>{t('menu.page')}</option>
                <option value={2}>{t('menu.category')}</option>
                <option value={3}>{t('menu.CategoryNew')}</option>
                <option value={4}>{t('menu.url')}</option>
              </Input>
            </FormGroup>
            {active === 1 && (
              <FormGroup>
                <Label for="exampleSelect">{t('page.page')}</Label>
                <Input type="select" name="pagesId" onChange={handleChange}>
                  <option>{t('menu.Select')}</option>
                  {map(dataPage, value => (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
            {active === 2 && (
              <FormGroup>
                <Label for="exampleSelect">{t('category')}</Label>
                <Input type="select" name="categoryId" onChange={handleChange}>
                  <option>{t('menu.Select')}</option>
                  {map(dataCategory, value => (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
            {active === 3 && (
              <FormGroup>
                <Label for="exampleSelect">{t('categoryNew')}</Label>
                <Input type="select" name="categoryNewId" onChange={handleChange}>
                  <option>{t('menu.Select')}</option>
                  {map(dataCategory, value => (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
            {active === 4 && (
              <FormGroup>
                <Label for="exampleName">{t('url')}</Label>
                <Input type="text" name="url" onChange={handleChange} />
              </FormGroup>
            )}
            <FormGroup>
              <div className="check__box">
                <Label>{t('menu.FluidMenu')}</Label>
                <div>
                  <Input type="checkbox" name="fluid" onChange={handleChange} />
                  <span>{t('Thisisafullwidthmenu')}</span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('menu.Taget')}</Label>
              <Input type="select" name="targetId" id="exampleSelect" onChange={handleChange}>
                <option value={1}>{t('menu.Select')}</option>
                <option value={2}>{t('menu.SameTab')}</option>
                <option value={3}>{t('menu.NewTab')}</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('menu.parentMenu')}</Label>
              <Input type="select" name="parentId" onChange={handleChange}>
                <option>{t('menu.Select')}</option>
                {map(dataAllItem, value => (
                  <option value={value.id} key={value.id}>
                    {value.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <div className="check__box">
                <Label>{t('status')}</Label>
                <div>
                  <Input type="checkbox" name="active" onChange={handleChange} />
                  <span>{t('Enablethemenuitem')}</span>
                </div>
              </div>
            </FormGroup>
            <Button color="primary" type="submit">
              {t('save')}
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

CreateMenusItem.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    dataPage: state.PageReducer.data,
    dataCategory: state.CategoryReducer.listOption,
    dataMenu: state.MenuReducer.detail,
    dataAllItem: state.MenuReducer.dataAllItem
  };
};
const mapDispatchToProps = {
  addMenuItem: MenuActions.AddMenuItems,
  getCategorys: CategoryActions.getCategoryAction,
  getPages: PageActions.GetAllPages,
  getMenu: MenuActions.GetMenus,
  getMenuItems: MenuActions.GetMenuItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMenusItem);
