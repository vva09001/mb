import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { map } from 'lodash';

const PropsType = {
  data: PropTypes.array
};

const NewTable = ({ data }) => {
  return (
    <React.Fragment>
      <Table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>Sticky</th>
            <th>Đã tạo</th>
            <th>Kích hoạt</th>
          </tr>
        </thead>
        <tbody>
          {map(data, (values, index) => {
            return (
              <tr key={index}>
                <th>
                  <input type="checkbox" />
                </th>
                <td>{values.name}</td>
                <td>{values.status ? 'true' : 'false'}</td>
                <td>{values.stricky ? 'true' : 'false'}</td>
                <td>{moment(values.created).fromNow()}</td>
                <td>{values.active}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        pageCount={5}
        marginPagesDisplayed={3}
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
      />
    </React.Fragment>
  );
};

NewTable.propTypes = PropsType;

export default NewTable;
