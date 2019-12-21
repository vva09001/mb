import React, { useState } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MenuActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';

const Proptype = {
  editMenu: Proptypes.func,
  data: Proptypes.object
};

function EditMenus({ editMenu, data }) {
  const [formState, setFormState] = useState({
    values: data,
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
    editMenu(formState.values);
    history.push('/menu/edit');
  };

  return (
    <React.Fragment>
      <h4> {t('Menu')}</h4>
      <Row className="category__wapper">
        <Col lg={7} md={4}>
          <div>
            <Button
              color="primary"
              onClick={() => {
                history.push('/menu/edit/item');
              }}
            >
              {t('create')}
            </Button>
          </div>
          <div>
            <Alert color="primary">Dang cho API</Alert>
          </div>
        </Col>
        <Col lg={5} md={4}>
          <div>
            <Form className="cetegoryFrom" onSubmit={onSubmit}>
              <h4>Tạo Menu</h4>
              <FormGroup>
                <Label for="exampleName">{t('name')}</Label>
                <Input type="text" name="name" value={formState.values.name} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <div className="check__box">
                  <Label>{t('status')}</Label>
                  <div>
                    <Input type="checkbox" name="_Active" onChange={handleChange} />
                    <span>{t('active')}</span>
                  </div>
                </div>
              </FormGroup>
              <Button color="primary" type="submit">
                {t('save')}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

EditMenus.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    data: state.MenuReducer.detail
  };
};

const mapDispatchToProps = {
  editMenu: MenuActions.EditMenus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMenus);
