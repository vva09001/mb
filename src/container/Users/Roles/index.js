import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import RoleTable from '../../../components/Users/Roles';
import PropTypes from 'prop-types';
import { RoleActions } from '../../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import useBulkSelect from '../../../hooks/useBulkSelect';
import { map } from 'lodash';

const PropsType = {
  data: PropTypes.array,
  getRoles: PropTypes.func,
  deleteRoles: PropTypes.func,
  getDetail: PropTypes.func
};

function ListRoles({ data, getRoles, deleteRoles, getDetail }) {
  const [isOpen, setIsOpen] = useState(false);
  //const [usersID, setRolesID] = useState(null);
  const roleIds = map(data, values => {
    return values.idRole;
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(roleIds);
  useEffect(() => {
    getRoles();
    
  }, [getRoles]);
  const { t } = useTranslation();

  const openComfirm = () => {
    if (selectedItems !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (selectedItems !== null) {
      deleteRoles(selectedItems);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/users/listrole/edit');
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('roleinit.role')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/users/listrole/create')}>
            {t('create')}
          </Button>
          <Button color="danger" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <RoleTable
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

ListRoles.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.RoleReducer.data };
};

const mapDispatchToProps = {
  getRoles: RoleActions.GetRoles,
  deleteRoles: RoleActions.DeleteRoles,
  getDetail: RoleActions.getDetailRoles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRoles);
