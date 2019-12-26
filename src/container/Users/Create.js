import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { UserActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  addUsers: PropTypes.func
};

function UsersCreate({ addUsers }) {
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
    console.log(formState.values);
    addUsers(formState.values);
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
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form className="p-3" style={{ background: '#fff' }} onSubmit={onSubmitUsers}>
                <h4>{t('user.account')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('user.fistname')}</Label>
                  <Input type="text" name="username" id="exampleName1" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">pass</Label>
                  <Input type="text" name="password" id="exampleName3" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleName">{t('user.lastname')}</Label>
                  <Input type="text" name="nickname" id="exampleName2" onChange={handleChange} />
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

UsersCreate.propTypes = PropsType;

const mapDispatchToProps = {
  addUsers: UserActions.AddUsers
};

export default connect(
  null,
  mapDispatchToProps
)(UsersCreate);
