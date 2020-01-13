import React, { useState, useEffect } from 'react';
import { Row, Button } from 'reactstrap';
import history from 'helpers/history';
import GroupTable from 'components/group/table';
import PopupComfirm from 'components/common/PopupComfirm';
import { useTranslation } from 'react-i18next';
import { GroupActions } from '../../store/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getGroup: PropTypes.func,
  deleteGroup: PropTypes.func
};

function Group({ data, getGroup, deleteGroup }) {
  const [isOpen, setIsOpen] = useState(false);
  const [groupID, setGroupID] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  const openComfirm = () => {
    if (groupID !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (groupID !== null) {
      deleteGroup(groupID);
      setIsOpen(!isOpen);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <h4>{t('group.title')}</h4>
      </Row>
      <Row className="mb-2">
        <Button color="primary" className="mr-2" onClick={() => history.push('/group/create')}>
          {t('create')}
        </Button>
        <Button color="danger" className="mr-2" onClick={openComfirm}>
          {t('delete')}
        </Button>
      </Row>
      <Row style={{ background: '#fff' }} className="p-3">
        <GroupTable data={data} getID={id => setGroupID(id)} />
      </Row>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

Group.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.GroupReducer.listGroup };
};

const mapDispatchToProps = {
  getGroup: GroupActions.getGroupAction,
  deleteGroup: GroupActions.deleteGroupAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
