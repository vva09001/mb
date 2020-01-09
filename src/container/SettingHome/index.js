import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { SettingActions } from '../../store/actions';
import { CountryActions } from '../../store/actions';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { map } from 'lodash';

const PropsType = {
  detail: PropTypes.object,
  customerFontend: PropTypes.object,
  generals: PropTypes.object,
  mailSettings: PropTypes.object,
  getData: PropTypes.func,
  getNews: PropTypes.func,
  deleteNews: PropTypes.func,
  getDetail: PropTypes.func,
  getCategory: PropTypes.func,
  getDataCountry: PropTypes.func,
  country: PropTypes.array,
  encryption: PropTypes.array,
  getDataEncryption: PropTypes.func,
  editSetting: PropTypes.func

};

function SettingHome(
  {
    getData,
    detail,
    customerFontend,
    generals,
    mailSettings,
    getDataCountry,
    country,
    getDataEncryption,
    encryption,
    editSetting
  }) {
  const [formState, setFormState] = useState({
    value: {},
    customerFontend: {},
    generals: {},
    mailSettings: {},
    country: [],
    encryption: {},
    touched: {}
  });
  const animatedComponents = makeAnimated();
  useEffect(() => {
    getData();
    getDataCountry();
    getDataEncryption();
  }, [getData, getDataCountry, getDataEncryption]);
  useEffect(() => {
    if (!Array.isArray(country)){
      country = [];
    }
    setFormState(formState => ({
      ...formState,
      customerFontend: customerFontend,
      generals: generals,
      mailSettings: mailSettings,
      country: country,
      encryption: encryption
    }));
  }, [detail, country, encryption]);

  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleChangeMail = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      mailSettings: {
        ...formState.mailSettings,
        [event.target.name]: event.target.name === 'encryptions' ? parseInt(event.target.value) : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleChangeCustomerFontend = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      customerFontend: {
        ...formState.customerFontend,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleChangeGenerals = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      generals: {
        ...formState.generals,
        [event.target.name]: event.target.name === 'defaulCountries' ? parseInt(event.target.value) : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleChangeSupportLocales = event => {
    console.log('sp', event);
    let idLocales = [];
    map(event, values => {
      idLocales.push({
        id: values.value,
        name:values.label
      });
      return {
        id: values.value,
        name:values.label
      };
    });
    setFormState(formState => ({
      ...formState,
      generals: {
        ...formState.generals,
        supportLocales: idLocales
      },
      touched: {
        ...formState.touched,
        supportLocales: true
      }
    }));
  };

  const handleChangeSupportCountries = event => {
    let idCountries = [];
    map(event, values => {
      idCountries.push({
        id: values.value,
        name:values.label
      });
      return {
        id: values.value,
        name:values.label
      };
    });
    setFormState(formState => ({
      ...formState,
      generals: {
        ...formState.generals,
        supportCountries: idCountries
      },
      touched: {
        ...formState.touched,
        supportCountries: true
      }
    }));
  };

  const onSubmit = event => {
    event.preventDefault();
    if (formState.generals) {

      let supportLocalesId = [];
      map(formState.generals.supportLocales, values => {
        supportLocalesId.push(values.id);
        return values;
      });

      let supportCountriesId = [];

      map(formState.generals.supportCountries, values => {
        supportCountriesId.push(values.id);
        return values;
      });

      formState.generals.supportLocales = supportLocalesId;
      formState.generals.supportCountries = supportCountriesId;

    }
    const data = {
      customerFontends: formState.customerFontend,
      generals: formState.generals,
      mailSettings: formState.mailSettings
    };
    editSetting(data);
  };
    return (
      <React.Fragment>
        <h4>{t('setting.setting')}</h4>
        <Row className="category__wapper">
          <Col lg={3} md={4}>
            <Nav tabs style={{ display: 'block' }}>
              <p className="mb-2">{t('setting.settingeneral')}</p>
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
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  {t('setting.mail')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => {
                    toggle('3');
                  }}
                >
                  {t('setting.css/js')}
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col lg={9} md={8}>
            <Nav tabs>
              <NavItem>
                <NavLink>{t('general')}</NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Form className="p-3" onSubmit={onSubmit}>
                  <FormGroup>
                    <Label>Các nước được hỗ trợ</Label>
                    {
                      formState.country.length ?
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          value={map(formState.generals.supportCountries,values=>{
                            return {
                              value: values.id,
                              label: values.name
                            };
                          })}
                          name="supportCountries"
                          options={formState.country} isMulti onChange={handleChangeSupportCountries}/>
                        :
                        null
                    }

                  </FormGroup>
                  <FormGroup>
                    <Label>Địa điểm được hỗ trợ</Label>
                    <Select
                      name="supportLocales"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={map(formState.generals.supportLocales,values=>{
                        return {
                          value: !values.id ? '' : values.id,
                          label: !values.name ? '' : values.name
                        };
                      })}
                      options={formState.country} isMulti onChange={handleChangeSupportLocales}/>
                  </FormGroup>
                  <FormGroup>
                    <Label>Địa điểm mặc định</Label>
                    <Input type="select" name="defaulCountries"
                           value={formState.generals.defaulCountries}
                           onChange={handleChangeGenerals}>
                      {map(formState.country, value => (
                        <option value={value.value} key={value.value}>
                          {value.label}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <Button color="primary" type="submit">
                    {t('save')}
                  </Button>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form className="p-3" onSubmit={onSubmit}>
                  <FormGroup>
                    <Label for="exampleName">Thư từ địa chỉ</Label>
                    <Input type="text" name="mailFromAddress"
                           value={formState.mailSettings.mailFromAddress === undefined ? '' : formState.mailSettings.mailFromAddress}
                           onChange={handleChangeMail}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">Thư từ tên</Label>
                    <Input type="text" name="mailFromName"
                           value={formState.mailSettings.mailFromName === undefined ? '' : formState.mailSettings.mailFromName}
                           onChange={handleChangeMail}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">Máy chủ thư</Label>
                    <Input type="text" name="ten"
                           value={formState.mailSettings.mailPort === undefined ? '' : formState.mailSettings.mailPort}
                           onChange={handleChangeMail}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">Cổng thư</Label>
                    <Input type="text" name="mailHost"
                           value={formState.mailSettings.mailHost === undefined ? '' : formState.mailSettings.mailHost}
                           onChange={handleChangeMail}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">Tên người dùng thư</Label>
                    <Input type="text" name="mailUsername"
                           value={formState.mailSettings.mailUsername === undefined ? '' : formState.mailSettings.mailUsername}
                           onChange={handleChangeMail}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">Mail Password</Label>
                    <Input type="text" name="mailPassword"
                           value={formState.mailSettings.mailPassword === undefined ? '' : formState.mailSettings.mailPassword}
                           onChange={handleChangeMail}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">Mã hóa thư</Label>

                    <Input type="select"
                           name="encryptions"
                           value={
                             !formState.mailSettings.encryptions
                               ? '' : formState.mailSettings.encryptions
                           } onChange={handleChangeMail}
                    >
                      {map(formState.encryption, value => (
                        <option value={value.id} key={value.id}>
                          {value.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <Button color="primary" type="submit">
                    {t('save')}
                  </Button>
                </Form>
              </TabPane>
              <TabPane tabId="3">
                <Form className="p-3" onSubmit={onSubmit}>
                  <FormGroup>
                    <Label for="exampleName">Header</Label>
                    <Input type="textarea" rows="5" name="customerHeaderAssets"
                           value={formState.customerFontend.customerHeaderAssets === undefined ? '' : formState.customerFontend.customerHeaderAssets}
                           onChange={handleChangeCustomerFontend}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile">Footer</Label>
                    <Input type="textarea" rows="5" name="customerFoodterAssets"
                           value={formState.customerFontend.customerFoodterAssets === undefined ? '' : formState.customerFontend.customerFoodterAssets}
                           onChange={handleChangeCustomerFontend}/>
                  </FormGroup>
                  <Button color="primary" type="submit">
                    {t('save')}
                  </Button>
                </Form>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </React.Fragment>
    );

}

SettingHome.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    detail: state.SettingReducer.setting,
    customerFontend: state.SettingReducer.customerFontend,
    generals: state.SettingReducer.generals,
    mailSettings: state.SettingReducer.mailSettings,
    country: state.CountryReducer.detail,
    encryption: state.SettingReducer.encryption
  };

};

const mapDispatchToProps = {
  getData: SettingActions.getSettingAction,
  getDataCountry: CountryActions.getCountryAction,
  getDataEncryption: SettingActions.getEncryptionAction,
  editSetting: SettingActions.editSettingAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingHome);
