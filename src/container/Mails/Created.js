import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MailActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from '../../helpers/notify';
import history from '../../helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  MailsCreate: PropTypes.func
};

function MailsCreate({ MailsCreate }) {
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
    console.log(formState);
  };

  const onSuccess = () => {
    Success('Tạo thành công');
    history.goBack();
  };

  const onFail = () => {
    Error('Tạo thất bại');
  };

  const createdMails = event => {
    event.preventDefault();
    MailsCreate(formState.values, onSuccess, onFail);
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={createdMails}>
            <h4>{t('create')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="name" id="exampleName" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Mã</Label>
              <Input type="text" name="code" id="exampleName" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Chủ Đề</Label>
              <Input type="text" name="subject" id="exampleName" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Gửi Đến</Label>
              <Input type="text" name="email_cc" id="exampleName" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Nội Dung</Label>
              <CKEditor
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

MailsCreate.propTypes = PropsType;

const mapDispatchToProps = {
  MailsCreate: MailActions.AddMails
};

export default connect(
  null,
  mapDispatchToProps
)(MailsCreate);
