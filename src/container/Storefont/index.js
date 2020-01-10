import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { StoreFontActions } from '../../store/actions';
import classnames from 'classnames';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalMedia from '../../components/Media/ModalMedia';

const PropsType = {
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
function Storefont({
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
  dataChange = Object.assign(data, dataChange);
  useEffect(() => {
    getStoreFont(StoreFontName);
  }, [getStoreFont, StoreFontName]);
  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: activeTab === '1' ? dataGeneral : activeTab === '2' ? dataLogo : dataSociallink
    }));
  }, [dataGeneral, dataLogo, dataSociallink]);
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const [activeTab, setActiveTab] = useState('1');
  const { t } = useTranslation();
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
    tab === '1' ? setStoreFontName('general') : tab === '2' ? setStoreFontName('logo') : setStoreFontName('socialLink');
  };
  const ckEditorChange = (event, data) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values
      },
      touched: {
        ...formState.touched
      }
    }));
  };

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
    if (event.target.name === 'name') {
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]: event.target.value
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true
        }
      }));
    }
  };
  const editStoreFontsGeneral = event => {
    event.preventDefault();
    editStoreFontGeneral(formState.values);
  };
  const editStoreFontsLogo = event => {
    event.preventDefault();
    editStoreFontLogo(formState.values);
  };
  const editStoreFontsSocialLink = event => {
    event.preventDefault();
    editStoreFontSocialLink(formState.values);
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
  const onSetStateHearderLogo = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        hearderLogo: imageSeletedata.url
      }
    }));
  };
  const onSetStateFooterLogo = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        footerLogo: imageSeletedata.url
      }
    }));
  };
  const onSetStateFooterBackground = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        footerBackground: imageSeletedata.url
      }
    }));
  };
  console.log(formState.values)
  return (
    <React.Fragment>
      <h4>{t('storefont.title')}</h4>
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
                {' '}
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
                {t('storefont.logo')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  toggle('3');
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
              <NavLink>
                {activeTab === '1' ? t('general') : activeTab === '2' ? 'Logo' : t('storefont.sociallinks')}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form className="p-3" onSubmit={editStoreFontsGeneral}>
                <FormGroup>
                  <Label>{t('storefont.footeraddress')}</Label>
                  <Input
                    type="text"
                    name="footer_address"
                    value={formState.values.footer_address === undefined ? '' : formState.values.footer_address}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{t('storefont.footerbrief')}</Label>s
                  <CKEditor
                    editor={ClassicEditor}
                    data={formState.values.footer_brief == null ? '' : formState.values.footer_brief}
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
            <TabPane tabId="2">
              <Form className="p-3" onSubmit={editStoreFontsLogo}>
                <FormGroup>
                  <Label for="favicon">Favicon</Label>
                  <Row>
                    <img
                      src={formState.values.favicon === undefined ? '' : formState.values.favicon}
                      style={{ width: '100px' }}
                    />
                    <ModalMedia setState={onSetStateFavicon} />
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="hearderLogo">Header Logo</Label>
                  <Row>
                    <img
                      src={formState.values.hearderLogo === undefined ? '' : formState.values.hearderLogo}
                      style={{ width: '100px' }}
                    />
                    <ModalMedia setState={onSetStateHearderLogo} />
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="footerLogo">Footer Logo</Label>
                  <Row>
                    <img
                      src={formState.values.footerLogo === undefined ? '' : formState.values.footerLogo}
                      style={{ width: '100px' }}
                    />
                    <ModalMedia setState={onSetStateFooterLogo} />
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="footerBackground">Footer Background</Label>
                  <Row>
                    <img
                      src={formState.values.footerBackground === undefined ? '' : formState.values.footerBackground}
                      style={{ width: '100px' }}
                    />
                    <ModalMedia setState={onSetStateFooterBackground} />
                  </Row>
                </FormGroup>
                <Button color="primary" type="submit">
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="3">
              <Form className="p-3" onSubmit={editStoreFontsSocialLink}>
                <FormGroup>
                  <Label for="facebook">Facebook</Label>
                  <Input
                    type="text"
                    name="facebook"
                    value={formState.values.facebook === undefined ? '' : formState.values.facebook}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="twitter">Twitter</Label>
                  <Input
                    type="text"
                    name="twitter"
                    value={formState.values.twitter === undefined ? '' : formState.values.twitter}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="instagram">Instagram</Label>
                  <Input
                    type="text"
                    name="instagram"
                    value={formState.values.instagram === undefined ? '' : formState.values.instagram}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="linkedin">Linkedin</Label>
                  <Input
                    type="text"
                    name="linkedin"
                    value={formState.values.linkedin === undefined ? '' : formState.values.linkedin}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="pinterest">Pinterest</Label>
                  <Input
                    type="text"
                    name="pinterest"
                    value={formState.values.pinterest === undefined ? '' : formState.values.pinterest}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="googleplus">Google Plus</Label>
                  <Input
                    type="text"
                    name="googleplus"
                    value={formState.values.googleplus === undefined ? '' : formState.values.googleplus}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="youtube">Youtube</Label>
                  <Input
                    type="text"
                    name="youtube"
                    value={formState.values.youtube === undefined ? '' : formState.values.youtube}
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
Storefont.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    data: state.StoreFontReducer.dataStoreFont,
    dataGeneral: state.StoreFontReducer.dataStoreFontGeneral,
    dataLogo: state.StoreFontReducer.dataStoreFontLogo,
    dataSociallink: state.StoreFontReducer.dataStoreFontSociallink,
    imageSeletedata: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  getStoreFont: StoreFontActions.getStoreFontAction,
  editStoreFontGeneral: StoreFontActions.editStoreFontGeneralAction,
  editStoreFontLogo: StoreFontActions.editStoreFontLogoAction,
  editStoreFontSocialLink: StoreFontActions.editStoreFontSocialLinkAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Storefont);
