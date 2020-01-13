import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { NetworkActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  NetworkCreate: PropTypes.func
};

function NetworksCreate({ NetworkCreate }) {
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
        description: data
      },
      touched: {
        ...formState.touched,
        description: true
      }
    }));
  };
  const createdMails = event => {
    event.preventDefault();
    NetworkCreate(formState.values);
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
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.address')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input type="text" required name="address" onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.address_name')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input type="text" required name="address_name" onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.language')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input type="text" required name="language" onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.latitude')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input type="text" required name="latitude" onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.longitude')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input type="text" required name="longitude" onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.network_category')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input type="text" required name="network_category" onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.province_city')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input type="text" required name="province_city" onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label>{t('network.about')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      ckEditorChange(event, data);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button color="primary" type="submit">
              {t('save')}
            </Button>
          </Form>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}

NetworksCreate.propTypes = PropsType;

const mapDispatchToProps = {
  NetworkCreate: NetworkActions.createNetwork
};

export default connect(
  null,
  mapDispatchToProps
)(NetworksCreate);
