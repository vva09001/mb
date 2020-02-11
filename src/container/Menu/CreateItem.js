import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions, CategoryActions, PageActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';
import { Error } from 'helpers/notify';
import { map } from 'lodash';
import { useForm } from 'react-hook-form';
import ModalMedia from '../../components/Media/ModalMedia';

const Proptype = {
  addMenuItem: Proptypes.func,
  getCategorys: Proptypes.func,
  getPages: Proptypes.func,
  getMenu: Proptypes.func,
  getMenuItems: Proptypes.func,
  dataCategory: Proptypes.array,
  dataPage: Proptypes.array,
  dataMenu: Proptypes.object,
  dataAllItem: Proptypes.array,
  imageSeletedata: Proptypes.object
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
  dataAllItem,
  imageSeletedata
}) {
  const [active, setActive] = useState(0);
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const [status, setStatus] = useState({
    tagId: false,
    html: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
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

  const onSetState = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        icon: imageSeletedata.url
      }
    }));
  };

  const onSubmit = () => {
    addMenuItem(dataMenu.id, formState.values);
    history.push('/menu/edit');
  };

  return (
    <React.Fragment>
      <Row style={{ background: '#fff', alignItems: 'center' }}>
        <Col lg={7} md={4}>
          <Form className="p-3" onSubmit={onSubmit}>
            <h4>{t('menu.createMenuItem')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.name === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.name && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
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
                <Input type="select" name="slugPages" onChange={handleChange}>
                  <option>{t('menu.Select')}</option>
                  {map(dataPage, value => (
                    <option value={value.slug} key={value.id}>
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
                  <span>{t('menu.Thisisafullwidthmenu')}</span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('menu.Target')}</Label>
              <Input type="select" name="targetId" id="exampleSelect" onChange={handleChange}>
                <option value={1}>{t('menu.Select')}</option>
                <option value={2}>{t('menu.SameTab')}</option>
                <option value={3}>{t('menu.NewTab')}</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('menu.parentMenu')}</Label>
              <Input type="select" name="parentId" onChange={handleChange}>
                <option value={null}>{t('menu.Select')}</option>
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
                  <span>{t('menu.Enablethemenuitem')}</span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">{t('baseImages')}</Label>
              <div style={{ maxHeight: '100px', maxWidth: '100px' }} className="mb-2">
                <img
                  src={formState.values.icon === undefined ? '' : formState.values.icon}
                  style={{ maxWidth: '100px' }}
                  alt="logo"
                />
              </div>
              <ModalMedia setState={onSetState} />
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
    dataAllItem: state.MenuReducer.dataAllItem,
    imageSeletedata: state.MediaReducer.detail
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
