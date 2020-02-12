import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { SettingActions, StoreFontActions } from '../../store/actions';
import { CountryActions } from '../../store/actions';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { map } from 'lodash';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ModalMedia from '../../components/Media/ModalMedia';

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
  editSetting: PropTypes.func,
  data: PropTypes.object,
  dataGeneral: PropTypes.object,
  dataLogo: PropTypes.object,
  dataSociallink: PropTypes.object,
  getStoreFont: PropTypes.func,
  editStoreFontGeneral: PropTypes.func,
  editStoreFontLogo: PropTypes.func,
  editStoreFontSocialLink: PropTypes.func,
  imageSeletedata: PropTypes.object
};
let dataChange = {};
function SettingHome({
  getData,
  detail,
  customerFontend,
  generals,
  mailSettings,
  getDataCountry,
  country,
  getDataEncryption,
  encryption,
  editSetting,
  data,
  getStoreFont,
  editStoreFontGeneral,
  editStoreFontLogo,
  editStoreFontSocialLink,
  dataSociallink,
  dataGeneral,
  dataLogo,
  imageSeletedata
}) {
  const [StoreFontName, setStoreFontName] = useState('general');
  const [formState, setFormState] = useState({
    value: {},
    customerFontend: {},
    generals: {},
    mailSettings: {},
    country: [],
    encryption: {},
    touched: {}
  });
  const [formStateSF, setFormStateSF] = useState({
    values: {},
    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  dataChange = Object.assign(data, dataChange);
  const animatedComponents = makeAnimated();
  useEffect(() => {
    getData();
    getDataCountry();
    getDataEncryption();
  }, [getData, getDataCountry, getDataEncryption]);
  useEffect(() => {
    getStoreFont(StoreFontName);
  }, [getStoreFont, StoreFontName]);
  useEffect(() => {
    setFormStateSF(formStateSF => ({
      ...formStateSF,
      values: activeTab === '4' ? dataGeneral : activeTab === '5' ? dataLogo : activeTab === '6' ? dataSociallink : activeTab
    }));
  }, [dataGeneral, dataLogo, dataSociallink, activeTab]);

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      customerFontend: customerFontend,
      generals: generals,
      mailSettings: mailSettings,
      country: country,
      encryption: encryption
    }));
  }, [detail, country, encryption, customerFontend, generals, mailSettings]);

 
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
    if (tab === '4')
      setStoreFontName('general')
    if (tab === '5')
    setStoreFontName('logo')
      if( tab === '6')
      setStoreFontName('socialLink')
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
  const ckEditorChange = (event, data) => {
    setFormStateSF(formStateSF => ({
      ...formStateSF,
      footer_brief: '',
      values: {
        ...formStateSF.values,
        footer_brief: data
      },
      touched: {
        ...formStateSF.touched
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
    const idLocales = [];
    map(event, values => {
      idLocales.push({
        id: values.value,
        name: values.label
      });
      return {
        id: values.value,
        name: values.label
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
    const idCountries = [];
    map(event, values => {
      idCountries.push({
        id: values.value,
        name: values.label
      });
      return {
        id: values.value,
        name: values.label
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
  const handleChange = event => {
    event.persist();
    setFormState(formStateSF => ({
      ...formStateSF,
      values: {
        ...formStateSF.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
      },
      touched: {
        ...formStateSF.touched,
        [event.target.name]: true
      }
    }));
    if (event.target.name === 'name') {
      setFormState(formStateSF => ({
        ...formStateSF,
        values: {
          ...formStateSF.values,
          [event.target.name]: event.target.value
        },
        touched: {
          ...formStateSF.touched,
          [event.target.name]: true
        }
      }));
    }
  };
  const editStoreFontsGeneral = event => {
    event.preventDefault();
    editStoreFontGeneral(formStateSF.values);
  };
  const editStoreFontsLogo = event => {
    event.preventDefault();
    editStoreFontLogo(formStateSF.values);
  };
  const editStoreFontsSocialLink = event => {
    event.preventDefault();
    editStoreFontSocialLink(formStateSF.values);
  };
  const onSetStateHearderLogo = () => {
    setFormStateSF(formStateSF => ({
      ...formStateSF,
      values: {
        ...formStateSF.values,
        hearderLogo: imageSeletedata.url
      }
    }));
  };
  const onSetStateFavicon = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        favicon: imageSeletedata.url
      }
    }));
  };
  const onSetStateFooterLogo = () => {
    setFormStateSF(formStateSF => ({
      ...formStateSF,
      values: {
        ...formStateSF.values,
        footerLogo: imageSeletedata.url
      }
    }));
  };
  const onSetStateFooterBackground = () => {
    setFormStateSF(formStateSF => ({
      ...formStateSF,
      values: {
        ...formStateSF.values,
        footerBackground: imageSeletedata.url
      }
    }));
  };
  const onSubmit = event => {
    event.preventDefault();
    if (formState.generals) {
      const supportLocalesId = [];
      map(formState.generals.supportLocales, values => {
        supportLocalesId.push(values.id);
        return values;
      });

      const supportCountriesId = [];

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
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => {
                  toggle('4');
                }}
              >
                {' '}
                {t('storefont.footer')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '5' })}
                onClick={() => {
                  toggle('5');
                }}
              >
                {t('storefont.logo')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '6' })}
                onClick={() => {
                  toggle('6');
                }}
              >
                {t('storefont.sociallinks')}
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
                  <Label>{t('setting.countries_are_supported')}</Label>
                  {formState.country.length ? (
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={map(formState.generals.supportCountries, values => {
                        return {
                          value: values.id,
                          label: values.name
                        };
                      })}
                      name="supportCountries"
                      options={formState.country}
                      isMulti
                      onChange={handleChangeSupportCountries}
                    />
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label>{t('setting.location_supported')}</Label>
                  <Select
                    name="supportLocales"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    value={map(formState.generals.supportLocales, values => {
                      return {
                        value: !values.id ? '' : values.id,
                        label: !values.name ? '' : values.name
                      };
                    })}
                    options={formState.country}
                    isMulti
                    onChange={handleChangeSupportLocales}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{t('setting.default_location')}</Label>
                  <Input
                    type="select"
                    name="defaulCountries"
                    value={formState.generals.defaulCountries}
                    onChange={handleChangeGenerals}
                  >
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
                  <Label for="exampleName">{t('setting.mail_from_the_address')}</Label>
                  <Input
                    type="text"
                    name="mailFromAddress"
                    value={
                      formState.mailSettings.mailFromAddress === undefined ? '' : formState.mailSettings.mailFromAddress
                    }
                    onChange={handleChangeMail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('setting.letter_from_the_name')}</Label>
                  <Input
                    type="text"
                    name="mailFromName"
                    value={formState.mailSettings.mailFromName === undefined ? '' : formState.mailSettings.mailFromName}
                    onChange={handleChangeMail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('setting.mail_server')}</Label>
                  <Input
                    type="text"
                    name="mailPort"
                    value={formState.mailSettings.mailPort === undefined ? '' : formState.mailSettings.mailPort}
                    onChange={handleChangeMail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('setting.gate_mail')}</Label>
                  <Input
                    type="text"
                    name="mailHost"
                    value={formState.mailSettings.mailHost === undefined ? '' : formState.mailSettings.mailHost}
                    onChange={handleChangeMail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('setting.mail_username')}</Label>
                  <Input
                    type="text"
                    name="mailUsername"
                    value={formState.mailSettings.mailUsername === undefined ? '' : formState.mailSettings.mailUsername}
                    onChange={handleChangeMail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('setting.mail_password')}</Label>
                  <Input
                    type="text"
                    name="mailPassword"
                    value={formState.mailSettings.mailPassword === undefined ? '' : formState.mailSettings.mailPassword}
                    onChange={handleChangeMail}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('setting.encrypt_mail')}</Label>

                  <Input
                    type="select"
                    name="encryptions"
                    value={!formState.mailSettings.encryptions ? '' : formState.mailSettings.encryptions}
                    onChange={handleChangeMail}
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
                  <Label for="exampleName">{t('setting.header')}</Label>
                  <Input
                    type="textarea"
                    rows="5"
                    name="customerHeaderAssets"
                    value={
                      formState.customerFontend.customerHeaderAssets === undefined
                        ? ''
                        : formState.customerFontend.customerHeaderAssets
                    }
                    onChange={handleChangeCustomerFontend}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('setting.footer')}</Label>
                  <Input
                    type="textarea"
                    rows="5"
                    name="customerFoodterAssets"
                    value={
                      formState.customerFontend.customerFoodterAssets === undefined
                        ? ''
                        : formState.customerFontend.customerFoodterAssets
                    }
                    onChange={handleChangeCustomerFontend}
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="4">
              <Form className="p-3" onSubmit={editStoreFontsGeneral}>
                <FormGroup>
                  <Label>{t('storefont.footeraddress')}</Label>
                  <Input
                    type="text"
                    name="footer_address"
                    value={formStateSF.values === undefined ? '' : formStateSF.values.footer_address}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{t('storefont.footerbrief')}</Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={formStateSF.values.footer_brief === undefined ? '' : formStateSF.values.footer_brief}
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
            <TabPane tabId="5">
              <Form className="p-3" onSubmit={editStoreFontsLogo}>
                <FormGroup>
                  <Label for="favicon">{t('storefont.Favicon')}</Label>
                  <Row style={{ borderTop: '1px solid #ccc', width: '80%' }}>
                    <Col style={{ paddingTop: 40, paddingBottom: 40 }}>
                      <ModalMedia setState={onSetStateFavicon} />
                    </Col>
                    <Col>
                      <img
                        src={formStateSF.values.favicon === undefined ? '' : formStateSF.values.favicon}
                        style={{ width: '100px' }}
                        alt="Favicon"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="hearderLogo">{t('storefont.HeaderLogo')}</Label>
                  <Row style={{ borderTop: '1px solid #ccc', width: '80%' }}>
                    <Col style={{ paddingTop: 40, paddingBottom: 40 }}>
                      <ModalMedia setState={onSetStateHearderLogo} />
                    </Col>
                    <Col>
                      <img
                        src={formStateSF.values.hearderLogo === undefined ? '' : formStateSF.values.hearderLogo}
                        style={{ width: '100px' }}
                        alt="hearderLogo"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="footerLogo">{t('storefont.FooterLogo')}</Label>
                  <Row style={{ borderTop: '1px solid #ccc', width: '80%' }}>
                    <Col style={{ paddingTop: 40, paddingBottom: 40 }}>
                      <ModalMedia setState={onSetStateFooterLogo} />
                    </Col>
                    <Col>
                      <img
                        src={formStateSF.values.footerLogo === undefined ? '' : formStateSF.values.footerLogo}
                        style={{ width: '100px' }}
                        alt="FooterLogo"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="footerBackground">{t('storefont.FooterBackground')}</Label>
                  <Row style={{ borderTop: '1px solid #ccc', width: '80%' }}>
                    <Col style={{ paddingTop: 40, paddingBottom: 40 }}>
                      <ModalMedia setState={onSetStateFooterBackground} />
                    </Col>
                    <Col>
                      <img
                        src={formStateSF.values.footerBackground === undefined ? '' : formStateSF.values.footerBackground}
                        style={{ width: '100px' }}
                        alt="FooterBackground"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Button color="primary" type="submit">
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="6">
              <Form className="p-3" onSubmit={editStoreFontsSocialLink}>
                <FormGroup>
                  <Label for="facebook">{t('storefont.Facebook')}</Label>
                  <Input
                    type="text"
                    name="facebook"
                    value={formStateSF.values.facebook === undefined ? '' : formStateSF.values.facebook}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="twitter">{t('storefont.Twitter')}</Label>
                  <Input
                    type="text"
                    name="twitter"
                    value={formStateSF.values.twitter === undefined ? '' : formStateSF.values.twitter}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="instagram">{t('storefont.Instagram')}</Label>
                  <Input
                    type="text"
                    name="instagram"
                    value={formStateSF.values.instagram === undefined ? '' : formStateSF.values.instagram}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="linkedin">{t('storefont.Linkedin')}</Label>
                  <Input
                    type="text"
                    name="linkedin"
                    value={formStateSF.values.linkedin === undefined ? '' : formStateSF.values.linkedin}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="pinterest">{t('storefont.Pinterest')}</Label>
                  <Input
                    type="text"
                    name="pinterest"
                    value={formStateSF.values.pinterest === undefined ? '' : formStateSF.values.pinterest}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="googleplus">{t('storefont.GooglePlus')}</Label>
                  <Input
                    type="text"
                    name="googleplus"
                    value={formStateSF.values.googleplus === undefined ? '' : formStateSF.values.googleplus}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="youtube">{t('storefont.Youtube')}</Label>
                  <Input
                    type="text"
                    name="youtube"
                    value={formStateSF.values.youtube === undefined ? '' : formStateSF.values.youtube}
                    onChange={handleChange}
                  />
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
    encryption: state.SettingReducer.encryption,
    data: state.StoreFontReducer.dataStoreFont,
    dataGeneral: state.StoreFontReducer.dataStoreFontGeneral,
    dataLogo: state.StoreFontReducer.dataStoreFontLogo,
    dataSociallink: state.StoreFontReducer.dataStoreFontSociallink,
    imageSeletedata: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  getData: SettingActions.getSettingAction,
  getDataCountry: CountryActions.getCountryAction,
  getDataEncryption: SettingActions.getEncryptionAction,
  editSetting: SettingActions.editSettingAction,
  getStoreFont: StoreFontActions.getStoreFontAction,
  editStoreFontGeneral: StoreFontActions.editStoreFontGeneralAction,
  editStoreFontLogo: StoreFontActions.editStoreFontLogoAction,
  editStoreFontSocialLink: StoreFontActions.editStoreFontSocialLinkAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingHome);
