import React, { useState } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { CustomInput } from 'reactstrap';
import useBulkSelect from '../../hooks/useBulkSelect';

const PropsType = {
  data: PropTypes.array
};

const ExchangeRateTable = ({ data }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const list = slice(data, page * 20, page * 20 + 20);

  const exChangeRateIds = map(data, values => {
    return values.id;
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(exChangeRateIds);

  return (
    <React.Fragment>
      <Table size="sm">
        <thead className="bg-primary text-white">
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
            <th>{t('DayUpdate')}</th>
            <th>{t('created')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, values => {
            return (
              <tr key={values.id}>
                <th>
                  <CustomInput
                    id={'checkbox-' + values.id}
                    type="checkbox"
                    checked={isSelectedItem(values.id)}
                    onChange={() => toggleSelectedItem(values.id)}
                  />
                </th>
                <td>
                  <Moment format="DD/MM/YYYY">{values.date_update}</Moment>
                </td>
                <td>{moment(values.date_update).fromNow()}</td>
                <td />
              </tr>
            );
          })}
          v
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

ExchangeRateTable.propTypes = PropsType;

export default ExchangeRateTable;
