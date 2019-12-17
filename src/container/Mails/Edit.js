import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { MailActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from '../../helpers/notify';
import history from '../../helpers/history';
import classnames from 'classnames';
import { connect } from 'react-redux';

const PropsType = {
  detail: PropTypes.object,
  editMail: PropTypes.func
};

function MailEdit({ detail, editMail }) {
  const [formState, setFormState] = useState({
    values: detail,
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
        description: data
      },
      touched: {
        ...formState.touched,
        description: true
      }
    }));
  };

  const onSuccess = () => {
    Success('Sửa thành công');
    history.goBack();
  };

  const onFail = () => {
    Error('Sửa thất bại');
  };

  const editMails = event => {
    event.preventDefault();
    editMail(formState.values, onSuccess, onFail);
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
            <h4>{t('create')}</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="name" id="exampleName" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Mã</Label>
              <Input type="text" name="name" id="exampleName" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Chủ Đề</Label>
              <Input type="text" name="name" id="exampleName" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleName">Gửi Đến</Label>
              <Input type="text" name="name" id="exampleName" onChange={handleChange} />
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

MailEdit.propTypes = PropsType;

const mapStateToProps = state => {
  return { detail: state.MailReducer.detail };
};

const mamapDispatchToProps = {
  editMail: MailActions.EditMail
};

export default connect(
  mapStateToProps,
  mamapDispatchToProps
)(MailEdit);
