import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import NewTable from '../../components/New/Table';
import PropTypes from 'prop-types';
import { BlockActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getBlock: PropTypes.func,
  deleteBlock: PropTypes.func,
  getDetail: PropTypes.func
};

function Block({ data, getBlock, deleteBlock, getDetail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newsID, setNewsID] = useState(null);

  useEffect(() => {
    getBlock();
  }, [getBlock]);
  const { t } = useTranslation();

  const openComfirm = () => {
    if (newsID !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (newsID !== null) {
      deleteBlock(newsID);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/news/edit');
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('block_page.title')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/pages/block/create')}>
            {t('create')}
          </Button>
          <Button color="danger" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <NewTable data={data} getID={id => setNewsID(id)} getDetail={onGetDetail} />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

Block.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.BlockReducer.listBlocks };
};

const mapDispatchToProps = {
  getBlock: BlockActions.getBlockAction,
  deleteBlock: BlockActions.deleteBlockAction,
  getDetail: BlockActions.getBlockDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block);
