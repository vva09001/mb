import React, { createRef, useState, useEffect } from 'react';
import $ from 'jquery';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Proptypes from 'prop-types';
import { FormBuilderActions } from '../../store/actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import history from 'helpers/history';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

const Proptype = {
  formDetail: Proptypes.object,
  editForm: Proptypes.func,
  getFormId: Proptypes.func
};

function EditFormBuilder({ formDetail, editForm, getFormId }) {
  let { id } = useParams();

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: formDetail
    }));
  }, [formDetail]);

  const fb = createRef();
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const [form, setForm] = useState(null);

  const [checkSubmit, setSubmit] = useState(true);

  const options = {
    onSave: (event, formData) => onSend(formData)
  };

  useEffect(() => {
    getFormId(id);

    if (formState.values.list) {
      $(fb.current).formBuilder({
        formData: JSON.parse(formState.values.list),
        onSave: (event, formData) => onSend(formData)
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [!formState.values.list, id]);

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

  const onSend = formData => {
    setSubmit(false);
    setForm(formData);
  };

  const onSubmit = event => {
    event.preventDefault();
    const data = {
      name: formState.values.name,
      status: formState.values.status,
      list: form
    };
    editForm(formDetail.id, data);
  };

  return (
    <React.Fragment>
      <h4>{t('formBuilder.title')}</h4>
      <div className="backgroud__white p-3">
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label>{t('name')}</Label>
            <Input
              name="name"
              onChange={handleChange}
              value={formState.values.name === undefined ? '' : formState.values.name}
            />
          </FormGroup>
          <div className="check__box">
            <Label>{t('status')}</Label>
            <div>
              <Input
                type="checkbox"
                name="status"
                onChange={handleChange}
                checked={formState.values.status === 0 ? false : true}
              />
              <span>{t('category_page.form.activeCategory')}</span>
            </div>
          </div>
          <div id="fb-editor" className="fb-editor" ref={fb} />
          <Button type="submit" color="primary" disabled={checkSubmit}>
            {t('save')}
          </Button>
          <Button style={{marginLeft: 10}}  onClick={()=>{
            history.push('/form-builder/list')
          }} color="success" >
            {t('Back')}
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}

EditFormBuilder.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    formDetail: state.FormBuilderReducer.detail
  };
};

const mapDispatchToProps = {
  editForm: FormBuilderActions.editFormAction,
  getFormId: FormBuilderActions.getformbyIDAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFormBuilder);
