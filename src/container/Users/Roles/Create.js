import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, ButtonGroup } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { RoleActions } from '../../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Select from 'react-select';

const PropsType = {
  getListPrvilegesByGroup: PropTypes.func,
  listPrivilegeByGroup: PropTypes.array,
  addRole: PropTypes.func,
  getAllTeam: PropTypes.func,
  dataTeam: PropTypes.array
};
let dataPrivileges = [];
let dataTeamToAdd = [];
function RolesCreate({ addRole, listPrivilegeByGroup, getListPrivilegesByGroup, getAllTeam, dataTeam }) {
  const [formState, setFormState] = useState({
    name: '',
    privileges: [],
    teams: []
  });
  const [SelectedOption, setSelectedOption] = useState({
    Select: []
  });
  const optionTeam = [];
  useEffect(() => {
    getListPrivilegesByGroup();
    getAllTeam();
  }, [getListPrivilegesByGroup, getAllTeam]);
  useEffect(() => {
    dataPrivileges = listPrivilegeByGroup;
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        var check = {
          checked: ''
        };
        docs = Object.assign(docs, check);
      });
    });
  });

  useEffect(() => {
    dataTeam.forEach(function(data) {
      var tmpTeam = {
        value: data.name,
        label: data.name,
        id: data.id,
        idTeam: data.idTeam
      };
      optionTeam.push(tmpTeam);
    });
  });
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      name: event.target.value
    }));
  };

  const handleChangeTeam = event => {
    setSelectedOption(SelectedOption => ({
      ...SelectedOption,
      Select: event
    }));
    dataTeamToAdd = event;
  };
  const onSubmitRoles = event => {
    event.preventDefault();
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.checked === true) {
          formState.privileges.push(docs.privilegeId);
        }
      });
    });
    event.preventDefault();
    dataTeamToAdd.forEach(function(data) {
      formState.teams.push(data.idTeam);
    });
    addRole(formState);
  };

  const allowBlock = groupRole => {
    var radios = document.forms[groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (radios[i].type === 'radio') {
        if (Number(radios[i].value) % 2 === 1) {
          radios[i].checked = true;
        }
      }
    }
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.groupRole === groupRole) {
          docs.checked = true;
        }
      });
    });
  };
  const denyBlock = groupRole => {
    var radios = document.forms[groupRole].elements;
    for (var i = 1; i < radios.length; i++) {
      if (radios[i].type === 'radio') {
        if (Number(radios[i].value) % 2 === 0) {
          radios[i].checked = true;
        }
      }
    }
    dataPrivileges.forEach(function(data) {
      data.privileges.forEach(function(docs) {
        if (docs.groupRole === groupRole) {
          docs.checked = false;
        }
      });
    });
  };
  const allowAll = () => {
    dataPrivileges.forEach(function(data) {
      allowBlock(data.groupRole);
    });
  };
  const denyAll = () => {
    dataPrivileges.forEach(function(data) {
      denyBlock(data.groupRole);
    });
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
              <Form className="p-3" style={{ background: '#fff' }}>
                <h4>{t('account')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('name')}</Label>
                  <Input type="text" name="name" id="exampleName" onChange={handleChange} />
                </FormGroup>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col lg={9} md={8}>
                  <div className="p-3" style={{ background: '#fff', justifyContent: 'center', paddingBottom: 20 }}>
                    <FormGroup style={{ borderBottom: '1px solid #ccc' }}>
                      <h4>{t('Team')}</h4>
                    </FormGroup>
                    <FormGroup>
                      {optionTeam.length >= 0 && (
                        <Select name="teams" 
                        value={SelectedOption.Select}
                        options={optionTeam} isMulti 
                        onChange={handleChangeTeam} />
                      )}
                    </FormGroup>
                    <FormGroup style={{ borderBottom: '1px solid #ccc' }}>
                      <h4>{t('Permissions')}</h4>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col />

                        <Col>
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
                              <Col xs="6">
                                <div>
                                  <Label for="exampleCheckbox" inline="true">
                                    <h5>{t('ADMIN.' + values.groupRole)}</h5>
                                  </Label>
                                </div>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <ButtonGroup size="sm">
                                    <Button onClick={() => allowBlock(values.groupRole)}>{t('Allow All')}</Button>
                                    <Button onClick={() => denyBlock(values.groupRole)}>{t('Deny All')}</Button>
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
                                          value.checked = true;
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
                                          value.checked = false;
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
                    <Button color="primary" type="submit" onClick={onSubmitRoles}>
                      {t('save')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
}

RolesCreate.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    dataTeam: state.RoleReducer.dataTeam,
    detail: state.RoleReducer.detail,
    listPrivilege: state.RoleReducer.listPrivilege,
    listPrivilegeByGroup: state.RoleReducer.listPrivilegeByGroup
  };
};
const mapDispatchToProps = {
  addRole: RoleActions.AddRoles,
  getAllTeam: RoleActions.getAllTeam,
  getListPrivilege: RoleActions.getPrivilegeRole,
  getListRole: RoleActions.getListRole,
  getListPrivilegesByGroup: RoleActions.getPrivilegeRoleByGroup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesCreate);
