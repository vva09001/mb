import React, { useState } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CustomInput } from 'reactstrap';

const PropsType = {
  data: PropTypes.array,
  getDetail: PropTypes.func,
  isSelectedItem: PropTypes.func,
  isAllSelected: PropTypes.bool,
  toggleSelectedItem: PropTypes.func,
  toggleIsAllSelected: PropTypes.func,
  isIndeterminate: PropTypes.bool
};

const UsersTable = ({
  data,
  getDetail,
  isSelectedItem,
  isAllSelected,
  toggleSelectedItem,
  toggleIsAllSelected,
  isIndeterminate
}) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

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
            <th>{t('user.aaccount')}</th>
            <th>{t('email.email')}</th>
            <th>{t('loginForm.login')}</th>
            <th>{t('created')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
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
                <td onClick={() => getDetail(values)}>{values.username}</td>
                <td onClick={() => getDetail(values)}>{values.email}</td>
                <td onClick={() => getDetail(values)}>{moment(values.login).fromNow()}</td>
                <td onClick={() => getDetail(values)}>{moment(values.created_at).fromNow()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination__wapper">
        <ReactPaginate
          pageCount={Math.ceil(data.length / 20)}
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
    </React.Fragment>
  );
};

UsersTable.propTypes = PropsType;

export default UsersTable;
