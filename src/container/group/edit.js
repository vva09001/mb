import React, { useState, useEffect } from 'react';
import { Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { GroupActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  detail: Proptypes.object,
  getDetail: Proptypes.func,
  editGroup: Proptypes.func
};

function EditGroup({ detail, getDetail, editGroup }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const { t } = useTranslation();

  const { id } = useParams();

  useEffect(() => {
    getDetail(id);
  }, [getDetail]);

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
    editGroup(id, formState.values);
  };

  return (
    <React.Fragment>
      <Row>
        <h4>{t('group.title')}</h4>
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

EditGroup.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    detail: state.GroupReducer.detail
  };
};

const mapDispatchToProps = {
  getDetail: GroupActions.getGroupByIDAction,
  editGroup: GroupActions.editGroupAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGroup);
