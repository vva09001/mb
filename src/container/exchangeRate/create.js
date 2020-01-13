import React, { useEffect, useState } from 'react';
import ExChangeRateTable from '../../components/exchangeRate/table';
import { Row, Button, Label, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { ExChangeRateActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from '../../components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';
import { map, filter } from 'lodash';
import Moment from 'react-moment';
import moment from 'moment';

const PropsType = {
  data: PropTypes.array,
  getExChangeRates: PropTypes.func,
  deleteExChangeRates: PropTypes.func,
  getExChangeRatesDetail: PropTypes.func,
  creatExchangeRate: PropTypes.func
};

function ExChangeRateCreate({creatExchangeRate}) {
  const [formState, setFormState] = useState([
    {
      currency: '',
      buy_cash: '',
      buy_transfer: '',
      sell: '',
      change_USD: ''
    }
  ]);
  const { t } = useTranslation();

  const addNewCurrency = () => {
    setFormState([...formState, { currency: '', buy_cash: '', buy_transfer: '', sell: '', change_USD: '' }]);
  };
  const handleChange = (event, index) => {
    event.persist();
    let newValues = map(formState, (values, indexs) => {
      if (index !== indexs) {
        return values;
      } else {
        return {
          ...values,
          [event.target.name]: event.target.value
        };
      }
    });
    setFormState(newValues);
    console.log(formState);
  };
  
  const onSubmit = () =>{
    const body = {
      exchangeRateDetail: formState
    };
    console.log(body)
  }
  const date = new Date();
  return (
    <React.Fragment>
      <div style={{ backgroundColor: 'white', height: 'auto' }}>
        <Row>
          <Col xs="5">
            <div style={{ padding: 10 }}>
              <Button color={'primary'} onClick={addNewCurrency}>
                {t('AddNewCurrency')}
              </Button>
            </div>
          </Col>
          <Col>
            <div style={{ padding: 10, paddingLeft:30 }}>
              <Input
                type="text"
                name="buy_transfer"
                disabled
                value={moment(date).format('DD/MM/YYYY')}
                style={{ width: 120 }}
              />
            </div>
          </Col>
        </Row>
        <Table bordered>
          <thead className="bg-primary text-white">
            <tr>
              <th>{t('currency')}</th>
              <th>{t('buy_cash')}</th>
              <th>{t('buy_transfer')}</th>
              <th>{t('sell')}</th>
              <th>{t('change_USD')}</th>
            </tr>
          </thead>
          <tbody>
            {formState.map((values, index) => {
              return (
                <tr key={index}>
                  <th scope="row">
                    {' '}
                    <Input
                      type="text"
                      name="currency"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                    />
                  </th>
                  <td>
                    <Input
                      type="text"
                      name="buy_cash"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="buy_transfer"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="sell"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="change_USD"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div style={{ padding: 10 }}>
          <Button color={'success'} onClick={onSubmit}>
            {t('save')}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

ExChangeRateCreate.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.ExChangeRateReducer.data };
};

const mapDispatchToProps = {
  getExChangeRates: ExChangeRateActions.GetExchangeRate,
  deleteExChangeRates: ExChangeRateActions.DeleteExchangeRate,
  // getExChangeRatesDetail: ExChangeRateActions.getDetail
  creatExchangeRate: ExChangeRateActions.CreateExchangeRate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExChangeRateCreate);
