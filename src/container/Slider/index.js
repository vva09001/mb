import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import SliderTable from '../../components/Slider/Table';
import PropTypes from 'prop-types';
import { SliderActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getSilder: PropTypes.func,
  deleteSilder: PropTypes.func,
  getDetail: PropTypes.func
};

const Slider = ({ data, getSilder, deleteSilder, getDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderID, setSliderID] = useState(null);

  useEffect(() => {
    getSilder();
  }, [getSilder]);
  const { t } = useTranslation();

  const openComfirm = () => {
    if (sliderID !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/slider/edit');
  };

  const onDelete = () => {
    if (sliderID !== null) {
      deleteSilder(sliderID);
      setIsOpen(!isOpen);
    }
  };



  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('slider.slider')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/slider/create')}>
            {t('create')}
          </Button>
          <Button color="danger" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <SliderTable data={data} getID={id => setSliderID(id)} getDetail={onGetDetail} />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
};

Slider.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.SilderReducer.data };
};

const mapDispatchToProps = {
  getSilder: SliderActions.getSliderAction,
  deleteSilder: SliderActions.deleteSliderAction,
  getDetail: SliderActions.getDetailSliderAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);
