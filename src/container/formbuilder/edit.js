import React, { createRef, useState, useEffect } from 'react';
import $ from 'jquery';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Proptypes from 'prop-types';
import { FormBuilderActions } from '../../store/actions';
import { connect } from 'react-redux';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

const Proptype = {
  formDetail: Proptypes.object,
  editForm: Proptypes.func
};

function EditFormBuilder({ formDetail, editForm }) {
  const fb = createRef();
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    values: formDetail,
    touched: {}
  });

  const [form, setForm] = useState(null);

  const [checkSubmit, setSubmit] = useState(true);

  const options = {
    onSave: (event, formData) => onSend(formData)
  };
  useEffect(() => {
    $(fb.current).formBuilder({ formData: JSON.parse(formDetail.list), onSave: (event, formData) => onSend(formData) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!fb.current, !options]);

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
            <Input name="name" onChange={handleChange} value={formState.values.name} />
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
          <Button type="submit" color="primary">
            {t('save')}
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
  editForm: FormBuilderActions.editFormAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFormBuilder);
