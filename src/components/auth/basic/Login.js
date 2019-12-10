import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import LoginForm from '../LoginForm';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Row className="text-left justify-content-between">
        <Col xs="auto">
          <h5> {t('loginForm.login')}</h5>
        </Col>
      </Row>
      <LoginForm />
    </Fragment>
  );
};

export default Login;
