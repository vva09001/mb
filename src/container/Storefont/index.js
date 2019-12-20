import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useTranslation } from 'react-i18next';

function Storefont() {
  const [setFormState] = useState({
    values: {},
    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
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
                  <Label>{t('storefont.footeraddress')}</Label>
                  <Input type="text" name="name" />
                </FormGroup>
                <FormGroup>
                  <Label>{t('storefont.footerbrief')}</Label>
                  <CKEditor
                    editor={ClassicEditor}
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
              <Form className="p-3">
                <FormGroup>
                  <Label for="exampleName">Favicon</Label>
                  <Input type="file" name="name" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Header Logo</Label>
                  <Input type="file" name="ten" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Footer Logo</Label>
                  <Input type="file" name="tuoi" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Footer Background</Label>
                  <Input type="file" name="tuoi" />
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
export default Storefont;
