import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import NewTable from '../../components/New/Table';
import PropTypes from 'prop-types';
import { NewActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from '../../components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import useBulkSelect from '../../hooks/useBulkSelect';
import { map } from 'lodash';

const PropsType = {
  data: PropTypes.array,
  getNews: PropTypes.func,
  deleteNews: PropTypes.func,
  getDetail: PropTypes.func
};

function Activity({ data, getNews, deleteNews, getDetail }) {
  const [isOpen, setIsOpen] = useState(false);

  const NewIds = map(data, values => {
    return values.newsId;
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(NewIds);

  useEffect(() => {
    getNews();
  }, [getNews]);
  const { t } = useTranslation();

  const openComfirm = () => {
    if (selectedItems !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (selectedItems !== null) {
      deleteNews(selectedItems);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('news')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/news/create')}>
            {t('create')}
          </Button>
          <Button color="danger" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <NewTable
            data={data}
            getDetail={onGetDetail}
            isSelectedItem={isSelectedItem}
            isAllSelected={isAllSelected}
            toggleSelectedItem={toggleSelectedItem}
            toggleIsAllSelected={toggleIsAllSelected}
            isIndeterminate={isIndeterminate}
          />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

Activity.propTypes = PropsType;

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
)(Activity);
