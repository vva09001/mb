import React, { useEffect, useState } from 'react';
import {
  Row,
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  CustomInput
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InterestRateActions } from '../../store/actions';
import { Error, Success } from 'helpers/notify';
import history from 'helpers/history';
import { map, slice } from 'lodash';
import ReactPaginate from 'react-paginate';
import useBulkSelect from '../../hooks/useBulkSelect';
import PopupComfirm from 'components/common/PopupComfirm';

const Proptype = {
  data: PropTypes.array,
  getInterestRate: PropTypes.func,
  createInterestRate: PropTypes.func,
  updateInterestRate: PropTypes.func,
  deleteInterestRate: PropTypes.func
};

function InterestRate({ getInterestRate, data, createInterestRate, updateInterestRate, deleteInterestRate }) {
  useEffect(() => {
    getInterestRate();
  }, [getInterestRate]);

  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    data: [],
    dataCreate: {},
    termError: null,
    interestRateError: null
  });

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      data: data
    }));
  }, [data]);

  const handleChangeCreate = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      dataCreate: {
        ...formState.dataCreate,
        [event.target.name]: event.target.name === 'interest_rate' ? Number(event.target.value) : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const onSuccess = () => {
    Success('Tạo thành công');
    history.goBack();
  };

  const onFail = () => {
    Error('Tạo thất bại');
  };

  const onSave = () => {
    setFormState(formState => ({
      ...formState,
      termError: null,
      interestRateError: null
    }));

    let checkError = null;
    if (formState.dataCreate.term === undefined || formState.dataCreate.term === '') {
      checkError = true;
      setFormState(formState => ({
        ...formState,
        termError: t('interest_rate.term_error')
      }));
    }

    if (formState.dataCreate.interest_rate === undefined || formState.dataCreate.interest_rate === '') {
      checkError = true;
      setFormState(formState => ({
        ...formState,
        interestRateError: t('interest_rate.interest_rate_error')
      }));
    }

    if (!checkError) {
      if (!formState.dataCreate.id) {
        createInterestRate(formState.dataCreate, onSuccess, onFail);
      } else {
        updateInterestRate(formState.dataCreate, onSuccess, onFail);
      }
      setModal(!modal);
      history.push('/interest-rate');
    }
  };

  const onClickUpdate = values => {
    setModal(!modal);
    setFormState(formState => ({
      ...formState,
      dataCreate: values
    }));
  };

  const onClickCreate = values => {
    setModal(!modal);
    setFormState(formState => ({
      ...formState,
      dataCreate: []
    }));
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setFormState(formState => ({
      ...formState,
      termError: null,
      interestRateError: null
    }));
    setModal(!modal);
  };

  const [page, setPage] = useState(0);

  const fileIds = map(data, values => {
    return values.id;
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(fileIds);
  const clickDeleteInterestRate = () => {
    if (selectedItems.length > 0) {
      deleteInterestRate(selectedItems, onSuccess, onFail);
      setIsOpen(!isOpen);
    }
  };
  const list = slice(data, page * 10, page * 10 + 10);

  const [isOpen, setIsOpen] = useState(false);

  const openComfirm = () => {
    if (selectedItems.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <h4>{t('interest_rate.interest_rate')}</h4>
      </Row>
      <Row className="mb-2">
        <Button color="primary" className="mr-2" onClick={() => onClickCreate()}>
          {t('create')}
        </Button>
        <Button onClick={openComfirm}>{t('delete')}</Button>
      </Row>
      <React.Fragment>
        <Row className="p-3 backgroud__white">
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
                <th>{t('interest_rate.term')}</th>
                <th>{t('interest_rate.interest_rate')}</th>
                <th>{t('description')}</th>
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
                    <th>
                      <span onClick={() => onClickUpdate(values)}>
                        {values.term} {t('month')}
                      </span>
                    </th>
                    <th>
                      <span onClick={() => onClickUpdate(values)}>
                        {values.interest_rate}
                        {t('%')}
                      </span>
                    </th>
                    <th>
                      <span onClick={() => onClickUpdate(values)}>{values.description}</span>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="pagination__wapper">
            <ReactPaginate
              pageCount={Math.ceil(data && data.length / 10)}
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
        </Row>
      </React.Fragment>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{!formState.dataCreate.id ? t('interest_rate.create') : t('interest_rate.update')}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>{t('interest_rate.term')}</Label>
            <p style={{ color: 'red' }}>{!formState.termError ? null : formState.termError}</p>
            <Input
              name="term"
              type="number"
              value={!formState.dataCreate.term ? '' : formState.dataCreate.term}
              onChange={handleChangeCreate}
              required="required"
            />
          </FormGroup>
          <FormGroup>
            <Label>{t('interest_rate.interest_rate')}</Label>
            <p style={{ color: 'red' }}>{!formState.interestRateError ? null : formState.interestRateError}</p>
            <Input
              name="interest_rate"
              type="number"
              min="0"
              max="10"
              value={!formState.dataCreate.interest_rate ? '' : formState.dataCreate.interest_rate}
              onChange={handleChangeCreate}
              required="required"
            />
          </FormGroup>
          <FormGroup>
            <Label>{t('description')}</Label>
            <Input
              name="description"
              type="textarea"
              value={!formState.dataCreate.description ? '' : formState.dataCreate.description}
              onChange={handleChangeCreate}
              rows="5"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSave}>
            {t('save')}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {t('cancel')}
          </Button>
        </ModalFooter>
      </Modal>
      <div className="pagination__wapper" />
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={clickDeleteInterestRate} />
    </React.Fragment>
  );
}

InterestRate.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    data: state.InterestRateReducer.data,
    modals: state.InterestRateReducer.modal
  };
};

const mapDispatchToProps = {
  getInterestRate: InterestRateActions.getInterestRateAction,
  createInterestRate: InterestRateActions.createInterestRateAction,
  updateInterestRate: InterestRateActions.updateInterestRateAction,
  deleteInterestRate: InterestRateActions.deleteInterestRateAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestRate);
