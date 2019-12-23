import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';

const Proptype = {
  addMenuItem: Proptypes.func,
  detail: Proptypes.object
};

function CreateMenusItem({ addMenuItem, detail }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const { t } = useTranslation();
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
  };
  const onSubmit = event => {
    event.preventDefault();
    addMenuItem(formState.values);
    history.push('/menu/edit');
  };

  return (
    <React.Fragment>
      <Row style={{ background: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <Col lg={7} md={4}>
          <Form className="p-3" onSubmit={onSubmit}>
            <h4>Tạo Menu ITEM</h4>
            <FormGroup>
              <Label for="exampleName">{t('name')}</Label>
              <Input type="text" name="name" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Loại</Label>
              <Input type="select" name="category_news_id" id="exampleSelect" onChange={handleChange}>
                <option>Chọn...</option>
                <option value={1}>Page</option>
                <option value={2}>URL</option>
                <option value={3}>Catogory News</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Chờ API</Label>
              <Input type="select" name="category_news_id" id="exampleSelect" onChange={handleChange}>
                <option>Chọn...</option>
                <option value={1}>Chờ API</option>
                <option value={2}>Chờ API</option>
                <option value={3}>Chờ API</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <div className="check__box">
                <Label>{t('FluidMenu')}</Label>
                <div>
                  <Input type="checkbox" name="_Active" onChange={handleChange} />
                  <span>This is a full width menu</span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Target</Label>
              <Input type="select" name="category_news_id" id="exampleSelect" onChange={handleChange}>
                <option>Chọn...</option>
                <option value={1}>Same Tab</option>
                <option value={2}>New Tab</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Parent Menu Item</Label>
              <Input type="select" name="category_news_id" id="exampleSelect" onChange={handleChange}>
                <option>Select Parent</option>
                <option value={1}>Chờ API</option>
                <option value={2}>Chờ API</option>
                <option value={3}>Chờ API</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <div className="check__box">
                <Label>{t('status')}</Label>
                <div>
                  <Input type="checkbox" name="_Active" onChange={handleChange} />
                  <span>Enable the menu item</span>
                </div>
              </div>
            </FormGroup>
            <Button color="primary" type="submit">
              {t('save')}
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

CreateMenusItem.propTypes = Proptype;

const mapDispatchToProps = {
  addMenu: MenuActions.AddMenus
};

export default connect(
  null,
  mapDispatchToProps
)(CreateMenusItem);
