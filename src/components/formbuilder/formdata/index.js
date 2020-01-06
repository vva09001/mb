import React, * as react from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
// import { Link } from 'react-router-dom';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
  data: PropTypes.array,
  getID: PropTypes.func,
  getDetail: PropTypes.func
};

const FormDataTable = ({ data }) => {
  const { t } = useTranslation();
  const [page, setPage] = react.useState(0);

  const list = slice(data, page * 20, page * 20 + 20);
  return (
    <React.Fragment>
      <Table striped style={{ backgroundColor: '#fff' }}>
        <thead style={{ borderBottom: '1px solid #e6edf5' }}>
          <tr>
            {map(list, (values, index) => {
              if (values.type === 'button') {
                return;
              } else {
                return <td key={index}>{values.label}</td>;
              }
            })}
            <td>Đã tạo mới</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {map(list, (values, texts) => {
              return <td key={texts} />;
            })}
            {map(list, values => {
              // eslint-disable-next-line no-unused-expressions
              <td>{moment(values.createdAt).fromNow()}</td>;
            })}
          </tr>
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

FormDataTable.propTypes = PropsType;

export default FormDataTable;
