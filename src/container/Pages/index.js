import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import NewTable from '../../components/New/Table';
import PropTypes from 'prop-types';
import { NewActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getPages: PropTypes.func,
  deletePages: PropTypes.func,
  getDetail: PropTypes.func
};

const Activity = ({ data, getPages, deletePages, getDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pagesID, setPagesID] = useState(null);

  useEffect(() => {
    getPages();
  }, [getPages]);

  const { t } = useTranslation();

  const openComfirm = () => {
    if (pagesID !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (pagesID !== null) {
      deletePages(pagesID);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/pages/pages/edit');
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('pages')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/pages/pages/create')}>
            {t('create')}
          </Button>
          <Button color="primary" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <NewTable data={data} getID={id => setPagesID(id)} getDetail={onGetDetail} />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
};

Activity.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.NewReducer.data };
};

const mapDispatchToProps = {
  getPages: NewActions.GetPages,
  deletePages: NewActions.DeletePages,
  getDetail: NewActions.getDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
