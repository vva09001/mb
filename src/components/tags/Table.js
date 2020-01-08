import React, { useState } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
  data: PropTypes.array,
  getID: PropTypes.func
};

const TagTable = ({ data, getID }) => {
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
            <th>{t('id')}</th>
            <th>{t('name')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, (values, index) => {
            return (
              <tr key={index}>
                <th>
                  <input type="checkbox" onClick={() => getID(values.id)} />
                </th>
                <td>{values.id}</td>
                <td>
                  <Link to={`/pages/tags/edit/${values.id}`}>{values.name}</Link>
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

TagTable.propTypes = PropsType;

export default TagTable;
