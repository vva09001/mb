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
  setpermission: PropTypes.func,
  listPrivilege: PropTypes.array,
  getListPrivilege: PropTypes.func
};

function RolesEdit({ editRole, detail, setpermission, listPrivilege, getListPrivilege }) {
  const [formState, setFormState] = useState({
    values: detail,
    touched: {}
  });

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
    setpermission(formState.values.idRole, dataallow, datadeny);
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
                    <h4>{t('New')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline>
                              <h5>{t('adminNew')}</h5>
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
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('getNew')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="getNew1"
                              value={13}
                              /* checked={map(listPrivilege, value =>
                                !value.privilegeId === 13 || value.privilegeId === undefined ? false : true
                              )}*/
                              name="ROLE_XEM TIN TỨC"
                              label="Allow"
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="getNew2"
                              value={13}
                              name="ROLE_XEM TIN TỨC"
                              label="Deny"
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('createNew')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="createNew1"
                              name="ROLE_TẠO TIN TỨC"
                              label="Allow"
                              value={11}
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="createNew2"
                              name="ROLE_TẠO TIN TỨC"
                              label="Deny"
                              value={11}
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('editNew')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="editNew1"
                              name="ROLE_CHỈNH SỬA TIN TỨC"
                              value={15}
                              label="Allow"
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="editNew2"
                              name="ROLE_CHỈNH SỬA TIN TỨC"
                              value={15}
                              label="Deny "
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('deleteNew')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="deleteNew1"
                              value={17}
                              name="ROLE_XÓA TIN TỨC"
                              label="Allow"
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="deleteNew2"
                              value={17}
                              name="ROLE_XÓA TIN TỨC"
                              label="Deny"
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <h4>{t('category')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline>
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
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('getcategory')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="getcategory1"
                              value={3}
                              name="ROLE_XEM THƯ MỤC"
                              label="Allow"
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="getcategory2"
                              value={3}
                              name="ROLE_XEM THƯ MỤC"
                              label="Deny"
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('createcategory')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="createcategory1"
                              name="ROLE_TẠO THƯ MỤC"
                              value={1}
                              label="Allow"
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="createcategory2"
                              name="ROLE_TẠO THƯ MỤC"
                              value={1}
                              label="Deny"
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('editcategory')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="editcategory1"
                              name="ROLE_CHỈNH SỬA THƯ MỤC"
                              label="Allow"
                              value={5}
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="editcategory2"
                              name="ROLE_CHỈNH SỬA THƯ MỤC"
                              value={5}
                              label="Deny "
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('deletecategory')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="deletecategory11"
                              name="ROLE_XÓA THƯ MỤC"
                              value={9}
                              label="Allow"
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="deletecategory22"
                              name="ROLE_XÓA THƯ MỤC"
                              value={9}
                              label="Deny"
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('positioncategory')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput
                              type="radio"
                              id="positioncategory1"
                              name="ROLE_CHỈNH SỬA VỊ TRÍ THƯ MỤC"
                              label="Allow"
                              value={7}
                              inline
                              onChange={allow}
                            />
                            <CustomInput
                              type="radio"
                              id="positioncategory2"
                              name="ROLE_CHỈNH SỬA VỊ TRÍ THƯ MỤC"
                              label="Deny"
                              value={7}
                              inline
                              onChange={deny}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
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
  setpermission: RoleActions.setPermission,
  getListPrivilege: RoleActions.getPrivilegeRole
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesEdit);
