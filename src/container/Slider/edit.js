import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { SliderActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import history from 'helpers/history';
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'reactstrap';
import { useParams } from 'react-router-dom';

const PropsType = {
  sliderEdit: PropTypes.func,
  detail: PropTypes.object,
  getSliderId: PropTypes.func
};

function SliderCreate({ sliderEdit, detail, getSliderId }) {
  let { id } = useParams();

  useEffect(() => {
    getSliderId(id);
  }, [getSliderId, id]);

   useEffect(() => {
    setFormState(formState => ({
      ...formState,
     values: detail
     }));
  }, [detail]);

  const [formState, setFormState] = useState({
    values: {
      sliderSlides: [
      {
        sliderSlideTranslations:[]
      }]
    },

    touched: {}
  });

  const [fields, setFields] = useState([{}]);
  const [activeTab, setActiveTab] = useState('1');
  const [activeGroup, setActiveGroup] = useState('1');

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onSuccess = () => {
    Success('Sửa thành công');
    history.push('/slider');
  };

  const onFail = () => {
    Error('Sửa thất bại');
  };

  const handleChanges = event => {
    event.persist();

   if(event.target.id === 'caption'){
      setFormState(formState => ({
        ...formState,
        values: {
           ...formState.values,
          sliderSlides: [{
            ...formState.values.sliderSlides[0],
            sliderSlideTranslations : {
              ...formState.values.sliderSlides[0].sliderSlideTranslations,
              [event.target.name] : event.target.value
            }
          }]
        }
      }))
    }

    if(event.target.name === 'callToActionUrl'){
      setFormState(formState => ({
        ...formState,
        values: {
         ...formState.values,
          sliderSlides: [{
            ...formState.values.sliderSlides[0],
            [event.target.name] : event.target.value
          }]
        }
      }))
    }

    if(event.target.name === 'position'){
      setFormState(formState => ({
        ...formState,
        values: {
         ...formState.values,
          sliderSlides: [{
            ...formState.values.sliderSlides[0],
            [event.target.name] : event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
          }]
        }
      }))
    }

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
    if(event.target.name=== 'name'){
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          sliderTranslations: {
            [event.target.name] : event.target.value
          }

        }
      }))
    }

  };

  // function handleChange(i, event) {
  //   const values = [...fields];
  //   values[i].value = event.target.value;
  //   setFields(values);
  // }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
