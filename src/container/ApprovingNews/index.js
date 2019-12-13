import React, { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import AprrTable from '../../components/ApprovingNews/Table'
import PropTypes from 'prop-types';
import { NewActions } from '../../store/actions';
import PopupComfirm from '../../components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getNews: PropTypes.func,
  deleteNews: PropTypes.func,
  getDetail: PropTypes.func
};

const AprrNews = ({ data, getNews, deleteNews, getDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newsID, setNewsID] = useState(null);

  useEffect(() => {
    getNews();
  }, [getNews]);
   
  const onDelete = () => {
    if (newsID !== null) {
      deleteNews(newsID);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/news/approving');
  };

  return (
    <React.Fragment>
      <div>
        <Row style={{ background: '#fff' }} className="p-3">
          <AprrTable data={data} getID={id => setNewsID(id)} getDetail={onGetDetail} />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
};

AprrNews.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.NewReducer.data };
};

const mapDispatchToProps = {
  getNews: NewActions.GetNews,
  deleteNews: NewActions.DeleteNews,
  getDetail: NewActions.getDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AprrNews);
