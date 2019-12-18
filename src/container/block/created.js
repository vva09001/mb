import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { NewActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  newsCreate: PropTypes.func
};

function BlockCreate({ newsCreate }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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

  const createdNews = event => {
    event.preventDefault();
    newsCreate(formState.values);
  };

  return (
    <React.Fragment>
      <Row style={{ background: '#fff', padding: '15px 0' }}>
        <Col>
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={createdNews}>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <h4>{t('create')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('name')}</Label>
                  <Input type="text" name="name" id="exampleName" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">{t('category')}</Label>
                  <Input type="select" name="category_news_id" id="exampleSelect" onChange={handleChange}>
                    <option>Chọn...</option>
                    <option value={1}>Tin tức</option>
                    <option value={2}>Doanh nghiệp</option>
                    <option value={3}>Hoạt động</option>
                  </Input>
                </FormGroup>
              </TabPane>
              <TabPane tabId="2">
                <h4>{t('seo')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('meta.title')}</Label>
                  <Input type="text" name="meta_title" onChange={handleChange} />
                </FormGroup>
              </TabPane>
            </TabContent>
            <Button color="primary" type="submit">
              {t('save')}
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

BlockCreate.propTypes = PropsType;

const mamapDispatchToProps = {
  newsCreate: NewActions.AddNews
};

export default connect(
  null,
  mamapDispatchToProps
)(BlockCreate);
