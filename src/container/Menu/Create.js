import React, { useState } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Error } from 'helpers/notify';

const Proptype = {
  addMenu: Proptypes.func
};

function CreateMenus({ addMenu }) {
  const [formState, setFormState] = useState({
    values: {
      position: ''
    },
    touched: {}
  });

  const { t } = useTranslation();
  const [status, setStatus] = useState({
    position: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const handleError = async () => {
    var name = await triggerValidation('name');
    if (name === false) {
      Error(t('errors.create'));
    }
    if (formState.values.position === '')
      setStatus(status => ({
        ...status,
        position: true
      }));
    else {
      setStatus(status => ({
        ...status,
        position: false
      }));
    }
  };
  const onSubmit = () => {
    if (status.position === false) addMenu(formState.values);
    else Error(t('errors.create'));
  };
  return (
    <React.Fragment>
      <h4> {t('Menu')}</h4>
      <Row className="category__wapper">
        <Col lg={7} md={4}>
          <div>
            <Alert color="primary">{t('menu.checksave')}</Alert>
          </div>
        </Col>
        <Col lg={5} md={4}>
          <div>
            <Form className="cetegoryFrom" onSubmit={handleSubmit(onSubmit)}>
              <h4>{t('menu.create')}</h4>
              <FormGroup>
                <Label for="exampleName">{t('name')}</Label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  ref={register({
                    required: true
                  })}
                  className={errors.name === undefined ? 'inputStyle' : 'inputStyleError'}
                />
                {errors.name && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">{t('menu.Postion')}</Label>
                <Input type="select" name="position" onChange={handleChange}>
                  <option value={''}>{t('menu.Select')}</option>
                  <option value={'bottom'}>{t('menu.Bottom')}</option>
                  <option value={'top'}>{t('menu.Top')}</option>
                  <option value={'side'}>{t('menu.Side')}</option>
                  <option value={'middle'}>{t('menu.Middle')}</option>
                </Input>
                {formState.values.position === '' && status.position && (
                  <span style={{ color: 'red' }}>{t('errors.required')}</span>
                )}
              </FormGroup>
              <FormGroup>
                <div className="check__box">
                  <Label>{t('status')}</Label>
                  <div>
                    <Input type="checkbox" name="status" onChange={handleChange} />
                    <span>{t('active')}</span>
                  </div>
                </div>
              </FormGroup>
              <Button color="primary" type="submit" onClick={handleError}>
                {t('create')}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

CreateMenus.propTypes = Proptype;

const mapDispatchToProps = {
  addMenu: MenuActions.AddMenus
};

export default connect(
  null,
  mapDispatchToProps
)(CreateMenus);
