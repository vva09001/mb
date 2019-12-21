import React, { useState } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';

const Proptype = {
  addMenu: Proptypes.func
};

function CreateMenus({ addMenu }) {
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

    const body = {
      ...formState.values,
      menuTranslations: {
        name: formState.values.name
      }
    };
    console.log(body);

    addMenu(body);
  };

  return (
    <React.Fragment>
      <h4> {t('Menu')}</h4>
      <Row className="category__wapper">
        <Col lg={7} md={4}>
          <div>
            <Alert color="primary">Vui lòng lưu menu trước khi thêm các mục menu</Alert>
          </div>
        </Col>
        <Col lg={5} md={4}>
          <div>
            <Form className="cetegoryFrom" onSubmit={onSubmit}>
              <h4>Tạo Menu</h4>
              <FormGroup>
                <Label for="exampleName">{t('name')}</Label>
                <Input type="text" name="name" onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <div className="check__box">
                  <Label>{t('status')}</Label>
                  <div>
                    <Input type="checkbox" name="idActive" onChange={handleChange} />
                    <span>{t('active')}</span>
                  </div>
                </div>
              </FormGroup>
              <Button color="primary" type="submit">
                {t('create')}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

CreateMenus.propTypes = Proptype;

const mapDispatchToProps = {
  addMenu: MenuActions.AddMenus
};

export default connect(
  null,
  mapDispatchToProps
)(CreateMenus);
