import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
  data: PropTypes.array,
  getDetail: PropTypes.func
};

const AprrTable = ({ data, getDetail, getID }) => {
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
            <th>{t('active')}</th>
            <th>{t('created')}</th>
            <th>{t('status')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
            if (values.is_active === 0) {
              return (
                <tr key={values.newsId}>
                   <th>
                  <input type="checkbox" onClick={() => getID(values.newsId)} />
                </th> 
                <td>
                  <Link to={`/news/approving/${values.newsId}`}>
                  {values.title}
                  </Link>
                </td>
                <td>
                  <Link to={`/news/approving/${values.newsId}`}>
                  <span className={values.is_active === 0 ? 'green' : 'dot'} />
                  </Link>
                </td>
                <td>
                  <Link to={`/news/approving/${values.newsId}`}>{moment(values.created_at).fromNow()}</Link>
                </td>
                <td>
                  <Link to={`/news/approving/${values.newsId}`}>
                  {values.is_active === 1 ? `${t('approved.approved')}` : `${t('approved.notapproved')}`}
                  </Link>
                </td>
                </tr>
              );
            } else {
              return;
            }
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

AprrTable.propTypes = PropsType;

export default AprrTable;
