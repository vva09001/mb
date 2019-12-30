import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { MailActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

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

  const editMails = event => {
    event.preventDefault();
    editMail(formState.values);
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={editMails}>
            <h4>Chỉnh sửa</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="name" value={formState.values.name} id="exampleName1" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">{t('mail.code')}</Label>
              <Input type="text" name="code" value={formState.values.code} id="exampleName2" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">{t('mail.subject')}</Label>
              <Input
                type="text"
                name="subject"
                value={formState.values.subject}
                id="exampleName3"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">{t('mail.emailCc')}</Label>
              <Input
                type="text"
                name="emailCc"
                value={formState.values.emailCc}
                id="exampleName4"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Nội Dung</Label>
              <CKEditor
                data={formState.values.content}
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  ckEditorChange(event, data);
                }}
              />
            </FormGroup>
            <Button color="primary" type="submit">
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
