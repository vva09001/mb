import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import AprrTablePage from '../../../components/ApprovingNews/Table/Page';
import PropTypes from 'prop-types';
import { PageActions } from '../../../store/actions';
import PopupComfirm from '../../../components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const PropsType = {
  data: PropTypes.array,
  getPages: PropTypes.func,
  deletePages: PropTypes.func,
  getDetail: PropTypes.func,
  apprPages: PropTypes.func
};

function AprrPages({ data, getPages, deletePages, getDetail, apprPages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newsID, setNewsID] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    getPages();
  }, [getPages]);

  const onDelete = () => {
    if (newsID !== null) {
      deletePages(newsID);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/pages/approved');
  };

  return (
    <React.Fragment>
      <h4>{t('approved.approved_page')}</h4>
      <div>
        <Row style={{ background: '#fff' }} className="p-3">
          <AprrTablePage data={data} getID={id => setNewsID(id)} getDetail={onGetDetail} apprPages ={apprPages} />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

AprrPages.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.PageReducer.data };
};

const mapDispatchToProps = {
  getPages: PageActions.GetAllPages,
  deletePages: PageActions.DeletePages,
  getDetail: PageActions.getDetailPages,
  apprPages: PageActions.apprPages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AprrPages);
