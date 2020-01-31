import React, * as react from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { slice, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
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

const FormTable = ({
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
  const [page, setPage] = react.useState(0);

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
            <th>{t('form')}</th>
            <th>{t('created')}</th>
          </tr>
        </thead>
        <tbody>
          {map(list, (values, index) => {
            return (
              <tr key={index}>
                <th>
                  <CustomInput
                    id={'checkbox-' + values.id}
                    type="checkbox"
                    checked={isSelectedItem(values.id)}
                    onChange={() => toggleSelectedItem(values.id)}
                  />
                </th>
                <td>
                  <Link to={`/form-builder/edit/${values.id}`} onClick={() => getDetail(values)}>
                    {values.name}
                  </Link>
                </td>
                <td>
                  <Link to={`/form-builder/edit/${values.id}`}>
                    <span className={'values.status === 0' ? 'green' : 'dot'} />
                  </Link>
                </td>
                <td>
                  <Link to={values.id + '/formdata'}>{t('formBuilder.formdata')}</Link>|
                  <Link to={values.id + '/emmbed'}>{t('formBuilder.embededform')}</Link>|
                  <Link to={values.id + '/rely'}>{t('formBuilder.responsemail')}</Link>|Shortcut @mgform{values.id}
                </td>
                <td onClick={() => getDetail(values)}>
                  <Link to={`/form-builder/edit/${values.id}`}>{moment(values.createdAt).fromNow()}</Link>
                </td>
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
