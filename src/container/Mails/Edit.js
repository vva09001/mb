import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { MailActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Error } from 'helpers/notify';

const PropsType = {
  detail: PropTypes.object,
  editMail: PropTypes.func,
  getMailsId: PropTypes.func
};

function MailEdit({ detail, editMail, getMailsId }) {
  let { id } = useParams();

  useEffect(() => {
    getMailsId(id);
  }, [getMailsId, id]);

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detail
    }));
  }, [detail]);

  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const [status, setStatus] = useState({
    content: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const [activeTab, setActiveTab] = useState('1');

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
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
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
    var name = await triggerValidation('name');
    var code = await triggerValidation('code');
    var subject = await triggerValidation('subject');
    var emailCc = await triggerValidation('emailCc');
    var active = await triggerValidation('active');
    if (code === false || subject === false || name === false || emailCc === false || active === false) {
      Error(t('errors.edit'));
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

  const editMails = () => {
    if (status.content === false) editMail(formState.values);
    else Error(t('errors.edit'));
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
            {t('genaral')}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(editMails)}>
            <h4>{t('edit')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <input
                type="text"
                name="name"
                value={formState.values.name}
                id="exampleName1"
                onChange
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
                value={formState.values.code}
                id="exampleName2"
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
                value={formState.values.subject}
                id="exampleName3"
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
                value={formState.values.active}
                checked={formState.values.active}
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
                value={formState.values.emailCc}
                id="exampleName4"
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
                data={formState.values.content}
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  ckEditorChange(event, data);
                }}
              />
              {formState.values.content === '' && status.content && (
                <span style={{ color: 'red' }}>{t('errors.required')}</span>
              )}
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

MailEdit.propTypes = PropsType;

const mapStateToProps = state => {
  return { detail: state.MailReducer.detail };
};

const mapDispatchToProps = {
  editMail: MailActions.EditMails,
  getMailsId: MailActions.GetMailsId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailEdit);
