import React, { useState, useEffect } from 'react';
import { Row, Button, Form, FormGroup, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { TagActions } from '../../store/actions';
import { useParams } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

const Proptype = {
  detail: Proptypes.object,
  editTag: Proptypes.func,
  getDetail: Proptypes.func
};

function CreateTag({ editTag, getDetail, detail }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const { id } = useParams();
  const { t } = useTranslation();
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  useEffect(() => {
    getDetail(id);
  }, [getDetail, id]);

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detail
    }));
  }, [detail]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  }; const handleError = async () => {
    var name = await triggerValidation('name');
    if (name === false) Error(t('errors.create'));
  };
  const onSubmit = () => {
    editTag(formState.values.id, formState.values);
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

const mapStateToProps = state => {
  return {
    detail: state.TagReducer.detail
  };
};

const mapDispatchToProps = {
  editTag: TagActions.editTagAction,
  getDetail: TagActions.getDetailTagAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTag);
