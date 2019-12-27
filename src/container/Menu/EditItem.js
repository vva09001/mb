import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions, CategoryActions, PageActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';
import { map } from 'lodash';

const Proptype = {
  editMenuItem: Proptypes.func,
  getCategorys: Proptypes.func,
  getPages: Proptypes.func,
  getMenu: Proptypes.func,
  getMenuItems: Proptypes.func,
  dataCategory: Proptypes.array,
  dataPage: Proptypes.array,
  dataMenu: Proptypes.object,
  dataAllItem: Proptypes.array,
  detailItem: Proptypes.object
};

function EditMenusItem({
  editMenuItem,
  dataPage,
  dataCategory,
  getPages,
  getCategorys,
  dataMenu,
  getMenu,
  getMenuItems,
  dataAllItem,
  detailItem
}) {
  const [active, setActive] = useState(0);
  const [formState, setFormState] = useState({
    values: detailItem,
    touched: {}
  });
  useEffect(() => {
    getPages();
    getCategorys();
    getMenuItems(dataMenu.id);
  }, [getPages, getCategorys, getMenu, getMenuItems, dataMenu.id]);

  useEffect(() => {
    console.log(formState.values);
    setActive(parseInt(formState.values.type));
  }, [formState.values]);
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
    editMenuItem(formState.values);
    history.push('/menu/edit');
  };

  return (
    <React.Fragment>
      <Row style={{ background: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <Col lg={7} md={4}>
          <Form className="p-3" onSubmit={onSubmit}>
            <h4>{t('createMenuItem')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="name" value={formState.values.name} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Loại</Label>
              <Input type="select" name="type" value={formState.values.type} onChange={handleChange}>
                <option>Chọn...</option>
                <option value={1}>Page</option>
                <option value={2}>Category</option>
                <option value={3}>Catogory News</option>
                <option value={4}>URL</option>
              </Input>
            </FormGroup>
            {active === 1 && (
              <FormGroup>
                <Label for="exampleSelect">{t('page.page')}</Label>
                <Input type="select" name="pagesId" value={formState.values.pageId} onChange={handleChange}>
                  <option>Chọn...</option>
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
                <Input type="select" name="categoryId" value={formState.values.categoryId} onChange={handleChange}>
                  <option>Chọn...</option>
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
                <Input
                  type="select"
                  name="categoryNewId"
                  value={formState.values.categoryNewId}
                  onChange={handleChange}
                >
                  <option>Chọn...</option>
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
                <Input
                  type="text"
                  name="url"
                  value={formState.values.url === undefined ? '' : formState.values.url}
                  onChange={handleChange}
                />
              </FormGroup>
            )}
            <FormGroup>
              <div className="check__box">
                <Label>{t('FluidMenu')}</Label>
                <div>
                  <Input
                    type="checkbox"
                    name="fluid"
                    checked={formState.values.fluid === 0 || formState.values.fluid === undefined ? false : true}
                    value={formState.values.fluid === 0 ? false : formState.values.fluid}
                    onChange={handleChange}
                  />
                  <span>{t('Thisisafullwidthmenu')}</span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Target</Label>
              <Input type="select" name="targetId" value={formState.values.targetId} onChange={handleChange}>
                <option value={3}>Chọn...</option>
                <option value={1}>Same Tab</option>
                <option value={2}>New Tab</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('parentMenu')}</Label>
              <Input type="select" name="parentId" value={formState.values.parentId} onChange={handleChange}>
                <option>Chọn...</option>
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
                  <Input
                    type="checkbox"
                    name="active"
                    checked={formState.values.active === 0 || formState.values.active === undefined ? false : true}
                    value={formState.values.active === 0 ? false : formState.values.active}
                    onChange={handleChange}
                  />
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

EditMenusItem.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    dataPage: state.PageReducer.data,
    dataCategory: state.CategoryReducer.listOption,
    dataMenu: state.MenuReducer.detail,
    dataAllItem: state.MenuReducer.dataAllItem,
    detailItem: state.MenuReducer.detailItem
  };
};
const mapDispatchToProps = {
  editMenuItem: MenuActions.EditMenuItems,
  getCategorys: CategoryActions.getCategoryAction,
  getPages: PageActions.GetAllPages,
  getMenu: MenuActions.GetMenus,
  getMenuItems: MenuActions.GetMenuItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMenusItem);
