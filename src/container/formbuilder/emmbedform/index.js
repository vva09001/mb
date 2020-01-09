import React, { useState, useEffect } from 'react';
import { FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { FormBuilderActions } from '../../../store/actions';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

const PropsType = {
  detail: PropTypes.object,
  getFormId: PropTypes.func
};

function Edit({ detail, getFormId }) {
  let { id } = useParams();
  useEffect(() => {
    getFormId(id);
  }, [getFormId, id]);

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detail
    }));
  }, [detail]);

  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

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
    if (event.target.name === 'name') {
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
    }
  };

  return (
    <div>
      <h3>{t('formBuilder.embededform')}</h3>
      <FormGroup>
        <Input
          style={{ backgroundColor: '#f5f5f5' }}
          type="textarea"
          disabled
          value={formState.values.embedded === undefined ? '' : formState.values.embedded}
          onChange={handleChange}
          rows="15"
        />
        <p style={{ backgroundColor: '#fff', padding: '10px' }}>Shortcut @mgform({formState.values.id})</p>
      </FormGroup>
    </div>
  );
}

Edit.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    detail: state.FormBuilderReducer.detail
  };
};

const mapDispatchToProps = {
  getFormId: FormBuilderActions.getformbyIDAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
