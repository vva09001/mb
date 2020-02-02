import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import AprrTable from '../../components/ApprovingNews/Table';
import AprrTablePage from '../../components/ApprovingNews/Table/Page';
import PropTypes from 'prop-types';
import { GroupActions, NewActions, PageActions } from '../../store/actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PropsType = {
  data: PropTypes.array,
  getGroup: PropTypes.func,
  deleteNews: PropTypes.func,
  getDetail: PropTypes.func,
  AprrNew: PropTypes.func,
  listNews: PropTypes.array,
  listPages: PropTypes.array,
  apprPages: PropTypes.func
};

function ApprDashboard({ getGroup, AprrNew, listNews, listPages, apprPages }) {
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    getGroup(id);
  }, [getGroup, id]);

  return (
    <React.Fragment>
      <div>
        <Row style={{ background: '#fff' }} className="p-3">
          <Col>
            <h4>{t('menu.news')}</h4>
            <AprrTable data={listNews} apprNews={AprrNew} />
          </Col>
          <Col>
            <h4>{t('menu.page')}</h4>
            <AprrTablePage data={listPages} apprPages={apprPages} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

ApprDashboard.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    listNews: state.GroupReducer.listNews,
    listPages: state.GroupReducer.listPages
  };
};

const mapDispatchToProps = {
  getGroup: GroupActions.getGroupByIDAction,
  AprrNew: NewActions.AprrNew,
  apprPages: PageActions.apprPages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprDashboard);
