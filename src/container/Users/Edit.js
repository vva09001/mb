import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, ButtonGroup } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { UserActions, RoleActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Error } from 'helpers/notify';

const PropsType = {
  editUser: PropTypes.func,
  detail: PropTypes.object,
  detailById: PropTypes.object,
  getUserById: PropTypes.func,
  getAllRole: PropTypes.func,
  dataAllRole: PropTypes.array,
  listPrivilegeByGroup: PropTypes.array,
  getListPrivilegesByGroup: PropTypes.func
};
let dataRolesToEdit = [];
let dataPrivileges = [];
let dataIdrole = [];
let dataIdPrivileges = [];
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
function UsersEdit({
  editUser,
  detail,
  detailById,
  getUserById,
  listPrivilegeByGroup,
  dataAllRole,
  getAllRole,
  getListPrivilegesByGroup
}) {
  const { id } = useParams();
  const [formState, setFormState] = useState({
    values: detail,

    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');
  let optionRoles = [];
  let dataIdSelect = [];
  let dataIdPrivilegesExact = [];
  const [status, setStatus] = useState({
    roles: false,
    password: false,
    passwordConfirm: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const [SelectedOption, setSelectedOption] = useState({
    Select: []
  });

  const { t } = useTranslation();
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    getUserById(id);
  }, [getUserById, id]);
  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detailById
    }));
  }, [detailById]);
  useEffect(() => {
    getAllRole();
    getListPrivilegesByGroup();
  }, [getAllRole, getListPrivilegesByGroup]);
  useEffect(() => {
    dataIdrole = detailById.roles;
    dataIdPrivileges = detailById.userPrivilegeRequests;
    if (dataIdPrivileges !== undefined)
      dataIdPrivileges.forEach(function(data) {
        if (data.status !== 2) dataIdPrivilegesExact.push(data);
      });
  }, [detailById, dataIdPrivilegesExact]);

  useEffect(() => {
    dataAllRole.forEach(function(data) {
      var tmpSetDataOption = {
        value: data.idRole,
        label: data.name
      };
      optionRoles.push(tmpSetDataOption);
    });
    if (dataIdrole !== undefined)
      dataIdrole.forEach(function(data) {
        defaultSelected(data);
      });
  });

  const defaultSelected = idRole => {
    optionRoles.forEach(function(docs) {
      if (docs.value === idRole) {
        dataIdSelect.push(docs);
      }
    });
  };
  useEffect(() => {
    if (dataIdSelect !== null) SelectedOption.Select = dataIdSelect;
  });
  useEffect(() => {
    dataPrivileges = listPrivilegeByGroup;
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        var check = {
          checked: 2,
          status: 2
        };
        docs = Object.assign(docs, check);
      });
    });
  });
  useEffect(() => {
    if (dataIdPrivilegesExact !== null)
      dataPrivileges.forEach(function(data) {
        data.privileges.forEach(function(docs) {
          dataIdPrivilegesExact.forEach(function(dataCurrent) {
            if (Number(docs.privilegeId) === Number(dataCurrent.privilegeId)) {
              if (dataCurrent.status === 0) {
                docs.status = 0;
                docs.checked = 0;
              } else if (dataCurrent.status === 1) {
                docs.status = 1;
                docs.checked = 1;
              }
            }
          });
        });
      });
  });
  const allowBlock = value => {
    var radios = document.forms[value.groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (String(radios[i].type) === 'radio') {
        if (Number(radios[i].value) === 1) {
          radios[i].checked = true;
          dataPrivileges.forEach(function(data) {
            data.privileges.forEach(function(docs) {
              if (docs.groupRole === value.groupRole) {
                docs.checked = 1;
                docs.status = 1;
              }
            });
          });
        }
      }
    }
  };
  const denyBlock = value => {
    var radios = document.forms[value.groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (String(radios[i].type) === 'radio') {
        if (Number(radios[i].value) === 0) {
          radios[i].checked = true;
        }
      }
    }
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.groupRole === value.groupRole) {
          docs.checked = 0;
          docs.status = 0;
        }
      });
    });
  };
  const inheritBlock = value => {
    var radios = document.forms[value.groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (String(radios[i].type) === 'radio') {
        if (Number(radios[i].value) === 2) {
          radios[i].checked = true;
        }
      }
    }
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.groupRole === value.groupRole) {
          docs.checked = 2;
          docs.status = 2;
        }
      });
    });
  };
  const allowAll = () => {
    dataPrivileges.forEach(function(data) {
      allowBlock(data);
    });
  };
  const denyAll = () => {
    dataPrivileges.forEach(function(data) {
      denyBlock(data);
    });
  };
  const inheritAll = () => {
    dataPrivileges.forEach(function(data) {
      inheritBlock(data);
    });
  };

  const handleChange = async event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    if (event.target.name === 'password')
      if (passwordRegex.test(event.target.value) === false)
        setStatus(status => ({
          ...status,
          password: true
        }));
      else {
        setStatus(status => ({
          ...status,
          password: false
        }));
      }

    if (event.target.name === 'passwordConfirm')
      if (event.target.value !== formState.values.password)
        setStatus(status => ({
          ...status,
          passwordConfirm: true
        }));
      else {
        setStatus(status => ({
          ...status,
          passwordConfirm: false
        }));
      }
  };

  const handleChangeRoles = event => {
    setSelectedOption(SelectedOption => ({
      ...SelectedOption,
      Select: event
    }));
    if (event !== null)
      setStatus(status => ({
        ...status,
        roles: false
      }));
    else {
      setStatus(status => ({
        ...status,
        roles: true
      }));
    }
    dataRolesToEdit = event;
  };
  const handleGenaral = async () => {
    var firstName = await triggerValidation('firstName');
    var lastName = await triggerValidation('lastName');
    var username = await triggerValidation('username');
    if (firstName === false || lastName === false || username === false) {
      Error(t('errors.edit'));
    }

    if (SelectedOption.Select === null || SelectedOption.Select.length === 0)
      setStatus(status => ({
        ...status,
        roles: true
      }));
    else {
      setStatus(status => ({
        ...status,
        roles: false
      }));
    }
  };

  const handlePrivilegeIdExact = async () => {
    formState.values.userPrivilegeRequests = [];
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.status === 1) {
          var tmpPrivilegeId = {
            privilegeId: docs.privilegeId,
            status: docs.status
          };
          formState.values.userPrivilegeRequests.push(tmpPrivilegeId);
        } else if (docs.status === 0) {
          var tmp = {
            privilegeId: docs.privilegeId,
            status: docs.status
          };
          formState.values.userPrivilegeRequests.push(tmp);
        }
      });
    });
  };
  const handleErrorPassword = async () => {
    handleGenaral();
    handlePrivilegeIdExact();
    if (passwordRegex.test(formState.values.password) === false)
      setStatus(status => ({
        ...status,
        password: true
      }));
    else {
      setStatus(status => ({
        ...status,
        password: false
      }));
    }

    if (formState.values.passwordConfirm !== formState.values.password)
      setStatus(status => ({
        ...status,
        passwordConfirm: true
      }));
    else {
      setStatus(status => ({
        ...status,
        passwordConfirm: false
      }));
    }
  };
  const handleError = async () => {
    handleGenaral();
    handlePrivilegeIdExact();
  };

  const onSubmitUsers = () => {
    formState.values.roles.splice(0, formState.values.roles.length);
    if (dataRolesToEdit === null) formState.values.roles = [];
    else if (dataRolesToEdit.length === 0) {
      SelectedOption.Select.forEach(function(docs) {
        formState.values.roles.push(docs.value);
      });
    } else {
      dataRolesToEdit.forEach(function(data) {
        formState.values.roles.push(data.value);
      });
    }
    if (formState.values.password === undefined || formState.values.passwordConfirm === undefined) {
      formState.values.password = '';
      formState.values.passwordConfirm = '';
    }
    if (status.roles === false && status.password === false && status.passwordConfirm === false) {
      editUser(formState.values);
    } else Error(t('errors.edit'));
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
                {t('user.account')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggle('2');
                }}
              >
                {t('user.permission')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  toggle('3');
                }}
              >
                {t('user.newpassword')}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(onSubmitUsers)}>
                <h4>{t('user.account')}</h4>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('user.firstname')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="text"
                        name="firstName"
                        value={formState.values.firstName}
                        onChange={handleChange}
                        ref={register({
                          required: true
                        })}
                        className={errors.firstName === undefined ? 'inputStyle' : 'inputStyleError'}
                      />
                      {errors.firstName && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('user.lastname')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="text"
                        name="lastName"
                        value={formState.values.lastName}
                        onChange={handleChange}
                        ref={register({
                          required: true
                        })}
                        className={errors.lastName === undefined ? 'inputStyle' : 'inputStyleError'}
                      />
                      {errors.lastName && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('user.username')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="text"
                        name="username"
                        value={formState.values.username}
                        onChange={handleChange}
                        ref={register({
                          required: true
                        })}
                        className={errors.username === undefined ? 'inputStyle' : 'inputStyleError'}
                      />
                      {errors.username && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('user.department')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <Input
                        type="text"
                        name="department"
                        value={formState.values.department}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('email.email')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <Input type="text" name="email" value={formState.values.email} onChange={handleChange} />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('user.role')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <FormGroup>
                        {optionRoles.length >= 0 && (
                          <Select
                            isMulti
                            name="roles"
                            value={SelectedOption.Select}
                            onChange={handleChangeRoles}
                            options={optionRoles}
                          />
                        )}
                        {status.roles && <span style={{ color: 'red' }}>{t('errors.minone')}</span>}
                      </FormGroup>
                    </Col>
                  </Row>
                </FormGroup>

                <Col sm="12" md={{ size: 6, offset: 2 }} style={{ paddingLeft: 6 }}>
                  <Button color="primary" type="submit" onClick={handleError}>
                    {t('save')}
                  </Button>
                </Col>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col lg={9} md={8}>
                  <Form
                    className="p-3"
                    style={{ background: '#fff', justifyContent: 'center' }}
                    onSubmit={handleSubmit(onSubmitUsers)}
                  >
                    <FormGroup style={{ borderBottom: '1px solid #ccc' }}>
                      <h4>{t('Permissions')}</h4>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col />
                        <Col xs="12" lg="6">
                          <ButtonGroup size="sm">
                            <Button onClick={() => allowAll()}>{t('Allow All')}</Button>
                            <Button onClick={() => denyAll()}>{t('Deny All')}</Button>
                            <Button onClick={() => inheritAll()}>{t('Inherit All')}</Button>
                          </ButtonGroup>
                        </Col>
                      </Row>
                    </FormGroup>
                    {dataPrivileges.map((values, index) => {
                      return (
                        <Form key={index} name={values.groupRole} style={{ paddingBottom: 40 }}>
                          <FormGroup>
                            <Col sm={11} style={{ borderBottom: '1px solid #ccc', paddingLeft: 0 }}>
                              <Label>
                                <h5>{values.groupRole}</h5>
                              </Label>
                            </Col>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xs="12" lg="6">
                                <div>
                                  <Label for="exampleCheckbox" inline="true">
                                    <h5>{t('ADMIN.' + values.groupRole)}</h5>
                                  </Label>
                                </div>
                              </Col>
                              <Col xs="12" lg="6">
                                <div>
                                  <ButtonGroup size="sm">
                                    <Button onClick={() => allowBlock(values)}>{t('Allow All')}</Button>
                                    <Button onClick={() => denyBlock(values)}>{t('Deny All')}</Button>
                                    <Button onClick={() => inheritBlock(values)}>{t('Inherit All')}</Button>
                                  </ButtonGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                          {values.privileges.map((value, index) => {
                            return (
                              <FormGroup key={index}>
                                <Row style={{ paddingLeft: 16 }}>
                                  <Col xs="6">
                                    <Label for="exampleCheckbox">{t(value.name)}</Label>
                                  </Col>
                                  <Col xs="6">
                                    <div>
                                      {value.status === 1 ? (
                                        <CustomInput
                                          type="radio"
                                          id={value.privilegeId}
                                          value={1}
                                          name={value.name}
                                          label="Allow"
                                          inline="true"
                                          defaultChecked
                                          onChange={() => {
                                            value.checked = 1;
                                            value.status = 1;
                                          }}
                                        />
                                      ) : (
                                        <CustomInput
                                          type="radio"
                                          id={value.privilegeId}
                                          value={1}
                                          name={value.name}
                                          label="Allow"
                                          inline="true"
                                          onChange={() => {
                                            value.checked = 1;
                                            value.status = 1;
                                          }}
                                        />
                                      )}
                                      {value.status === 0 ? (
                                        <CustomInput
                                          type="radio"
                                          id={value.privilegeId + 1}
                                          value={1}
                                          name={value.name}
                                          label="Deny"
                                          inline="true"
                                          defaultChecked
                                          onChange={() => {
                                            value.checked = 0;
                                            value.status = 0;
                                          }}
                                        />
                                      ) : (
                                        <CustomInput
                                          type="radio"
                                          id={value.privilegeId + 1}
                                          value={0}
                                          name={value.name}
                                          label="Deny"
                                          inline="true"
                                          onChange={() => {
                                            value.checked = 0;
                                            value.status = 0;
                                          }}
                                        />
                                      )}
                                      {value.status === 2 ? (
                                        <CustomInput
                                          id={'inherit' + value.id}
                                          type="radio"
                                          name={value.name}
                                          label="Inherit"
                                          inline
                                          value={2}
                                          defaultChecked
                                          onChange={() => {
                                            value.checked = 2;
                                            value.status = 2;
                                          }}
                                        />
                                      ) : (
                                        <CustomInput
                                          id={'inherit' + value.id}
                                          type="radio"
                                          name={value.name}
                                          label="Inherit"
                                          inline
                                          value={2}
                                          onChange={() => {
                                            value.checked = 2;
                                            value.status = 2;
                                          }}
                                        />
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            );
                          })}
                        </Form>
                      );
                    })}
                    <Button color="primary" type="submit" onClick={handleError}>
                      {t('save')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="3">
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(onSubmitUsers)}>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('user.password')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        // ref={register({
                        //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^+])[A-Za-z\d@$!%*?&^+]{8,}/
                        // })}
                        className={status.password === false ? 'inputStyle' : 'inputStyleError'}
                      />
                      <span>{t('errors.passworderror')}</span>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('user.confirmpassword')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="password"
                        name="passwordConfirm"
                        onChange={handleChange}
                        // ref={register({ validate: value => value === formState.values.password })}
                        className={status.passwordConfirm === false ? 'inputStyle' : 'inputStyleError'}
                      />
                      {status.passwordConfirm && <span style={{ color: 'red' }}>{t('errors.passwordnotmatch')}</span>}
                    </Col>
                  </Row>
                </FormGroup>
                <Button color="primary" type="submit" onClick={handleErrorPassword}>
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
}

UsersEdit.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    detail: state.UserReducer.detail,
    dataAllRole: state.RoleReducer.data,
    listPrivilegeByGroup: state.RoleReducer.listPrivilegeByGroup,
    detailById: state.UserReducer.detailById
  };
};

const mapDispatchToProps = {
  editUser: UserActions.EditUser,
  getAllRole: RoleActions.GetRoles,
  getListPrivilegesByGroup: RoleActions.getPrivilegeRoleByGroup,
  getUserById: UserActions.getUserById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersEdit);
