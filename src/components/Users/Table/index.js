import React, { useState } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
  data: PropTypes.array,
  getID: PropTypes.func,
  getDetail: PropTypes.func
};

const UsersTable = ({ data, getID, getDetail }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const list = slice(data, page * 20, page * 20 + 20);
  return (
    <React.Fragment>
      <Table striped>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>{t('user.fistname')}</th>
            <th>{t('user.lastname')}</th>
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
                  <input type="checkbox" onClick={() => getID(values.id)} />
                </th>
                <td onClick={() => getDetail(values)}>{values.username}</td>
                <td onClick={() => getDetail(values)}>{values.lastname}</td>
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
