import React, { useState } from 'react';
import { Row, Button, Form, FormGroup, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { TagActions } from '../../store/actions';
import { Error } from 'helpers/notify';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

const Proptype = {
  createTag: Proptypes.func
};

function CreateTag({ createTag }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const { t } = useTranslation();
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
    if (name === false) Error(t('errors.create'));
  };
  const onSubmit = () => {
    createTag(formState.values);
  };

  return (
    <React.Fragment>
      <Row>
        <h4>{t('tags')}</h4>
      </Row>
      <Row className="backgroud__white p-3">
        <Form className="cetegoryFrom" onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
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
          <Button color="primary" type="submit" onClick={handleError}>
            {t('create')}
          </Button>
        </Form>
      </Row>
    </React.Fragment>
  );
}

CreateTag.propTypes = Proptype;

const mapDispatchToProps = {
  createTag: TagActions.createTagAction
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTag);
