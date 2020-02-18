import React, { useEffect, useState } from 'react';
import { Row, Input } from 'reactstrap';
import AprrTablePage from '../../../components/ApprovingNews/Table/Page';
import PropTypes from 'prop-types';
import { PageActions } from '../../../store/actions';
import PopupComfirm from '../../../components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const PropsType = {
  data: PropTypes.object,
  getPages: PropTypes.func,
  deletePages: PropTypes.func,
  getDetail: PropTypes.func,
  apprPages: PropTypes.func
};

function AprrPages({ data, getPages, deletePages, getDetail, apprPages }) {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [newsID, setNewsID] = useState(null);
  const [record, setRecord] = useState(10);

  const { t } = useTranslation();

  useEffect(() => {
    getPages(page, record);
  }, [getPages, page, record]);

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
          <div style={{ background: '#fff' }} className="d-flex flex-row  mb-3 align-items-center">
            <Input
              type="number"
              name="record"
              value={record}
              style={{ width: '80px', marginRight: 10 }}
              onChange={e => {
                setRecord(e.target.value);
              }}
            />
            <h5>{t('record')}</h5>
          </div>
          <AprrTablePage
            data={data.pages}
            size={data.size}
            setPage={setPage}
            getID={id => setNewsID(id)}
            getDetail={onGetDetail}
            apprPages={apprPages}
          />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

AprrPages.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.PageReducer.PagePagination };
};

const mapDispatchToProps = {
  getPages: PageActions.GetPagePagination,
  deletePages: PageActions.DeletePages,
  getDetail: PageActions.getDetailPages,
  apprPages: PageActions.apprPages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AprrPages);
