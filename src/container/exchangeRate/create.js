import React, { useState } from 'react';
import { Row, Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { ExChangeRateActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Table, Input, Form } from 'reactstrap';
import { map } from 'lodash';
import moment from 'moment';
import XLSX from 'xlsx';
import Download from '../../components/exchangeRate/downloadExcel';
import { useForm } from 'react-hook-form';
import { Error } from 'helpers/notify';

const PropsType = {
  data: PropTypes.array,
  getExChangeRates: PropTypes.func,
  deleteExChangeRates: PropTypes.func,
  getExChangeRatesDetail: PropTypes.func,
  creatExchangeRate: PropTypes.func
};

function ExChangeRateCreate({ creatExchangeRate }) {
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
  const { register, errors, triggerValidation, handleSubmit } = useForm();
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
  };

  const handleChangeFile = e => {
    let reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = function(e) {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setFormState(data);
    };
    if (rABS) {
      reader.readAsBinaryString(e.target.files[0]);
    } else {
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const handleError = async () => {
    var currency = await triggerValidation('currency');
    var buy_cash = await triggerValidation('buy_cash');
    var buy_transfer = await triggerValidation('buy_transfer');
    var sell = await triggerValidation('sell');
    var change_USD = await triggerValidation('change_USD');

    if (currency === false || buy_cash === false || buy_transfer === false || sell === false || change_USD === false) {
      Error(t('errors.create'));
    }
  };
  const onSubmit = () => {
    const body = {
      exchangeRateDetail: formState,
      date_update: date
    };
    creatExchangeRate(body);
  };
  const date = new Date();
  return (
    <React.Fragment>
      <Form style={{ backgroundColor: 'white', height: 'auto' }} onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs="5">
            <div style={{ padding: 10 }}>
              <Button color={'primary'} onClick={addNewCurrency}>
                {t('ExChangeRate.AddNewCurrency')}
              </Button>
            </div>
          </Col>
          <Col>
            <div style={{ padding: 10, paddingLeft: 30 }}>
              <Input
                type="text"
                name="buy_transfer"
                disabled
                value={moment(date).format('DD/MM/YYYY')}
                style={{ width: 120 }}
              />
            </div>
          </Col>
          <Col>
            <div style={{ padding: 10 }}>
              <Button
                color={'primary'}
                onClick={() => {
                  document.getElementById('exel').click();
                }}
              >
                {t('import Exel')}
              </Button>
            </div>
          </Col>
          <Col>
            <div style={{ padding: 10 }}>
              <Download />
            </div>
          </Col>
        </Row>
        <Table bordered>
          <thead className="bg-primary text-white">
            <tr>
              <th>{t('ExChangeRate.currency')}</th>
              <th>{t('ExChangeRate.buy_cash')}</th>
              <th>{t('ExChangeRate.buy_transfer')}</th>
              <th>{t('ExChangeRate.sell')}</th>
              <th>{t('ExChangeRate.change_USD')}</th>
            </tr>
          </thead>
          <tbody>
            {formState.map((values, index) => {
              return (
                <tr key={index}>
                  <td scope="row">
                    {' '}
                    <input
                      type="text"
                      name="currency"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.currency}
                      ref={register({
                        required: true,
                      })}
                      className={errors.currency === undefined ? 'inputStyle' : 'inputStyleError'}
                    />
                    {errors.currency && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="buy_cash"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.buy_cash}
                      ref={register({
                        required: true
                      })}
                      className={errors.buy_cash === undefined ? 'inputStyle' : 'inputStyleError'}
                    />
                    {errors.buy_cash && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="buy_transfer"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.buy_transfer}
                      ref={register({
                        required: true
                      })}
                      className={errors.buy_transfer === undefined ? 'inputStyle' : 'inputStyleError'}
                    />
                    {errors.buy_transfer && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="sell"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.sell}
                      ref={register({
                        required: true
                      })}
                      className={errors.sell === undefined ? 'inputStyle' : 'inputStyleError'}
                    />
                    {errors.sell && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="change_USD"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.change_USD}
                      ref={register({
                        required: true
                      })}
                      className={errors.change_USD === undefined ? 'inputStyle' : 'inputStyleError'}
                    />
                    {errors.change_USD && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div style={{ padding: 10 }}>
          <Button color={'primary'} type="submit" onClick={handleError}>
            {t('save')}
          </Button>
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleChangeFile}
            style={{ padding: '10px', display: 'none' }}
            id="exel"
          />
        </div>
      </Form>
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
