import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Button, Col, Row, Table } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FeedbackActions } from '../../../store/actions';
import { connect } from 'react-redux';

const PropsType = {
  ReponmailCreate: PropTypes.func
};
function ReponmailCreate({ ReponmailCreate }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

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
        messageBody: data
      },
      touched: {
        ...formState.touched,
        messageBody: true
      }
    }));
  };

  const resbackMail = event => {
    event.preventDefault();
    //console.log(formState.values);
    ReponmailCreate(formState.values);
  };
  return (
    <React.Fragment>
      <h4>{t('Responsive mail')}</h4>
      <div className="backgroud__white ">
        <Form className="p-3" onSubmit={resbackMail}>
          <Row>
            <Col sm="2">
              <FormGroup style={{ display: 'flex' }}>
                <Label>
                  {t('mail.subject')}
                  <span style={{ color: 'red' }}> *</span>
                </Label>
              </FormGroup>
            </Col>
            <Col sm="10">
              <FormGroup>
                <Input name="subject" required onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="2">
              <FormGroup>
                <Label>
                  {t('Replyto')}
                  <span style={{ color: 'red' }}> *</span>
                </Label>
              </FormGroup>
            </Col>
            <Col sm="10">
              <FormGroup style={{ display: 'flex' }}>
                <Input name="feedBackTo" required onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="2">
              <FormGroup>
                <Label>
                  {t('MassageBody')}
                  <span style={{ color: 'red' }}> *</span>
                </Label>
              </FormGroup>
            </Col>
            <Col sm="10">
              <FormGroup>
                <CKEditor
                  style={{ width: '100%' }}
                  required
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    ckEditorChange(event, data);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="2">
              <FormGroup>
                <Label>
                  {t('Fields')}
                  <span style={{ color: 'red' }}> *</span>
                </Label>
              </FormGroup>
            </Col>
            <Col sm="10">
              <Table striped>
                <thead>
                  <tr>
                    <td>
                      <span>TextArea</span>:<span>[mg_30_field]</span>
                    </td>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col sm="2">
              <FormGroup>
                <Label>{t('Status')}</Label>
              </FormGroup>
            </Col>
            <Col sm="10">
              <Table>
                <thead>
                  <tr>
                    <td>
                      <Input name="status" onChange={handleChange} type="checkbox" />
                      <span>Enable the Form</span>
                    </td>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>
          <Button type="submit" color="primary">
            {t('feedback')}
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}

ReponmailCreate.propTypes = PropsType;

const mapDispatchToProps = {
  ReponmailCreate: FeedbackActions.AddFeedbackMail
};

export default connect(
  null,
  mapDispatchToProps
)(ReponmailCreate);
