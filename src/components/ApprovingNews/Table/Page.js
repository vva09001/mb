import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ButtonIcon from '../../common/ButtonIcon';

const PropsType = {
  data: PropTypes.array,
  getDetail: PropTypes.func,
  apprPages: PropTypes.func
};

const AprrTablePage = ({ data, getID, apprPages }) => {
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
            <th />
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
            if (values.is_active === 0) {
              return (
                <tr key={values.id}>
                  <th>
                    <input type="checkbox" onClick={() => getID(values.id)} />
                  </th>
                  <td>
                    <Link to={`/pages/approved/${values.id}`}>{values.name}</Link>
                  </td>
                  <td>
                    <Link to={`/pages/approved/${values.id}`}>
                      <span className={values.is_active !== 0 ? 'green' : 'dot'} />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/pages/approved/${values.id}`}>{moment(values.created_at).fromNow()}</Link>
                  </td>
                  <td>
                    <Link to={`/pages/approved/${values.id}`}>
                      {values.is_active === 1 ? `${t('approved.approved')}` : `${t('approved.notapproved')}`}
                    </Link>
                  </td>
                  <td>
                    <ButtonIcon
                      className="mr-1"
                      color="success"
                      icon="check"
                      iconAlign="left"
                      size="sm"
                      outline
                      onClick={() => {
                        apprPages(values.id);
                      }}
                    />
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

AprrTablePage.propTypes = PropsType;

export default AprrTablePage;
