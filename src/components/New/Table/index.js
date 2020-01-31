import React, { useState } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CustomInput } from 'reactstrap';

const PropsType = {
  data: PropTypes.array,
  getID: PropTypes.func,
  getDetail: PropTypes.func,
  isSelectedItem: PropTypes.func,
  isAllSelected: PropTypes.bool,
  toggleSelectedItem: PropTypes.func,
  toggleIsAllSelected: PropTypes.func,
  isIndeterminate: PropTypes.bool
};

const NewTable = ({
  data,
  getID,
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
            <th>{t('name')}</th>
            <th>{t('status')}</th>
            <th>{t('sticky')}</th>
            <th>{t('created')}</th>
            <th>{t('active')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
            return (
              <tr key={values.newsId}>
                <th>
                  <CustomInput
                    id={'checkbox-' + values.newsId}
                    type="checkbox"
                    checked={isSelectedItem(values.newsId)}
                    onChange={() => toggleSelectedItem(values.newsId)}
                  />
                </th>
                <td>
                  <Link to={`/news/edit/${values.newsId}`}>{values.title}</Link>
                </td>
                <td>
                  <Link to={`/news/edit/${values.newsId}`}>
                    <span className={values.is_active === 1 ? 'green' : 'dot'} />
                  </Link>
                </td>
                <td>
                  <Link to={`/news/edit/${values.newsId}`}>{values.is_sticky === 1 ? 'true' : 'false'}</Link>
                </td>
                <td>
                  <Link to={`/news/edit/${values.newsId}`}>{moment(values.created_at).fromNow()}</Link>
                </td>
                <td>
                  <Link to={`/news/edit/${values.newsId}`}>{values.is_active === 1 ? 'true' : 'false'}</Link>
                </td>
              </tr>
            );
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
    </React.Fragment>
  );
};

NewTable.propTypes = PropsType;

export default NewTable;
