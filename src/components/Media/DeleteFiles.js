import React, { useState } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useBulkSelect from '../../hooks/useBulkSelect';
import { Button, CustomInput } from 'reactstrap';

const PropsType = {
  data: PropTypes.array,
  getID: PropTypes.func,
  deleteImage: PropTypes.func
};

const DeleteFileTable = ({ data, deleteImage }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const fileIds = map(data, values => {
    if (values.type === 'file') {
      return values.id;
    }
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(fileIds);

  const list = slice(data, page * 20, page * 20 + 20);
  return (
    <React.Fragment>
      <Table striped>
        <thead>
          <tr>
            <th>
              <CustomInput
                id="checkbox-bulk"
                type="checkbox"
                checked={isAllSelected}
                onChange={() => toggleIsAllSelected()}
                innerRef={input => input && (input.indeterminate = isIndeterminate)}
              />
            </th>
            <th>{t('thumbnail')}</th>
            <th>{t('filename')}</th>
            <th>{t('path')}</th>
            <th>{t('created')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
            if (values.type === 'file') {
              return (
                <tr key={values.id}>
                  <th>
                    <CustomInput
                      id={'checkbox-' + values.id}
                      type="checkbox"
                      checked={isSelectedItem(values.id)}
                      onChange={() => toggleSelectedItem(values.id)}
                    />
                  </th>
                  <td>
                    <img src={values.url} style={{ width: '50px', height: '50px' }} alt ="Image " />
                  </td>
                  <td>{values.name}</td>
                  <td>{values.path}</td>
                  <td>{moment(values.createdAt).fromNow()}</td>
                </tr>
              );
            } else return;
          })}
        </tbody>
      </Table>
      <div className="pagination__wapper">
        <ReactPaginate
          pageCount={Math.ceil(data && data.length / 20)}
          previousLabel={t('previous')}
          nextLabel={t('next')}
          marginPagesDisplayed={5}
          pageRangeDisplayed={5}
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
      <div>
        <Button
          color={'danger'}
          onClick={() => {
            deleteImage(selectedItems);
          }}
        >
          {t('DeleteImage')}
        </Button>
      </div>
    </React.Fragment>
  );
};

DeleteFileTable.propTypes = PropsType;

export default DeleteFileTable;
