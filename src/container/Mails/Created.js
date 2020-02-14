import React, { useState } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MailActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Error } from 'helpers/notify';
const PropsType = {
  MailsCreate: PropTypes.func
};

function MailsCreate({ MailsCreate }) {
  const [formState, setFormState] = useState({
    values: {
      content: ''
    },
    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');
  const [status, setStatus] = useState({
    content: false
  })
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
  const ckEditorChange = (event, data) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        content: data
      },
      touched: {
        ...formState.touched,
        content: true
      }
    }));
  };
  const handleError = async () => {
    var code = await triggerValidation('code');
    var subject = await triggerValidation('subject');
    var name = await triggerValidation('name');
    var emailCc = await triggerValidation('emailCc');
    var active = await triggerValidation('active');
    if (code === false || subject === false || name === false || emailCc === false || active === false) {
      Error(t('errors.create'));
    }
    if (formState.values.content === '')
      setStatus(status => ({
        ...status,
        content: true
      }));
    else {
      setStatus(status => ({
        ...status,
        content: false
      }));
    }
  };
  const createdMails = () => {
    if (status.content === false)
    MailsCreate(formState.values);
    else Error(t('errors.create'))
  };
  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            {t('general')}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(createdMails)}>
            <h4>{t('create')}</h4>
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
            <FormGroup>
              <Label for="exampleName">{t('mail.code')}</Label>
              <input
                type="text"
                name="code"
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.code === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.code && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">{t('mail.subject')}</Label>
              <input
                type="text"
                name="subject"
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.subject === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.subject && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">{t('mail.active')}</Label>
              <input
                type="checkbox"
                name="active"
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.active === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.active && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
            <Label for="exampleName">{t('mail.emailCc')}</Label>
              <input
                type="text"
                name="emailCc"
                onChange={handleChange}
                ref={register({
                  required: true
                })}
                className={errors.emailCc === undefined ? 'inputStyle' : 'inputStyleError'}
              />
              {errors.emailCc && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <FormGroup>
              <Label>{t('mail.content')}</Label>
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  ckEditorChange(event, data);
                }}
              />
              {formState.values.content === '' && status.content && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
            </FormGroup>
            <Button color="primary" type="submit" onClick={handleError}>
              {t('save')}
            </Button>
          </Form>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}

MailsCreate.propTypes = PropsType;

const mapDispatchToProps = {
  MailsCreate: MailActions.AddMails
};

export default connect(
  null,
  mapDispatchToProps
)(MailsCreate);
