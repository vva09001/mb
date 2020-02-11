import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, ButtonGroup } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { UserActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Error } from 'helpers/notify';

const PropsType = {
 profileUsername: PropTypes.object,
 getUserByUsername: PropTypes.func,
 editUser: PropTypes.func,
 detailByUsername: PropTypes.object
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
function UsersEdit({
    profileUsername,
    getUserByUsername,
    editUser,
    detailByUsername
}) {
  const [formState, setFormState] = useState({
    values: detailByUsername,

    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');

  const [status, setStatus] = useState({
    roles: false,
    password: false,
    passwordConfirm: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();


  const { t } = useTranslation();
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    getUserByUsername(profileUsername.userName);
  }, [getUserByUsername]);
  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detailByUsername
    }));
    
  }, [detailByUsername]);

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


     
  const handleGenaral = async () => {
    var firstName = await triggerValidation('firstName');
    var lastName = await triggerValidation('lastName');
    var username = await triggerValidation('username');
    if (firstName === false || lastName === false || username === false) {
      Error(t('errors.edit'));
    }

   
  };

  const handleErrorPassword = async () => {
    handleGenaral();
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
    {
    }
  };
  const onSubmitUsers = () => {
    
    
    if (formState.values.password === undefined || formState.values.passwordConfirm === undefined) {
      formState.values.password = '';
      formState.values.passwordConfirm = '';
    }
    if (status.roles === false && status.password === false && status.passwordConfirm === false)
      editUser(formState.values);
    else Error(t('errors.edit'));
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
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  toggle('2');
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
                

                <Col sm="12" md={{ size: 6, offset: 2 }} style={{ paddingLeft: 6 }}>
                  <Button color="primary" type="submit" onClick={handleError}>
                    {t('save')}
                  </Button>
                </Col>
              </Form>
            </TabPane>
           </TabContent>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="2">
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
    detailByUsername: state.UserReducer.detailByUsername,
    profileUsername: state.AuthReducer.profile
  };
};

const mapDispatchToProps = {
  editUser: UserActions.EditUser,
  getUserByUsername: UserActions.getUserByUsername
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersEdit);
