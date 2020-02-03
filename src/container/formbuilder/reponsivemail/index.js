/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button, Col, Row, Table } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FeedbackActions } from '../../../store/actions';
import { FormBuilderActions } from '../../../store/actions';
import { map } from 'lodash';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const PropsType = {
  formDetail: PropTypes.object,
  detailrely: PropTypes.object,
  ReponmailCreate: PropTypes.func,
  getFormId: PropTypes.func,
  getRelyMail: PropTypes.func
};
let listform = null;
function ReponmailCreate({ ReponmailCreate, formDetail, getFormId, detailrely, getRelyMail }) {
  let { id } = useParams();
  useEffect(() => {
    getFormId(id);
    getRelyMail(id);
  }, [getFormId, id, getRelyMail]);

  if (formDetail.list) {
    listform = JSON.parse(formDetail.list);
  }
  
  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: detailrely
    }));
  }, [detailrely]);

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
                <Input
                  name="subject"
                  value={formState.values.subject === undefined ? '' : formState.values.subject}
                  required
                  onChange={handleChange}
                />
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
                <Input
                  name="feedBackTo"
                  value={formState.values.feedBackTo === undefined ? '' : formState.values.feedBackTo}
                  required
                  onChange={handleChange}
                />
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
                  data={formState.values.messageBody}
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
              <FormGroup>
                {map(listform, (value, index) => (
                  <div key={value + index}>
                    {value.type === 'button' ? (
                      ''
                    ) : (
                      <div>
                        <span>{value.label}</span> : <span> [mg_{index}_field]</span>
                      </div>
                    )}
                  </div>
                ))}
              </FormGroup>
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
                      <Input
                        name="status"
                        checked={formState.values.status === 0 ? false : true}
                        onChange={handleChange}
                        type="checkbox"
                      />
                      <span>Enable the Form</span>
                    </td>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>
          <Button type="submit" color="primary">
            {t('save')}
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
}

ReponmailCreate.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    formDetail: state.FormBuilderReducer.detail,
    detailrely: state.FeedbackReducer.detail
  };
};

const mapDispatchToProps = {
  ReponmailCreate: FeedbackActions.AddFeedbackMail,
  getFormId: FormBuilderActions.getformbyIDAction,
  getRelyMail: FeedbackActions.GetFeedbackMailsId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReponmailCreate);
