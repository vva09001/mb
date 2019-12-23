import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Button, Col, Row, Table } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useTranslation } from 'react-i18next';

function Resemail() {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const { t } = useTranslation();
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

  const resMail = event => {
    event.preventDefault();
    resMail(formState.values);
  };
  return (
    <React.Fragment>
      <h4>{t('Responsive mail')}</h4>
      <div className="backgroud__white ">
        <Form onSubmit={resMail} className="p-3">
          <Row>
            <Col sm="2">
              <FormGroup style={{ display: 'flex' }}>
                <Label>
                  {t('subject')}
                  <span style={{ color: 'red' }}> *</span>
                </Label>
              </FormGroup>
            </Col>
            <Col sm="10">
              <FormGroup>
                <Input />
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
                <Input />
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
                      <Input type="checkbox" />
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

export default Resemail;
