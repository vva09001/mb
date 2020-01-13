import React, { useState } from 'react';
import { Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { GroupActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  createGroup: Proptypes.func
};

function CreateGroup({ createGroup }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const { t } = useTranslation();

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
    createGroup(formState.values);
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
            <Input type="text" name="name" onChange={handleChange} required />
          </FormGroup>
          <Button color="primary" type="submit">
            {t('create')}
          </Button>
        </Form>
      </Row>
    </React.Fragment>
  );
}

CreateGroup.propTypes = Proptype;

const mapDispatchToProps = {
  createGroup: GroupActions.addGroupAction
};

export default connect(
  null,
  mapDispatchToProps
)(CreateGroup);
