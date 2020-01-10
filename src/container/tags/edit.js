import React, { useState, useEffect } from 'react';
import { Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { TagActions } from '../../store/actions';
import { useParams } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

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
  useEffect(() => {
    getDetail(id);
    setFormState(formState => ({
      ...formState,
      values: detail
    }));
  }, [getDetail, id, detail]);

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
        [event.target.name]:
          event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const onSubmit = event => {
    event.preventDefault();
    editTag(formState.values.id, formState.values);
  };

  return (
    <React.Fragment>
      <Row>
        <h4>{t('tags')}</h4>
      </Row>
      <Row className="backgroud__white p-3">
        <Form className="cetegoryFrom" onSubmit={onSubmit} style={{ width: '100%' }}>
          <FormGroup>
            <Label for="exampleName">{t('name')}</Label>
            <Input type="text" name="name" value={formState.values.name} onChange={handleChange} required />
          </FormGroup>
          <Button color="primary" type="submit">
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
