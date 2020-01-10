import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, ButtonGroup } from 'reactstrap';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import { RoleActions } from '../../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
//import { map } from 'lodash';

const PropsType = {
  editRole: PropTypes.func,
  detail: PropTypes.object,
  getpermission: PropTypes.func,
  listPrivilege: PropTypes.array,
  getListPrivilege: PropTypes.func
};

function RolesEdit({ editRole, detail, getpermission, listPrivilege, getListPrivilege }) {
  const [formState, setFormState] = useState({
    values: detail,
    touched: {}
  });

  // const [activeTab, setActiveTab] = useState('1');

  // const []

  useEffect(() => {
    getListPrivilege(formState.values.idRole);
  }, [formState.values.idRole, getListPrivilege]);

  useEffect(() => {
    console.log(listPrivilege);
  });

  const [dataallow, setallowdata] = useState([]);
  const [datadeny, setdatadeny] = useState([]);
  const [activeTab, setActiveTab] = useState('1');

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
        id: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const allow = event => {
    event.persist();
    setallowdata([...dataallow, parseInt(event.target.value)]);
  };

  const deny = event => {
    event.persist();
    setdatadeny([...datadeny, parseInt(event.target.value)]);
  };
  const onSubmitRoles = event => {
    event.preventDefault();
    editRole(formState.values);
  };
  const onSubmitPermission = event => {
    event.preventDefault();
    getpermission(formState.values.idRole, dataallow, datadeny);
  };
  return (
    <React.Fragment>
      <Row style={{ background: '#fff', padding: '15px 0' }}>
        <Col lg={12} md={8}>
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
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggle('2');
                }}
              >
                {t('user.permissions')}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmitRoles}>
                <h4>{t('account')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('user.fistname')}</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formState.values.name === undefined ? '' : formState.values.name}
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col lg={9} md={8}>
                  <Form
                    className="p-3"
                    style={{ background: '#fff', justifyContent: 'center' }}
                    onSubmit={onSubmitPermission}
                  >
                    <h4>{t('category')}</h4>
                    <FormGroup>
                      <div>
                        <Label for="exampleCheckbox" inline="true">
                          <h5>{t('admincategory')}</h5>
                        </Label>
                      </div>

                      <div>
                        <ButtonGroup size="sm">
                          <Button>{t('Allow All')}</Button>
                          <Button>{t('Deny All')}</Button>
                        </ButtonGroup>
                      </div>
                    </FormGroup>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('admincategory')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'CATEGORY')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('page')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminpage')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'PAGE')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('Slider')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminSlider')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'SLIDER')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('Menu')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminMenu')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'MENU')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('MenuItem')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminMenuItem')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'MENUITEM')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('MainTemplate')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminMainTemplate')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'MAILTEMPLATE')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('News')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminNews')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'NEWS')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('Networks')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminNetworks')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'NETWORKS')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('InterestRate')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminInterestRate')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'INTEREST_RATE')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <h4>{t('ExchangeRate')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline="true">
                              <h5>{t('adminExchangeRate')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    {listPrivilege.map((values, index) => {
                      if (values.groupRole === 'EXCHANGE_RATE')
                        return (
                          <FormGroup>
                            <Row>
                              <Col xs="6">
                                <Label for="exampleCheckbox">{t(values.name)}</Label>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <CustomInput
                                    type="radio"
                                    id={values.id}
                                    value={values.privilegeId}
                                    name={values.name}
                                    label="Allow"
                                    inline="true"
                                    onChange={allow}
                                    // checked={}
                                  />
                                  <CustomInput
                                    type="radio"
                                    id={values.id + 1}
                                    value={values.privilegeId + 1}
                                    name={values.name}
                                    label="Deny"
                                    inline="true"
                                    onChange={deny}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        );
                    })}
                    <Button color="primary" type="submit">
                      {t('save')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
}

RolesEdit.propTypes = PropsType;

const mapStateToProps = state => {
  return { detail: state.RoleReducer.detail, listPrivilege: state.RoleReducer.listPrivilege };
};
const mapDispatchToProps = {
  editRole: RoleActions.EditRoles,
  getpermission: RoleActions.setPermission,
  getListPrivilege: RoleActions.getPrivilegeRole,
  getListRole: RoleActions.getListRole
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesEdit);
