import React, { useState } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PropsType = {
  data: PropTypes.array,
  getID: PropTypes.func
};

const GroupTable = ({ data, getID }) => {
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
            <th>{t('group.idTeam')}</th>
            <th>{t('name')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
            return (
              <tr key={values.id}>
                <th>
                  <input type="checkbox" onClick={() => getID(values.idTeam)} />
                </th>
                <td>
                  <Link to={`/group/edit/${values.id}`}>{values.idTeam}</Link>
                </td>
                <td>
                  <Link to={`/group/edit/${values.id}`}>{values.name}</Link>
                </td>
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

GroupTable.propTypes = PropsType;

export default GroupTable;
