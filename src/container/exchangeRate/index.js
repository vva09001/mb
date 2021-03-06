import React, { useEffect, useState } from 'react';
import ExChangeRateTable from '../../components/exchangeRate/table';
import { Row, Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { ExChangeRateActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from '../../components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import useBulkSelect from '../../hooks/useBulkSelect';
import { map } from 'lodash';
import DatePicker from 'react-date-picker';

const PropsType = {
  data: PropTypes.array,
  getExChangeRates: PropTypes.func,
  deleteExChangeRates: PropTypes.func,
  getExChangeRatesDetail: PropTypes.func
};

function ListExchangeRate({ data, getExChangeRates, deleteExChangeRates, getExChangeRatesDetail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);

  useEffect(() => {
    getExChangeRates();
  }, [getExChangeRates]);
  const { t } = useTranslation();

  const exChangeRateIds = map(data, values => {
    return values.id;
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(exChangeRateIds);

  const onGetDetai = detail => {
    getExChangeRatesDetail(detail);
    history.push('exchangeRate/edit');
  };

  const openComfirm = () => {
    if (selectedItems !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (selectedItems !== null) {
      deleteExChangeRates(selectedItems);
      setIsOpen(!isOpen);
    }
  };
  const onChangedate = date => {
    setDate(date);
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('ExChangeRate.ExchangeRate')}</h4>
        </Row>
        <Row className="mb-2">
          <Col lg="5">
            <Button color="primary" className="mr-2" onClick={() => history.push('/exchangeRate/create')}>
              {t('create')}
            </Button>
            <Button color="danger" className="mr-2" onClick={openComfirm}>
              {t('delete')}
            </Button>
          </Col>
          <Col lg="7">
            <div>
              <DatePicker onChange={onChangedate} value={date} />
            </div>
          </Col>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <ExChangeRateTable
            data={data}
            getDetail={onGetDetai}
            isSelectedItem={isSelectedItem}
            isAllSelected={isAllSelected}
            toggleSelectedItem={toggleSelectedItem}
            toggleIsAllSelected={toggleIsAllSelected}
            isIndeterminate={isIndeterminate}
            date={date}
          />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

ListExchangeRate.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.ExChangeRateReducer.data };
};

const mapDispatchToProps = {
  getExChangeRates: ExChangeRateActions.GetExchangeRate,
  deleteExChangeRates: ExChangeRateActions.DeleteExchangeRate,
  getExChangeRatesDetail: ExChangeRateActions.GetDetailExChangeRate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListExchangeRate);
