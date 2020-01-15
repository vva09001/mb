import React, { useState } from 'react';
import { Row, Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { ExChangeRateActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';
import { map } from 'lodash';
import moment from 'moment';
import XLSX from 'xlsx';

const PropsType = {
  detaicurrency: PropTypes.array,
  detail: PropTypes.object,
  editExChangeRate: PropTypes.func
};

function ExChangeRateEdit({ detaicurrency, detail, editExChangeRate }) {
  const [formState, setFormState] = useState(detaicurrency);

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

  const onSubmit = () => {
    const body = {
      exchangeRateDetail: formState,
      date_update: detail.date_update
    };
    editExChangeRate(detail.id, body);
  };
  return (
    <React.Fragment>
      <div style={{ backgroundColor: 'white', height: 'auto' }}>
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
                value={moment(detail.date_update).format('DD/MM/YYYY')}
                style={{ width: 120 }}
              />
            </div>
          </Col>
          <Col>
            <div style={{ padding: 10 }}>
              <Button
                color={'success'}
                onClick={() => {
                  document.getElementById('exel').click();
                }}
              >
                {t('import Exel')}
              </Button>
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
                  <th scope="row">
                    {' '}
                    <Input
                      type="text"
                      name="currency"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.currency}
                    />
                  </th>
                  <td>
                    <Input
                      type="text"
                      name="buy_cash"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.buy_cash}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="buy_transfer"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.buy_transfer}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="sell"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.sell}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="change_USD"
                      onChange={event => {
                        handleChange(event, index);
                      }}
                      value={values.change_USD}
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
          <input type="file" onChange={handleChangeFile} style={{ padding: '10px', display: 'none' }} id="exel" />
        </div>
      </div>
    </React.Fragment>
  );
}

ExChangeRateEdit.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    data: state.ExChangeRateReducer.data,
    detaicurrency: state.ExChangeRateReducer.detailcurrency,
    detail: state.ExChangeRateReducer.detail
  };
};

const mapDispatchToProps = {
  editExChangeRate: ExChangeRateActions.EditExchangeRate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExChangeRateEdit);
