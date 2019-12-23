import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { NewActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'reactstrap';
import { map } from 'lodash';
const PropsType = {
  sliderCreate: PropTypes.func
};

function SliderCreate({ sliderCreate }) {
  // const [formState] = useState({
  //   values: {},
  //   touched: {}
  // });

  const [fields, setFields] = useState([{}]);
  const [activeTab, setActiveTab] = useState('1');
  const [activeGroup, setActiveGroup] = useState('1');

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const sliderCreates = event => {
    event.preventDefault();
    console.log(fields);
    // sliderCreate(formState.values, onSuccess, onFail);
  };
  /*{add slider}*/

  function handleChange(i, event) {
    let newFormAddMore = map(fields, (values, id) => {
      if (i !== id) {
        return values;
      } else {
        return {
          ...values,
          [event.target.name]:
            event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
        };
      }
    });
    setFields(newFormAddMore);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({});
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

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
                }}
              >
                {t('slider.slider')}
              </ListGroupItem>
              <ListGroupItem
                action
                onClick={() => {
                  setActiveGroup(2);
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
                                  <Form>
                                    <Row form>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="exampleEmail"> {t('slider.caption1')}</Label>
                                          <Input type="text" name="caption1" onChange={e => handleChange(idx, e)} />
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="examplePassword">{t('slider.caption2')}</Label>
                                          <Input type="text" name="caption2" onChange={e => handleChange(idx, e)} />
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="exampleEmail">{t('slider.caption3')}</Label>
                                          <Input type="text" name="caption3" onChange={e => handleChange(idx, e)} />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row form>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="exampleEmail">{t('slider.actiontext')}</Label>
                                          <Input
                                            type="text"
                                            name="calltoactiontext"
                                            onChange={e => handleChange(idx, e)}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="examplePassword">{t('slider.actionurl')}</Label>
                                          <Input
                                            type="text"
                                            name="urlVideoYoutobe"
                                            onChange={e => handleChange(idx, e)}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}>
                                        <FormGroup style={{ marginTop: '40px' }}>
                                          <Input type="checkbox" name="email" onChange={e => handleChange(idx, e)} />
                                          {t('slider.targetblank')}
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </Form>
                                </TabPane>
                                <TabPane tabId="2">
                                  <Form>
                                    <Row form>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Label for="exampleEmail">{t('slider.caption1')}</Label>
                                        </FormGroup>
                                      </Col>
                                      <Col md={4}> </Col>
                                      <Col md={4}>
                                        <FormGroup>
                                          <Input type="select" name="email" onChange={e => handleChange(idx, e)} />
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
                                          <Input type="number" name="email" onChange={e => handleChange(idx, e)} />
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
                                          <Input type="select" name="email" onChange={e => handleChange(idx, e)} />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </Form>
                                </TabPane>
                              </TabContent>
                            </FormGroup>
                          </Col>
                        </div>
                      </div>
                    );
                  })}
                  <Button type="button" onClick={() => handleAdd()}>
                    {t('slider.addslier')}
                  </Button>
                  <Button color="primary" style={{ marginLeft: '10px' }} type="submit">
                    {t('save')}
                  </Button>
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
                <Form className="p-3" style={{ background: '#fff' }} onSubmit={sliderCreates}>
                  <FormGroup style={{ display: 'flex' }}>
                    <Label for="exampleName" className="col-md-3">
                      {t('slider.name')}
                    </Label>
                    <Input type="text" name="name" className="col-md-9" />
                  </FormGroup>
                  <FormGroup style={{ display: 'flex' }}>
                    <Label className="col-md-3">{t('slider.autoplay')}</Label>
                    <Input type="checkbox" name="autoPlay" style={{ width: '18px', height: '18px' }} />
                    <Label style={{ marginLeft: '5px' }}>{t('slider.activatedplay')}</Label>
                  </FormGroup>
                  <FormGroup style={{ display: 'flex' }}>
                    <Label className="col-md-3">{t('slider.speedplay')}</Label>
                    <Input type="number" name="autoPlaySpeed" className="col-md-9" placeholder="3000ms" />
                  </FormGroup>
                  <FormGroup style={{ display: 'flex' }}>
                    <Label for="exampleName" className="col-md-3">
                      {t('slider.arrows')}
                    </Label>
                    <Input type="checkbox" name="arrows" style={{ width: '18px', height: '18px' }} />{' '}
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

const mamapDispatchToProps = {
  sliderCreate: NewActions.AddNews
};

export default connect(
  null,
  mamapDispatchToProps
)(SliderCreate);
