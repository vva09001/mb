import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions, CategoryActions, PageActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';
import { map } from 'lodash';
import { useForm } from 'react-hook-form';
import { Error } from 'helpers/notify';
import ModalMedia from '../../components/Media/ModalMedia';

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
  detailItem: Proptypes.object,
  imageSeletedata: Proptypes.object
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
  detailItem,
  imageSeletedata
}) {
  const [active, setActive] = useState(0);
  const [formState, setFormState] = useState({
    values: detailItem,
    touched: {}
  });
  const [status, setStatus] = useState({
    type: false,
    slugPages: false,
    categoryId: false,
    categoryNewId: false,
    url: false,
    target: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  useEffect(() => {
    getPages();
    getCategorys();
    getMenuItems(dataMenu.id);
  }, [getPages, getCategorys, getMenu, getMenuItems, dataMenu.id]);

  useEffect(() => {
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
    if (event.target.name === 'type')
      if (event.target.value !== '0')
        setStatus(status => ({
          ...status,
          type: false
        }));
      else {
        setStatus(status => ({
          ...status,
          type: true
        }));
      }
    if (event.target.name === 'target')
      if (event.target.value !== '0')
        setStatus(status => ({
          ...status,
          target: false
        }));
      else {
        setStatus(status => ({
          ...status,
          target: true
        }));
      }
    if (event.target.name === 'slugPages')
      if (event.target.value !== '0')
        setStatus(status => ({
          ...status,
          slugPages: false
        }));
      else {
        setStatus(status => ({
          ...status,
          slugPages: true
        }));
      }
    if (event.target.name === 'categoryId')
      if (event.target.value !== '0')
        setStatus(status => ({
          ...status,
          categoryId: false
        }));
      else {
        setStatus(status => ({
          ...status,
          categoryId: true
        }));
      }
    if (event.target.name === 'categoryNewId')
      if (event.target.value !== '0')
        setStatus(status => ({
          ...status,
          categoryNewId: false
        }));
      else {
        setStatus(status => ({
          ...status,
          categoryNewId: true
        }));
      }
    if (event.target.name === 'url')
      if (event.target.value !== '')
        setStatus(status => ({
          ...status,
          url: false
        }));
      else {
        setStatus(status => ({
          ...status,
          url: true
        }));
      }
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
  const handleError = async () => {
    var name = await triggerValidation('name');
    if (name === false) Error(t('errors.edit'));
    if (formState.values.type === undefined || formState.values.type === '0')
      setStatus(status => ({
        ...status,
        type: true
      }));
    else {
      setStatus(status => ({
        ...status,
        type: false
      }));
    }
    if (formState.values.target === undefined || formState.values.target === '0')
      setStatus(status => ({
        ...status,
        target: true
      }));
    else {
      setStatus(status => ({
        ...status,
        target: false
      }));
    }
    if (formState.values.type === '1') {
      if (formState.values.slugPages === '0')
        setStatus(status => ({
          ...status,
          slugPages: true
        }));
      else {
        setStatus(status => ({
          ...status,
          slugPages: false
        }));
      }
    } else if (formState.values.type === '2') {
      if (formState.values.categoryId === '0')
        setStatus(status => ({
          ...status,
          categoryId: true
        }));
      else {
        setStatus(status => ({
          ...status,
          categoryId: false
        }));
      }
    } else if (formState.values.type === '3') {
      if (formState.values.categoryNewId === '0')
        setStatus(status => ({
          ...status,
          categoryNewId: true
        }));
      else {
        setStatus(status => ({
          ...status,
          categoryNewId: false
        }));
      }
    } else if (formState.values.type === '4')
      if (formState.values.url === '')
        setStatus(status => ({
          ...status,
          url: true
        }));
      else {
        setStatus(status => ({
          ...status,
          url: false
        }));
      }
  };
  const onSubmit = () => {
    if (
      status.type === false &&
      status.target === false &&
      ((formState.values.type === '1' && status.slugPages === false) ||
        (formState.values.type === '2' && status.categoryId === false) ||
        (formState.values.type === '3' && status.categoryNewId === false) ||
        (formState.values.type === '4' && status.url === false))
    ) {
      console.log(formState.values);
      // editMenuItem(formState.values);
      // history.push('/menu/edit');
    } else Error(t('errors.edit'));
  };

  return (
    <React.Fragment>
      <Row style={{ background: '#fff', alignItems: 'center' }}>
        <Col lg={7} md={4}>
          <Form className="p-3" onSubmit={handleSubmit(onSubmit)}>
            <h4>{t('menu.editMenuItem')}</h4>
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
              <Label for="exampleSelect">{t('menu.Type')}</Label>
              <Input type="select" name="type" value={formState.values.type} onChange={handleChange}>
                <option>{t('menu.Select')}</option>
                <option value={1}>{t('menu.page')}</option>
                <option value={2}>{t('menu.category')}</option>
                <option value={3}>{t('menu.CategoryNew')}</option>
                <option value={4}>{t('menu.url')}</option>
              </Input>
              {status.type && <span style={{ color: 'red' }}>{t('errors.minone')}</span>}
            </FormGroup>
            {active === 1 && (
              <FormGroup>
                <Label for="exampleSelect">{t('page.page')}</Label>
                <Input type="select" name="slugPages" value={formState.values.pageId} onChange={handleChange}>
                  <option>{t('menu.Select')}</option>
                  {map(dataPage, value => (
                    <option value={value.slug} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </Input>
                {status.slugPages && <span style={{ color: 'red' }}>{t('errors.minone')}</span>}
              </FormGroup>
            )}
            {active === 2 && (
              <FormGroup>
                <Label for="exampleSelect">{t('category')}</Label>
                <Input type="select" name="categoryId" value={formState.values.categoryId} onChange={handleChange}>
                  <option>{t('menu.Select')}</option>
                  {map(dataCategory, value => (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </Input>
                {status.categoryId && <span style={{ color: 'red' }}>{t('errors.minone')}</span>}
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
                  <option>{t('menu.Select')}</option>
                  {map(dataCategory, value => (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </Input>
                {status.categoryNewId && <span style={{ color: 'red' }}>{t('errors.minone')}</span>}
              </FormGroup>
            )}
            {active === 4 && (
              <FormGroup>
                <Label for="exampleName">{t('url')}</Label>
                <input
                  type="text"
                  name="url"
                  value={formState.values.url === undefined ? '' : formState.values.url}
                  onChange={handleChange}
                  className={status.url === false ? 'inputStyle' : 'inputStyleError'}
                />
                {status.url && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
              </FormGroup>
            )}
            <FormGroup>
              <div className="check__box">
                <Label>{t('menu.FluidMenu')}</Label>
                <div>
                  <Input
                    type="checkbox"
                    name="fluid"
                    checked={formState.values.fluid === 0 || formState.values.fluid === undefined ? false : true}
                    value={formState.values.fluid === 0 ? false : formState.values.fluid}
                    onChange={handleChange}
                  />
                  <span>{t('menu.Thisisafullwidthmenu')}</span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('menu.Target')}</Label>
              <Input type="select" name="target" value={formState.values.target} onChange={handleChange}>
                <option value={0}>{t('menu.Select')}</option>
                <option value={1}>{t('menu.SameTab')}b</option>
                <option value={2}>{t('menu.NewTab')}</option>
              </Input>
              {status.target && <span style={{ color: 'red' }}>{t('errors.minone')}</span>}
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">{t('menu.parentMenu')}</Label>
              <Input type="select" name="parentId" value={formState.values.parentId} onChange={handleChange}>
                <option value={null}>{t('menu.Select')}</option>
                {map(dataAllItem, value => {
                  if (value.id !== detailItem.id) {
                    return (
                      <option value={value.id} key={value.id}>
                        {value.name}
                      </option>
                    );
                  }
                })}
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
            <Button color="primary" type="submit" onClick={handleError}>
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
    detailItem: state.MenuReducer.detailItem,
    imageSeletedata: state.MediaReducer.detail
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
