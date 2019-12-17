import React, { useEffect } from 'react';
import { Row, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FormBuilderActions } from 'store/actions';
import Table from '../../components/formbuilder/Table';
import history from 'helpers/history';
import { connect } from 'react-redux';

const Proptype = {
  listForm: PropTypes.array,
  getListForm: PropTypes.func,
  getFormDetail: PropTypes.func,
  deleteForm: PropTypes.func
};

function Formbuilder({ listForm, getListForm, getFormDetail, deleteForm }) {
  useEffect(() => {
    getListForm();
  }, [getListForm]);

  const { t } = useTranslation();

  const getDetail = detail => {
    getFormDetail(detail);
    history.push('/form-builder/edit');
  };

  return (
    <React.Fragment>
      <Row>
        <h4>{t('formBuilder.title')}</h4>
      </Row>
      <Row className="mb-2">
        <Button color="primary" className="mr-2" onClick={() => history.push('/form-builder/create')}>
          {t('create')}
        </Button>
        <Button color="danger" className="mr-2">
          {t('delete')}
        </Button>
      </Row>
      <Row className="p-3 backgroud__white">
        <Table data={listForm} getDetail={detail => getDetail(detail)} />
      </Row>
    </React.Fragment>
  );
}

Formbuilder.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    listForm: state.FormBuilderReducer.listForm
  };
};

const mapDispatchToProps = {
  getListForm: FormBuilderActions.getFormAction,
  getFormDetail: FormBuilderActions.getFormDetailAction,
  deleteForm: FormBuilderActions.deleteFormAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Formbuilder);
