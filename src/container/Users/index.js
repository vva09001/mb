import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import UserTable from '../../components/Users/Table';
import PropTypes from 'prop-types';
import { UserActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import useBulkSelect from '../../hooks/useBulkSelect';
import map from 'lodash';

const PropsType = {
  data: PropTypes.array,
  getUsers: PropTypes.func,
  deleteUsers: PropTypes.func,
  getDetail: PropTypes.func
};

function ListUsers({ data, getUsers, deleteUsers, getDetail }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [usersID, setUsersID] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const { t } = useTranslation();
  const UserIds = map(data, values => {
    return values.id;
  });
  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(UserIds);

  const openComfirm = () => {
    if (selectedItems !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (selectedItems !== null) {
      deleteUsers(selectedItems);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/users/edit');
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('users')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/users/create')}>
            {t('create')}
          </Button>
          <Button color="danger" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <UserTable
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

ListUsers.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.UserReducer.data };
};

const mapDispatchToProps = {
  getUsers: UserActions.GetUsers,
  deleteUsers: UserActions.DeleteUsers,
  getDetail: UserActions.getDetailUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUsers);
