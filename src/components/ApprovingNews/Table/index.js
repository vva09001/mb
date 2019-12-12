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

const AprrTable = ({ data, getID, getDetail }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const list = slice(data, page * 20, page * 20 + 20);
  return (
    <React.Fragment>
      <Table striped>
        <thead>
          <tr>            
            <th>{t('name')}</th>
            <th>{t('active')}</th>            
            <th>{t('created')}</th>
            <th>{t('status')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
            if (values.status === 0) {    
                return (
                <tr key={values.id}>                    
                    <td onClick={() => getDetail(values)}>{values.name}</td>
                    <td onClick={() => getDetail(values)}>{values.is_active === 1 ? 'true' : 'false'}</td>                    
                    <td onClick={() => getDetail(values)}>{moment(values.created_at).fromNow()}</td>
                    <td onClick={() => getDetail(values)}>{values.status === 1 ? 'Đã Duyệt' : 'Chưa Duyệt'}</td>
                </tr>
                )} else {return}
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

AprrTable.propTypes = PropsType;

export default AprrTable;