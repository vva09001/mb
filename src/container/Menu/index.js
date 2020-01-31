import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import MenuTable from '../../components/Menu/Table';
import PropTypes from 'prop-types';
import { MenuActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import useBulkSelect from '../../hooks/useBulkSelect';
import { map } from 'lodash';

const PropsType = {
  data: PropTypes.array,
  getMenus: PropTypes.func,
  deleteMenus: PropTypes.func,
  getDetailMenus: PropTypes.func
};

function ListMenus({ data, getMenus, deleteMenus, getDetailMenus }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuIds = map(data, values => {
    return values.id;
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(menuIds);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  const { t } = useTranslation();

  const openComfirm = () => {
    if (selectedItems !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (selectedItems !== null) {
      deleteMenus(selectedItems);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetailMenus(detail);
    history.push('/menu/edit');
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('Menu')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/menu/create')}>
            {t('create')}
          </Button>
          <Button color="danger" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <MenuTable
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

ListMenus.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.MenuReducer.data };
};

const mapDispatchToProps = {
  getMenus: MenuActions.GetMenus,
  deleteMenus: MenuActions.DeleteMenus,
  getDetailMenus: MenuActions.getDetailMenus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMenus);
