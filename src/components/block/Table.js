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

const BlokTable = ({ data, getID, getDetail }) => {
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
            <th>{t('name')}</th>
            <th>{t('status')}</th>
            <th>{t('tags')}</th>
            <th>{t('created')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, (values, index) => {
            return (
              <tr key={index}>
                <th>
                  <input type="checkbox" onClick={() => getID(values.id)} />
                </th>
                <td onClick={() => getDetail(values)}>{values.name}</td>
                <td onClick={() => getDetail(values)}>{values.status === 1 ? 'true' : 'false'}</td>
                <td onClick={() => getDetail(values)}>{values.stricky === 1 ? 'true' : 'false'}</td>
                <td onClick={() => getDetail(values)}>{moment(values.createdAt).fromNow()}</td>
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

BlokTable.propTypes = PropsType;

export default BlokTable;
