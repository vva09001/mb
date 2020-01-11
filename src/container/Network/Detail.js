import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { TabContent, TabPane } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NetworkActions } from '../../store/actions';
import Gmap from '../../components/network/map/index';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const PropsType = {
  detail: PropTypes.object,
  editNetwork: PropTypes.func,
  aprrNetwork: PropTypes.func,
  getNetworkId: PropTypes.func,
  getDetail: PropTypes.func
};

function NetworkDetail({ detail, aprrNetwork, getNetworkId, getDetail,editNetwork }) {
  let { id } = useParams();
  useEffect(() => {
    getNetworkId(id);
  }, [getNetworkId, id]);

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

  const aprrNetworks = event => {
    event.preventDefault();
    aprrNetwork(formState.values);

  };

  const EditNetwork = event => {
    event.preventDefault();
    editNetwork(formState.values);

  };
  
  return (
    <React.Fragment>
      <TabContent>
        <TabPane>
          <Form onSubmit={aprrNetworks}>
            {formState.values.status === 1 ? (
              <Button color="success" disabled>
                Đã duyệt
              </Button>
            ) : (
              <Button color="primary" type="subbmit">
                {t('network.approved')}
              </Button>
            )}
            <div className="p-3" style={{ background: '#fff' }}>
              <p style={{ borderBottom: '1px solid #6f7479' }}>{t('network.networkdetails')}</p>
              <Row form style={{ display: 'flex' }}>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleName">{t('network.address')}</Label>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="address"
                      value={formState.values.address || ''}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ display: 'flex' }}>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleName">{t('network.address_name')}</Label>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="address_name"
                      value={formState.values.address_name || ''}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ display: 'flex' }}>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleName">{t('network.language')}</Label>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="language"
                      value={formState.values.language || ''}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ display: 'flex' }}>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleName">{t('network.latitude')}</Label>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="latitude"
                      value={formState.values.latitude || ''}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ display: 'flex' }}>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleName">{t('network.longitude')}</Label>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="longitude"
                      value={formState.values.longitude || ''}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ display: 'flex' }}>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleName">{t('network.network_category')}</Label>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="network_category"
                      value={formState.values.network_category || ''}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ display: 'flex' }}>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleName">{t('network.province_city')}</Label>
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="province_city"
                      value={formState.values.province_city || ''}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ display: 'flex' }}>
                <Col md={3}>
                  <FormGroup>
                    <Label>{t('network.about')}</Label>
                  </FormGroup>
                </Col>
                <Col md={9}>
                <FormGroup>
                    <CKEditor
                    editor={ClassicEditor}
                    data={formState.values.description || ''}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      ckEditorChange(event, data);
                    }}
                  />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </TabPane>
        <Gmap  />
      </TabContent>
    </React.Fragment>
  );
}

NetworkDetail.propTypes = PropsType;

const mapStateToProps = state => {
  return { detail: state.NetworkReducer.detail };
};

const mapDispatchToProps = {
  aprrNetwork: NetworkActions.AprrNetwork,
  getNetworkId: NetworkActions.getByNetworkId,
  getDetail: NetworkActions.getDetailNetwork,
  EditNetwork: NetworkActions.editNetwork
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkDetail);
