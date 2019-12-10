import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';
import withRedirect from '../../hoc/withRedirect';
import { useTranslation } from 'react-i18next';
import { AuthActions } from 'store/actions';
import { connect } from 'react-redux';

const LoginForm = ({ hasLabel, layout, login }) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const { t } = useTranslation();

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    login({ username: email, password: password });
  };

  useEffect(() => {
    setIsDisabled(!email || !password);
  }, [email, password]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>{t('loginForm.username')}</Label>}
        <Input
          placeholder={!hasLabel ? t('loginForm.username') : ''}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>{t('loginForm.password')}</Label>}
        <Input
          placeholder={!hasLabel ? t('loginForm.password') : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <CustomInput
            id="customCheckRemember"
            label={t('loginForm.remember')}
            checked={remember}
            onChange={({ target }) => setRemember(target.checked)}
            type="checkbox"
          />
        </Col>
        <Col xs="auto">
          <Link className="fs--1" to={`/authentication/${layout}/forget-password`}>
            {t('loginForm.forgetPassword')}
          </Link>
        </Col>
      </Row>
      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled} type="submit">
          {t('loginForm.login')}
        </Button>
      </FormGroup>
    </Form>
  );
};

LoginForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool,
  login: PropTypes.func
};

LoginForm.defaultProps = {
  layout: 'basic',
  hasLabel: false
};

const mapDispatchToProps = {
  login: AuthActions.loginAction
};

export default connect(
  null,
  mapDispatchToProps
)(withRedirect(LoginForm));
