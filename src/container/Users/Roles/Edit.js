import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, ButtonGroup } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { RoleActions } from '../../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { Error } from 'helpers/notify';

const PropsType = {
  editRole: PropTypes.func,
  detail: PropTypes.object,
  detailById: PropTypes.object,
  getpermission: PropTypes.func,
  getListPrivilege: PropTypes.func,
  getListPrvilegesByGroup: PropTypes.func,
  listPrivilegeByGroup: PropTypes.array,
  dataTeam: PropTypes.array,
  getAllTeam: PropTypes.func,
  getRoleById: PropTypes.func
};
let dataPrivileges = [];
let dataIdCurrent = [];
let dataTeamToEdit = [];
let dataIdrole = [];
function RolesEdit({
  editRole,
  detail,
  detailById,
  getListPrivilege,
  getListPrvilegesByGroup,
  listPrivilegeByGroup,
  dataTeam,
  getAllTeam,
  getRoleById
}) {
  const { id } = useParams();
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  let dataIdSelect = [];
  let optionTeam = [];
  const [SelectedOption, setSelectedOption] = useState({
    Select: []
  });
  const [status, setStatus] = useState({
    teams: false,
    privileges: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  useEffect(() => {
    getRoleById(id);
  }, [getRoleById, id]);
  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detailById
    }));
  }, [detailById]);
  useEffect(() => {
    getListPrvilegesByGroup();
    getAllTeam();
  }, [getListPrvilegesByGroup, getAllTeam]);
  useEffect(() => {
    dataIdCurrent = detailById.privileges;
    dataIdrole = detailById.teams;
  }, [detailById]);
  useEffect(() => {
    dataPrivileges = listPrivilegeByGroup;
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        var check = {
          checked: 0,
          status: 0
        };
        docs = Object.assign(docs, check);
      });
    });
  });
  useEffect(() => {
    dataTeam.forEach(function(data) {
      var tmpTeam = {
        value: data.idTeam,
        label: data.name
      };
      optionTeam.push(tmpTeam);
    });
    if (dataIdrole !== undefined)
      dataIdrole.forEach(function(data) {
        defaultSelected(data);
      });
  });
  const defaultSelected = idTeam => {
    optionTeam.forEach(function(docs) {
      if (docs.value === idTeam) {
        dataIdSelect.push(docs);
      }
    });
  };
  useEffect(() => {
    if (dataIdSelect !== null) SelectedOption.Select = dataIdSelect;
  });
  const handleChangeTeam = event => {
    setSelectedOption(SelectedOption => ({
      ...SelectedOption,
      Select: event
    }));
    dataTeamToEdit = event;
  };
  const handleChecked = () => {
    dataPrivileges.forEach(function(data) {
      dataIdCurrent.forEach(function(docs) {
        handleCheckedchildrenAllow(data.groupRole, docs);
        handleCheckedchildrenDeny(data.groupRole, docs);
      });
    });
  };
  const handleCheckedchildrenAllow = (groupRole, id) => {
    var radios = document.forms[groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (String(radios[i].type) === 'radio') {
        if (Number(radios[i].value) === Number(id)) {
          radios[i].checked = true;
        }
      }
    }
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.privilegeId === id) {
          var tmp = 1;
          docs.checked = tmp;
        }
      });
    });
  };
  const handleCheckedchildrenDeny = (groupRole, id) => {
    var radios = document.forms[groupRole].elements;
    var i = 0;
    while (i < radios.length) {
      if (String(radios[i].type) === 'radio') {
        // eslint-disable-next-line
        if (radios[i].checked == '' && Number(radios[i].value) !== Number(id)) {
          radios[i].checked = true;
        } else i++;
      }
      i++;
    }
  };
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const allowBlock = value => {
    var radios = document.forms[value.groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (String(radios[i].type) === 'radio') {
        if (Number(radios[i].value) % 2 === 1) {
          radios[i].checked = true;
        }
      }
    }
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.groupRole === value.groupRole) {
          docs.checked = 1;
        }
      });
    });
  };
  const denyBlock = value => {
    var radios = document.forms[value.groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (String(radios[i].type) === 'radio') {
        if (Number(radios[i].value) % 2 === 0) {
          radios[i].checked = true;
        }
      }
    }
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.groupRole === value.groupRole) {
          docs.checked = 2;
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
  const handleError = async () => {
    formState.values.privileges = [];
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.checked === true) {
          formState.values.privileges.push(docs.privilegeId);
        }
      });
    });
    var name = await triggerValidation('name');
    if (name === false) Error(t('errors.create'));
    if (SelectedOption.Select.length === 0)
      setStatus(status => ({
        ...status,
        teams: true
      }));
    else {
      setStatus(status => ({
        ...status,
        teams: false
      }));
    }
    if (formState.values.privileges.length === 0)
      setStatus(status => ({
        ...status,
        privileges: true
      }));
    else {
      setStatus(status => ({
        ...status,
        privileges: false
      }));
    }
  };
  const onSubmitRoles = () => {
    // event.preventDefault();
    
    // dataPrivileges.forEach(function(data) {
    //   data.privileges.forEach(function(docs) {
    //     if (docs.checked === 1) {
    //       formState.values.privileges.push(docs.privilegeId);
    //     }
    //   });
    // });
    formState.values.privileges = [];
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.checked === true) {
          formState.values.privileges.push(docs.privilegeId);
        }
      });
    });
    formState.values.teams.splice(0, formState.values.teams.length);
    if (dataTeamToEdit === null) formState.values.teams = [];
    else if (dataTeamToEdit.length === 0) {
      SelectedOption.Select.forEach(function(docs) {
        formState.values.teams.push(docs.value);
      });
    } else {
      dataTeamToEdit.forEach(function(data) {
        formState.values.teams.push(data.value);
      });
    }
    console.log(formState.values)
    // editRole(formState.values);
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
                {t('user.permission')}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(onSubmitRoles)}>
                <h4>{t('account')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('name')}</Label>
                  <input
                    type="text"
                    name="name"
                    id="exampleName"
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
                  <Button color="primary" type="submit" onClick={handleError}>
                    {t('save')}
                  </Button>
                </FormGroup>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col lg={9} md={8}>
                  <Form className="p-3" style={{ background: '#fff', justifyContent: 'center', paddingBottom: 20 }} onSubmit={handleSubmit(onSubmitRoles)}>
                    <FormGroup style={{ borderBottom: '1px solid #ccc' }}>
                      <h4>{t('Team')}</h4>
                    </FormGroup>
                    <FormGroup>
                      {optionTeam.length >= 0 && (
                        <Select
                          isMulti
                          name="teams"
                          value={SelectedOption.Select}
                          onChange={handleChangeTeam}
                          options={optionTeam}
                        />
                      )}
                    </FormGroup>
                        {console.log()}
                         {SelectedOption.Select === null && status.teams && (
                        <span style={{ color: 'red' }}>{t('errors.minone')}</span>
                      )}
                    <FormGroup style={{ borderBottom: '1px solid #ccc' }}>
                      <h4>{t('Permissions')}</h4>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="12" lg="6" className="mt-2">
                          <Button onClick={() => handleChecked()}>
                            {t('roleinit.getallroleof')} {detailById.name}
                          </Button>
                        </Col>
                        <Col xs="12" lg="6" className="mt-2">
                          <ButtonGroup size="sm">
                            <Button onClick={() => allowAll()}>{t('Allow All')}</Button>
                            <Button onClick={() => denyAll()}>{t('Deny All')}</Button>
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
                                        value={value.privilegeId}
                                        name={value.name}
                                        label="Allow"
                                        inline="true"
                                        onClick={() => {
                                          value.checked = 1;
                                        }}
                                      />
                                      <CustomInput
                                        type="radio"
                                        id={value.id + 1}
                                        value={value.privilegeId + 1}
                                        name={value.name}
                                        label="Deny"
                                        inline="true"
                                        onClick={() => {
                                          value.checked = 2;
                                        }}
                                      />
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
        </Col>
      </Row>
    </React.Fragment>
  );
}

RolesEdit.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    detail: state.RoleReducer.detail,
    listPrivilegeByGroup: state.RoleReducer.listPrivilegeByGroup,
    dataTeam: state.RoleReducer.dataTeam,
    detailById: state.RoleReducer.detailById
  };
};
const mapDispatchToProps = {
  getAllTeam: RoleActions.getAllTeam,
  editRole: RoleActions.EditRole,
  getpermission: RoleActions.setPermission,
  getListPrivilege: RoleActions.getPrivilegeRole,
  getListRole: RoleActions.getListRole,
  getListPrvilegesByGroup: RoleActions.getPrivilegeRoleByGroup,
  getRoleById: RoleActions.getRoleById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesEdit);
