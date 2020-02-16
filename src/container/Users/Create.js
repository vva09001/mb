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
import { Error } from 'helpers/notify';

const PropsType = {
  addUsers: PropTypes.func,
  getAllRole: PropTypes.func,
  dataAllRole: PropTypes.array,
  listPrivilegeByGroup: PropTypes.array,
  getListPrivilegesByGroup: PropTypes.func
};

let dataRolesToAdd = [];
let dataPrivileges = [];
function UsersCreate({ addUsers, getAllRole, dataAllRole, listPrivilegeByGroup, getListPrivilegesByGroup }) {
  const [formState, setFormState] = useState({
    values: {
      roles: [],
      userPrivilegeRequests: [],
      status: 0
    },
    touched: {}
  });
  const [status, setStatus] = useState({
    roles: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const [activeTab, setActiveTab] = useState('1');
  let optionRoles = [];
  const [SelectedOption, setSelectedOption] = useState({
    Select: []
  });
  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    getAllRole();
    getListPrivilegesByGroup();
  }, [getAllRole, getListPrivilegesByGroup]);
  useEffect(() => {
    dataAllRole.forEach(function(data) {
      var tmpSetDataOption = {
        value: data.name,
        label: data.name,
        id: data.id,
        idRole: data.idRole
      };
      optionRoles.push(tmpSetDataOption);
    });
  });
  useEffect(() => {
    dataPrivileges = listPrivilegeByGroup;
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        var check = {
          checked: '',
          status: ''
        };
        docs = Object.assign(docs, check);
      });
    });
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (SelectedOption.Select === null || SelectedOption.Select.length === 0) {
          return;
        } else docs.status = 2;
      });
    });
  });

  const allowBlock = value => {
    var radios = document.forms[value.groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (String(radios[i].type) === 'radio') {
        if (Number(radios[i].value) === 1) {
          radios[i].checked = true;
        }
      }
    }
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.groupRole === value.groupRole) {
          docs.checked = true;
          docs.status = 1;
        }
      });
    });
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
          docs.checked = false;
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
          docs.checked = '';
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
  const handleChange = event => {
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
    dataRolesToAdd = event;
  };
  const handleError = async () => {
    var firstName = await triggerValidation('firstName');
    var lastName = await triggerValidation('lastName');
    var username = await triggerValidation('username');
    var password = await triggerValidation('password');
    var passwordConfirm = await triggerValidation('passwordConfirm');
    if (
      firstName === false ||
      lastName === false ||
      username === false ||
      password === false ||
      passwordConfirm === false
    ) {
      Error(t('errors.create'));
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
  const onSubmitUser = () => {
    if (dataRolesToAdd !== null)
      dataRolesToAdd.forEach(function(data) {
        formState.values.roles.push(data.idRole);
      });
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
    if (status.roles === false) {
      addUsers(formState.values);
    } else Error(t('errors.create'));
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
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(onSubmitUser)}>
                <h4>{t('user.account')}</h4>
                <FormGroup>
                  <Row>
                    <Col sm={2}>
                      <Label for="exampleName" style={{ color: 'rgb(60, 60, 60)' }}>
                        {t('user.firstname')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      {/* [A-Za-z\. -]+ */}
                      <input
                        type="text"
                        name="firstName"
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
                        {t('user.username')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <input
                        type="text"
                        name="username"
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
                        {t('user.department')}
                      </Label>
                    </Col>
                    <Col sm={6}>
                      <Input type="text" name="department" onChange={handleChange} />
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
                      <Input type="text" name="email" onChange={handleChange} />
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
                        ref={register({
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/
                        })}
                        className={errors.password === undefined ? 'inputStyle' : 'inputStyleError'}
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
                        ref={register({ validate: value => value === formState.values.password })}
                        className={errors.passwordConfirm === undefined ? 'inputStyle' : 'inputStyleError'}
                      />
                      {errors.passwordConfirm && <span style={{ color: 'red' }}>{t('errors.passwordnotmatch')}</span>}
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
                    onSubmit={handleSubmit(onSubmitUser)}
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
                            <Col sm={9} style={{ borderBottom: '1px solid #ccc', paddingLeft: 0 }}>
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
                                      <CustomInput
                                        type="radio"
                                        id={value.id}
                                        value={1}
                                        name={value.name}
                                        label="Allow"
                                        inline="true"
                                        // checked={value.inherit ===1}
                                        onChange={() => {
                                          value.checked = true;
                                          value.status = 1;
                                        }}
                                        // checked={}
                                      />
                                      <CustomInput
                                        type="radio"
                                        id={value.id + 1}
                                        value={0}
                                        name={value.name}
                                        label="Deny"
                                        inline="true"
                                        // checked={value.inherit ===0}
                                        onChange={() => {
                                          value.checked = false;
                                          value.status = 0;
                                        }}
                                      />
                                      {value.status === 2 ? (
                                        <CustomInput
                                          id={'inherit' + value.id}
                                          type="radio"
                                          name={value.name}
                                          label="Inherit"
                                          inline
                                          value={2}
                                          // checked={value.inherit === 2}
                                          defaultChecked
                                          onChange={() => {
                                            value.checked = '';
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
                                            value.checked = '';
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

UsersCreate.propTypes = PropsType;
const mapStateToProps = state => {
  return {
    dataAllRole: state.RoleReducer.data,
    listPrivilegeByGroup: state.RoleReducer.listPrivilegeByGroup
  };
};
const mapDispatchToProps = {
  addUsers: UserActions.AddUsers,
  getAllRole: RoleActions.GetRoles,
  getListPrivilegesByGroup: RoleActions.getPrivilegeRoleByGroup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersCreate);
