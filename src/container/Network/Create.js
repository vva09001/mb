import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { NetworkActions, ProvinceActions,DistrictActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash';
import { connect } from 'react-redux';

const PropsType = {
  NetworkCreate: PropTypes.func,
  Province : PropTypes.func,
  District : PropTypes.func,
  dataProvince : PropTypes.array,
  dataDistrict : PropTypes.array
};
function NetworksCreate({ NetworkCreate,dataProvince,Province ,District,dataDistrict}) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    Province();
  }, [Province,District]);

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
      values:{
        ...formState.values,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      },
      touched:{
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
  const createdNetwork = event => {
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={createdNetwork}>
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
                  <Input type="select" required name="province_city" onChange={handleChangeDistrict}>
                    <option value="">{t('select')}</option>
                    {map(dataProvince, value => (
                      <option value={value.id} key={value.id}>
                        {value.name}
                      </option>
                    ))}
                  </Input>
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
                    {map(dataDistrict,value => (
                      <option value={value.id} key={value.name}>
                        {value.name}
                      </option>
                    ))}
                  </Input>
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

const mapStateToProps = state => {
  return {
    dataProvince: state.ProvinceReducer.data,
    dataDistrict: state.DistrictReducer.data
  };
};

const mapDispatchToProps = {
  NetworkCreate: NetworkActions.createNetwork,
  Province : ProvinceActions.getProvinceAction,
  District : DistrictActions.getDistrictAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworksCreate);
