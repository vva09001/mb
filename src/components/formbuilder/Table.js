import React, { useState } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
  data: PropTypes.array,
  getID: PropTypes.func,
  getDetail: PropTypes.func
};

const FormTable = ({ data, getID, getDetail }) => {
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
            <th>{t('form')}</th>
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
                <td onClick={() => getDetail(values)}>
                  <span className={values.status === 0 ? 'green' : 'dot'} />
                </td>
                <td onClick={() => getDetail(values)}>
                  <Link to="/">Form data</Link>|<Link to="/">Embeded form</Link>|<Link to="/">Thư phản hồi</Link>|
                  {values.stricky === 1 ? 'true' : 'false'}
                </td>
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

FormTable.propTypes = PropsType;

export default FormTable;
