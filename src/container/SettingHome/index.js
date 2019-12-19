import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';

// const PropsType = {
//   SettingHome: PropTypes.func
// };

function SettingHome({ settingHome }) {
  // const [formState, setFormState] = useState({
  //   values: {},
  //   touched: {}
  // });
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
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
              <Form className="p-3">
                <FormGroup>
                  <Label>Các nước được hỗ trợ</Label>
                  <Input type="text" name="name" />
                </FormGroup>
                <FormGroup>
                  <Label>Địa điểm được hỗ trợ</Label>
                  <Input type="text" name="ten" />
                </FormGroup>
                <FormGroup>
                  <Label>Địa điểm mặc định</Label>
                  <Input type="text" name="tuoi" />
                </FormGroup>
                <Button color="primary" type="submit">
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Form className="p-3">
                <FormGroup>
                  <Label for="exampleName">Thư từ địa chỉ</Label>
                  <Input type="text" name="name" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Thư từ tên</Label>
                  <Input type="text" name="ten" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Máy chủ thư</Label>
                  <Input type="text" name="tuoi" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Cổng thư</Label>
                  <Input type="text" name="tuoi" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Tên người dùng thư</Label>
                  <Input type="text" name="tuoi" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Mail Password</Label>
                  <Input type="text" name="tuoi" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Mã hóa thư</Label>
                  <Input type="text" name="tuoi" />
                </FormGroup>
                <Button color="primary" type="submit">
                  {t('save')}
                </Button>
              </Form>
            </TabPane>
            <TabPane tabId="3">
              <Form className="p-3">
                <FormGroup>
                  <Label for="exampleName">Header</Label>
                  <Input type="textarea" rows="5" name="name" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Footer</Label>
                  <Input type="textarea" rows="5" name="ten" />
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
export default SettingHome;
