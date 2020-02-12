import React, { useState } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { slice, map, filter } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { CustomInput } from 'reactstrap';

const PropsType = {
  data: PropTypes.array,
  getDetail: PropTypes.func,
  isSelectedItem: PropTypes.func,
  isAllSelected: PropTypes.bool,
  toggleSelectedItem: PropTypes.func,
  toggleIsAllSelected: PropTypes.func,
  isIndeterminate: PropTypes.bool,
  date: PropTypes.object
};

const ExchangeRateTable = ({
  data,
  getDetail,
  isSelectedItem,
  isAllSelected,
  toggleSelectedItem,
  toggleIsAllSelected,
  isIndeterminate,
  date
}) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const list = slice(data, page * 20, page * 20 + 20);

  return (
    <React.Fragment>
      <Table size="sm">
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
            <th>{t('DayUpdate')}</th>
            <th>{t('created')}</th>
          </tr>
        </thead>
        <tbody>
          {date === null &&
            map(list, values => {
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
                  <td onClick={() => getDetail(values)}>
                    <Moment format="DD/MM/YYYY ">{values.date_update}</Moment>
                  </td>
                  <td onClick={() => getDetail(values)}>
                    {' '}
                    <Moment format="HH:mm | DD/MM/YYYY ">{values.created_at}</Moment>
                  </td>
                  <td />
                </tr>
              );
            })}
          {date !== null &&
            map(
              filter(list, values => {
                console.log(date.getTime(), values.date_update);
                return values.date_update === date.getTime();
              }),
              values => {
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
                    <td onClick={() => getDetail(values)}>
                      <Moment format="DD/MM/YYYY">{values.date_update}</Moment>
                    </td>
                    <td onClick={() => getDetail(values)}>{moment(values.created_at).fromNow()}</td>
                    <td />
                  </tr>
                );
              }
            )}
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
