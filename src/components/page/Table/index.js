import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
  data: PropTypes.array,
  getID: PropTypes.func,
  getDetail: PropTypes.func
};

const PageTable = ({ data, getID, getDetail }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>{t('name')}</th>
            {/* <th>{t('status')}</th> */}
            {/* <th>{t('sticky')}</th> */}
            <th>{t('status')}</th>
            <th>{t('created')}</th>
          </tr>
        </thead>
        <tbody>
          {map(data, (values, index) => {
            return (
              <tr key={index}>
                <th>
                  <input type="checkbox" onClick={() => getID(values.id)} />
                </th>
                <td onClick={() => getDetail(values)}>{values.name}</td>
                <td onClick={() => getDetail(values)}>
                  <span className={values.status === 1 ? 'green' : 'dot'} />
                </td>
                {/* <td onClick={() => getDetail(values)}>{values.stricky ? 'true' : 'false'}</td> */}
                <td onClick={() => getDetail(values)}>{moment(values.created_at).fromNow()}</td>
                {/*<td onClick={() => getDetail(values)}>{values.is_active ? 'true' : 'false'}</td>*/}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        pageCount={5}
        marginPagesDisplayed={3}
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
      />
    </React.Fragment>
  );
};

PageTable.propTypes = PropsType;

export default PageTable;
