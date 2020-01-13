import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import TagTable from '../../components/tags/Table';
import PropTypes from 'prop-types';
import { TagActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getTags: PropTypes.func,
  deleteTags: PropTypes.func,
  getDetail: PropTypes.func
};

function Tags({ data, getTags, deleteTags, getDetail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newsID, setTagsID] = useState(null);

  useEffect(() => {
    getTags();
  }, [getTags]);
  const { t } = useTranslation();

  const openComfirm = () => {
    if (newsID !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (newsID !== null) {
      deleteTags(newsID);
      setIsOpen(!isOpen);
    }
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('tags')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/pages/tags/create')}>
            {t('create')}
          </Button>
          <Button color="danger" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <TagTable data={data} getID={id => setTagsID(id)} />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

Tags.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.TagReducer.listTags };
};

const mapDispatchToProps = {
  getTags: TagActions.getTagAction,
  deleteTags: TagActions.deleteTagAction,
  getDetail: TagActions.getDetailTagAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);
