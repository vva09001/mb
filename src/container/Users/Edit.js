import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, ButtonGroup } from 'reactstrap';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import { UserActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  editUser: PropTypes.func
};

function UsersEdit({ editUser }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
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

  const onSubmitUsers = event => {
    event.preventDefault();
    editUser(formState.values);
  };
  const onSubmitPermission = event => {
    event.preventDefault();
    editUser(formState.values);
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
                {t('user.permissions')}
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
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmitUsers}>
                <h4>{t('user.account')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('user.fistname')}</Label>
                  <Input type="text" name="name" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('user.lastname')}</Label>
                  <Input type="text" name="lastname" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('user.department')}</Label>
                  <Input type="text" name="department" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('user.position')}</Label>
                  <Input type="text" name="position" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('email.email')}</Label>
                  <Input type="text" name="email" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('roles')}</Label>
                  <Input type="text" name="roles" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('loginForm.password')}</Label>
                  <Input type="text" name="password" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('user.confirm')}</Label>
                  <Input type="text" name="cpassword" id="exampleName" onChange={handleChange} />
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
                    <h4>{t('Attribute')}</h4>
                    <hr />
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline>
                              <h5>{t('admin.banners')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                              <Button>{t('Inherit All')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('admin.banners')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Allow" inline />
                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Deny" inline />
                            <CustomInput type="radio" id="exampleCustomRadio3" label="Inherit" inline />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('admin.banners')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Allow" inline />
                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Deny" inline />
                            <CustomInput type="radio" id="exampleCustomRadio3" label="Inherit" inline />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('admin.banners')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Allow" inline />
                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Deny" inline />
                            <CustomInput type="radio" id="exampleCustomRadio3" label="Inherit" inline />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('admin.banners')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Allow" inline />
                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Deny" inline />
                            <CustomInput type="radio" id="exampleCustomRadio3" label="Inherit" inline />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <div>
                            <Label for="exampleCheckbox" inline>
                              <h5>{t('admin.banners')}</h5>
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <ButtonGroup size="sm">
                              <Button>{t('Allow All')}</Button>
                              <Button>{t('Deny All')}</Button>
                              <Button>{t('Inherit ALL')}</Button>
                            </ButtonGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('admin.banners')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Allow" inline />
                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Deny" inline />
                            <CustomInput type="radio" id="exampleCustomRadio3" label="Inherit" inline />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('admin.banners')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Allow" inline />
                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Deny" inline />
                            <CustomInput type="radio" id="exampleCustomRadio3" label="Inherit" inline />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('admin.banners')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Allow" inline />
                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Deny" inline />
                            <CustomInput type="radio" id="exampleCustomRadio3" label="Inherit" inline />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <Col xs="6">
                          <Label for="exampleCheckbox">{t('admin.banners')}</Label>
                        </Col>
                        <Col xs="6">
                          <div>
                            <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Allow" inline />
                            <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Deny" inline />
                            <CustomInput type="radio" id="exampleCustomRadio3" label="Inherit" inline />
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
            <TabPane tabId="1">
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmitUsers}>
                <h4>{t('newpassword')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('password')}</Label>
                  <Input type="text" name="password" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('cpassword')}</Label>
                  <Input type="text" name="cpassword" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <Button color="primary" type="submit">
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

const mapDispatchToProps = {
  editUser: UserActions.EditUsers
};

export default connect(
  null,
  mapDispatchToProps
)(UsersEdit);
