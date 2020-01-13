import React, { useEffect} from 'react';
import ExChangeRateTable from '../../components/exchangeRate/table';
import { Row, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { ExChangeRateActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
// import PopupComfirm from '../../components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getExChangeRates: PropTypes.func,
  deleteExChangeRates: PropTypes.func,
  getExChangeRatesDetail: PropTypes.func
};

function ListExchangeRate({ data, getExChangeRates, deleteExChangeRates, getCategory, getExChangeRatesDetail }) {
  // const [isOpen, setIsOpen] = useState(false);
  //   const [newsID, setNewsID] = useState(null);
    useEffect(() => {
      getExChangeRates();
    }, [getExChangeRates]);
  const { t } = useTranslation();

  const onGetDetai = (detail) => {
    getExChangeRatesDetail(detail);
    history.push('exchangeRate/edit')
  }

  //   const openComfirm = () => {
  //     if (newsID !== null) {
  //       setIsOpen(!isOpen);
  //     }
  //   };

  //   const onDelete = () => {
  //     if (newsID !== null) {
  //       deleteNews(newsID);
  //       setIsOpen(!isOpen);
  //     }
  //   };

 

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('news')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/exchangeRate/create')}>
            {t('create')}
          </Button>
          <Button color="danger" className="mr-2" onClick={() => history.push('/news/create')}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <ExChangeRateTable data={data} getDetail={onGetDetai} />
        </Row>
      </div>
      {/* <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} /> */}
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
