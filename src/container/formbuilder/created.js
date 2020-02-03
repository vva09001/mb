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
require('formBuilder/dist/form-render.min.js');
const Proptype = {
  created: Proptypes.func
};
let renderhtml = null;
function FormBuilder({ created }) {
  const fb = createRef();
  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const [formDataBuilDer, setFormDataBuilDer] = useState(null);

  const [checkSubmit, setSubmit] = useState(true);

  const options = {
    onSave: (event, formDataBuilDer) => onSend(formDataBuilDer)
  };

  useEffect(() => {
    $(fb.current).formBuilder(options);
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

  const onSend = formDataBuilDer => {
    setSubmit(false);
    // setFormData(JSON.stringify(formData));
    setFormDataBuilDer(formDataBuilDer);
  };

  window.jQuery(function() {
    var formdatabuilder = formDataBuilDer;
    var formRenderOpts = {
      dataType: 'json',
      formData: formdatabuilder
    };
    var renderedForm = $('<div>');

    renderedForm.formRender(formRenderOpts);

    renderhtml = renderedForm.html();
  });

  const onSubmit = event => {
    event.preventDefault();
    const body = {
      name: formState.values.name,
      status: formState.values.status,
      list: formDataBuilDer === null ? '' : formDataBuilDer,
      embedded: renderhtml
    };
    created(body);
  };
  return (
    <React.Fragment>
      <h4>{t('formBuilder.title')}</h4>
      <div className="backgroud__white p-3">
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label>{t('name')}</Label>
            <Input name="name" onChange={handleChange} />
          </FormGroup>
          <div className="check__box">
            <Label>{t('status')}</Label>
            <div>
              <Input type="checkbox" name="status" onChange={handleChange} />
              <span>{t('category_page.form.activeCategory')}</span>
            </div>
          </div>
          <div id="fb-editor" className="fb-editor" ref={fb} />
          <Button type="submit" color="primary" disabled={checkSubmit}>
            {t('save')}
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}

FormBuilder.propTypes = Proptype;

const mapDispatchToProps = {
  created: FormBuilderActions.createFormAction
};

export default connect(
  null,
  mapDispatchToProps
)(FormBuilder);
