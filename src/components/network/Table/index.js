import React, { useState } from 'react';
import { Button, CustomInput, Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useBulkSelect from '../../../hooks/useBulkSelect';

const PropsType = {
  data: PropTypes.array,
  deleteNetwork: PropTypes.func
};
 
const NetworkTable = ({ data,deleteNetwork }) => {

  const fileIds = map(data, values => {
      return values.id;
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(fileIds);
  const clickDeleteNetwork = () => {
    if (selectedItems.length >0){
      console.log(selectedItems.length);
      deleteNetwork(selectedItems);
    }
  };
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const list = slice(data, page * 20, page * 20 + 20);
  return (
    <React.Fragment>
      <Button
      color={'danger'}
      onClick={clickDeleteNetwork}
    >
      {t('delete')}
    </Button>
      <Table striped>
        <thead>
          <tr>
            <th> <CustomInput
              id="checkbox-bulk"
              type="checkbox"
              checked={isAllSelected}
              onChange={() => toggleIsAllSelected()}
              innerRef={input => input && (input.indeterminate = isIndeterminate)}
            /></th>
            <th>{t('network.address_name')}</th>
            <th>{t('status')}</th>
            <th>{t('network.lastupdateddate')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
            return (
              <tr key={values.id}>
                <td> <CustomInput
                  id={'checkbox-' + values.id}
                  type="checkbox"
                  checked={isSelectedItem(values.id)}
                  onChange={() => toggleSelectedItem(values.id)}
                /></td>
                <td><Link to={`/network/detail/${values.id}`}>{values.address_name}</Link></td>
                <td><Link to={`/network/detail/${values.id}`}>{values.status === 0 ? t('pendings') : t('approveds') }</Link></td>
                <td><Link to={`/network/detail/${values.id}`}>{moment(values.updated_at).fromNow()}</Link></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination__wapper">
        <ReactPaginate
          pageCount={Math.ceil(data && data.length / 20)}
          marginPagesDisplayed={5}
          pageRangeDisplayed={5}
          previousLabel={t('previous')}
          nextLabel={t('next')}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          breakClassName={'page-link'}
          activeClassName={'active'}
          activeLinkClassName={'active'}
          breakLinkClassName={'page-item'}
          containerClassName={'pagination'}
          onPageChange={data => setPage(data.selected)}
        />
      </div>
    </React.Fragment>
  );
};

NetworkTable.propTypes = PropsType;

export default NetworkTable;
