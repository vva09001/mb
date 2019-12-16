import React, { createRef, useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

function FormBuilder() {
  const fb = createRef();
  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const options = {
    onSave: (event, formData) => onSend(formData)
  };

  useEffect(() => {
    $(fb.current).formBuilder(options);
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
  };

  const onSend = formData => {
    console.log(formState.values);
    console.log(JSON.stringify(formData));
  };
  return (
    <React.Fragment>
      <h4>{t('formBuilder.title')}</h4>
      <div className="backgroud__white p-3">
        <Form>
          <FormGroup>
            <Label>{t('name')}</Label>
            <Input name="formName" onChange={handleChange} />
          </FormGroup>
          <div className="check__box">
            <Label>{t('status')}</Label>
            <div>
              <Input type="checkbox" name="form_status" onChange={handleChange} />
              <span>{t('category_page.form.activeCategory')}</span>
            </div>
          </div>
          <div id="fb-editor" className="fb-editor" ref={fb} />
        </Form>
      </div>
    </React.Fragment>
  );
}

export default FormBuilder;
