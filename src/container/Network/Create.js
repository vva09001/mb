import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { NetworkActions, ProvinceActions, DistrictActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Error } from 'helpers/notify';

const PropsType = {
  NetworkCreate: PropTypes.func,
  Province: PropTypes.func,
  District: PropTypes.func,
  dataProvince: PropTypes.array,
  dataDistrict: PropTypes.array
};
function NetworksCreate({ NetworkCreate, dataProvince, Province, District, dataDistrict }) {
  const [formState, setFormState] = useState({
    values: {
      province_city: '',
      district_city: ''
    },
    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');
  const [status, setStatus] = useState({
    province_city: false,
    district_city: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    Province();
  }, [Province, District]);

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

  const handleChangeDistrict = event => {
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
    District(event.target.value);
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
  const handleError = async () => {
    var address = await triggerValidation('address');
    var address_name = await triggerValidation('address_name');
    var longitude = await triggerValidation('longitude');
    var latitude = await triggerValidation('latitude');
    var network_category = await triggerValidation('network_category');
    if (
      address === false ||
      address_name === false ||
      longitude === false ||
      latitude === false ||
      network_category === false
    )
      Error(t('errors.create'));
    if (formState.values.province_city === '')
      setStatus(status => ({
        ...status,
        province_city: true
      }));
    else {
      setStatus(status => ({
        ...status,
        province_city: false
      }));
    }
    if (formState.values.district_city === '')
      setStatus(status => ({
        ...status,
        district_city: true
      }));
    else {
      setStatus(status => ({
        ...status,
        district_city: false
      }));
    }
  };
  const createdNetwork = () => {
    if (status.province_city === false && status.province_city === false) NetworkCreate(formState.values);
    else Error(t('errors.create'));
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(createdNetwork)}>
            <h4>{t('create')}</h4>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.address')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    ref={register({
                      required: true
                    })}
                    className={errors.address === undefined ? 'inputStyle' : 'inputStyleError'}
                  />
                  {errors.address && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
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
                  <input
                    type="text"
                    name="address_name"
                    onChange={handleChange}
                    ref={register({
                      required: true
                    })}
                    className={errors.address_name === undefined ? 'inputStyle' : 'inputStyleError'}
                  />
                  {errors.address_name && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
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
                  <input
                    type="text"
                    name="latitude"
                    onChange={handleChange}
                    ref={register({
                      required: true
                    })}
                    className={errors.latitude === undefined ? 'inputStyle' : 'inputStyleError'}
                  />
                  {errors.latitude && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
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
                  <input
                    type="text"
                    name="longitude"
                    onChange={handleChange}
                    ref={register({
                      required: true
                    })}
                    className={errors.longitude === undefined ? 'inputStyle' : 'inputStyleError'}
                  />
                  {errors.longitude && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
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
                  <input
                    type="text"
                    name="network_category"
                    onChange={handleChange}
                    ref={register({
                      required: true
                    })}
                    className={errors.network_category === undefined ? 'inputStyle' : 'inputStyleError'}
                  />
                  {errors.network_category && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
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
                  <Input type="select" name="province_city" onChange={handleChangeDistrict}>
                    <option value="">{t('select')}</option>
                    {map(dataProvince, value => (
                      <option value={value.id} key={value.id}>
                        {value.name}
                      </option>
                    ))}
                  </Input>
                  {formState.values.province_city === '' && status.province_city && (
                    <span style={{ color: 'red' }}>{t('errors.required')}</span>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row form style={{ display: 'flex' }}>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleName">{t('network.districts')}</Label>
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Input type="select" name="district_city" onChange={handleChange}>
                    <option value="">{t('select')}</option>
                    {map(dataDistrict, value => (
                      <option value={value.id} key={value.name}>
                        {value.name}
                      </option>
                    ))}
                  </Input>
                  {formState.values.district_city === '' && status.district_city && (
                    <span style={{ color: 'red' }}>{t('errors.required')}</span>
                  )}
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

            <Button color="primary" type="submit" onClick={handleError}>
              {t('save')}
            </Button>
          </Form>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}

NetworksCreate.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    dataProvince: state.ProvinceReducer.data,
    dataDistrict: state.DistrictReducer.data
  };
};

const mapDispatchToProps = {
  NetworkCreate: NetworkActions.createNetwork,
  Province: ProvinceActions.getProvinceAction,
  District: DistrictActions.getDistrictAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworksCreate);