console.log(formState.values.sliderSlides);
  const sliderEdits = event => {
    event.preventDefault();
    sliderEdit(formState.values, onSuccess, onFail);
    console.log(sliderEdit(formState.values, onSuccess, onFail));
  };

  return (
    <React.Fragment>
      <Row>
        <h4> {t('slider.createslider')}</h4>
      </Row>
      <Row style={{ background: '#fff', padding: '15px 0' }}>
        <Col lg={3} md={4}>
          <Card>
            <p style={{ paddingTop: '10px' }}>{t('slider.inforslider')}</p>
            <ListGroup flush>
              <ListGroupItem
                action
                onClick={() => {
                  setActiveGroup(1);
                  // console.log(activeGroup);
                }}
              >
                {t('slider.slider')}
              </ListGroupItem>
              <ListGroupItem
                action
                onClick={() => {
                  setActiveGroup(2);
                  // console.log(activeGroup);
                }}
              >
                {t('slider.logo')}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={9} md={8}>
          <TabContent>
            {activeGroup === 1 && (
              <TabPane>
                <Nav tabs>
                  <p className="mb-2">{t('slider.slider')}</p>
                </Nav>
                <Row style={{ padding: '15px' }}>
                  {fields.map((field, idx) => {
                    return (
                      <div
                        key={`${field}-${idx}`}
                        style={{ border: '1px solid #e9e9e9', width: '100%', marginBottom: '15px' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            borderBottom: '1px solid #e9e9e9',
                            background: '#f6f6f7',
                            marginBottom: '10px',
                            padding: '5px'
                          }}
                        >
                          <Col lg={3} md={4}>
                            <span>{t('slider.sliderimg')}</span>
                          </Col>
                          <Col lg={9} md={4}>
                            <Button
                              type="button"
                              style={{ marginLeft: 'auto', float: 'right' }}
                              onClick={() => handleRemove(idx)}
                              close
                            >
                              x
                            </Button>
                          </Col>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                          <Col lg={3} md={4}>
                            <Input type="file" />
                          </Col>
                          <Col lg={9} md={8}>
                            <FormGroup>
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
                                <NavItem>
                                  <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => {
                                      toggle('2');
                                    }}
                                  >
                                    {t('seo')}
                                  </NavLink>
                                </NavItem>
                              </Nav>

                              <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                  <Form className="p-3" style={{ background: '#fff' }} onSubmit={sliderEdits}>
                                    <Row form>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label> {t('slider.caption1')}</Label>
                                          <Input
                                            type="text"
                                            name="caption1"
                                            // onChange={e => handleChange(idx, e)}
                                            value={formState.values.sliderSlides[0].sliderSlideTranslations.caption1 === undefined ? '' : formState.values.sliderSlides[0].sliderSlideTranslations.caption1}
                                            onChange={handleChanges}
                                            id="caption"
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label>{t('slider.caption2')}</Label>
                                          <Input
                                            type="text"
                                            name="caption2"
                                            value={formState.values.sliderSlides[0].sliderSlideTranslations.caption2 === undefined ? '' : formState.values.sliderSlides[0].sliderSlideTranslations.caption2}
                                            onChange={handleChanges}
                                            id="caption"
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label>{t('slider.caption3')}</Label>
                                          <Input
                                            type="text"
                                            name="caption3"
                                            value={formState.values.sliderSlides[0].sliderSlideTranslations.caption3 === undefined ? '' : formState.values.sliderSlides[0].sliderSlideTranslations.caption3}
                                            onChange={handleChanges}
                                            id="caption"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row form>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label>{t('slider.actiontext')}</Label>
                                          <Input
                                            type="text"
                                            name="callToActionText"
                                            value={formState.values.sliderSlides[0].sliderSlideTranslations.callToActionText === undefined ? '' : formState.values.sliderSlides[0].sliderSlideTranslations.callToActionText}
                                            onChange={handleChanges}
                                            id="caption"
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label>{t('slider.actionurl')}</Label>
                                          <Input
                                            type="text"
                                            name="callToActionUrl"
                                            value={formState.values.sliderSlides[0].callToActionUrl === undefined ? '' : formState.values.sliderSlides[0].callToActionUrl}
                                            onChange={handleChanges}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup style={{ marginTop: '40px' }}>
                                          <Input
                                            type="checkbox"
                                            name="position"
                                            checked={formState.values.sliderSlides[0].position === 1 ? true : false}
                                            onChange={handleChanges}
                                          />{' '}
                                          {t('slider.targetblank')}
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Button type="button" onClick={() => handleAdd()}>
                                      {t('slider.addslier')}
                                    </Button>
                                    <Button color="primary" style={{ marginLeft: '10px' }} type="submit">
                                      {t('save')}
                                    </Button>
                                  </Form>
                                </TabPane>
                                <TabPane tabId="2">
                                  <Form className="p-3" style={{ background: '#fff' }} onSubmit={sliderEdits}>
                                    <Row form>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="exampleEmail">{t('slider.caption1')}</Label>
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Input type="select" name="" />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row form>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="exampleEmail">{t('slider.delay')}</Label>
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Input type="number" name="" />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row form>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="exampleEmail">{t('slider.effect')}</Label>
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Input type="select" name="" />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Button type="button" onClick={() => handleAdd()}>
                                      {t('slider.addslier')}
                                    </Button>
                                    <Button color="primary" style={{ marginLeft: '10px' }} type="submit">
                                      {t('save')}
                                    </Button>
                                  </Form>
                                </TabPane>
                              </TabContent>
                            </FormGroup>
                          </Col>
                        </div>
                      </div>
                    );
                  })}

                </Row>
              </TabPane>
            )}
            {activeGroup === 2 && (
              <TabPane>
                <Nav tabs>
                  <NavItem>
                    <NavLink>
                      <h5>{t('slider.establish')}</h5>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Form className="p-3" style={{ background: '#fff' }} onSubmit={sliderEdits}>
                  <FormGroup style={{ display: 'flex' }}>
                    <Label for="exampleName" className="col-md-3">
                      {t('slider.name')}
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      className="col-md-9"
                      value = {formState.values.sliderTranslations.name}
                      onChange={handleChanges}
                    />
                  </FormGroup>
                  <FormGroup style={{ display: 'flex' }}>
                    <Label className="col-md-3">{t('slider.autoplay')}</Label>
                    <Input
                      type="checkbox"
                      name="autoPlay"
                      style={{ width: '18px', height: '18px' }}
                      checked={formState.values.autoPlay === 1 ? true : false}
                      onChange={handleChanges}
                    />
                    <Label style={{ marginLeft: '5px' }}>{t('slider.activatedplay')}</Label>
                  </FormGroup>
                  <FormGroup style={{ display: 'flex' }}>
                    <Label className="col-md-3">{t('slider.speedplay')}</Label>
                    <Input
                      type="number"
                      name="autoPlaySpeed"
                      className="col-md-9"
                      placeholder="3000ms"
                      value={formState.values.autoPlaySpeed}
                      onChange={handleChanges}
                    />
                  </FormGroup>
                  <FormGroup style={{ display: 'flex' }}>
                    <Label for="exampleName" className="col-md-3">
                      {t('slider.arrows')}
                    </Label>
                    <Input
                      type="checkbox"
                      name="arrows"
                      style={{ width: '18px', height: '18px' }}
                      checked={formState.values.arrows === 1 ? true : false}
                      onChange={handleChanges}
                    />
                    <Label style={{ marginLeft: '5px' }}>{t('slider.prev/next')}</Label>
                  </FormGroup>
                  <Button color="primary" type="submit">
                    {t('save')}
                  </Button>
                </Form>
              </TabPane>
            )}
            {/* kết thúc form logo */}
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
}

SliderCreate.propTypes = PropsType;

const mamapStateToProps = state => {
  return { detail: state.SilderReducer.detail };
};
const mamapDispatchToProps = {
  sliderEdit: SliderActions.editSliderAction,
  getSliderId: SliderActions.getSliderIdAction
};

export default connect(
  mamapStateToProps,
  mamapDispatchToProps
)(SliderCreate);
