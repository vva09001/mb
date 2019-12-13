import React, { useEffect } from 'react';
import { Row, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FormBuilderActions } from 'store/actions';
import Table from '../../components/formbuilder/Table';
import { connect } from 'react-redux';

const Proptype = {
  listForm: PropTypes.array,
  getListForm: PropTypes.func,
  createForm: PropTypes.func,
  editForm: PropTypes.func,
  deleteForm: PropTypes.func
};

function FormBuilder({ listForm, getListForm, createForm, editForm, deleteForm }) {
  useEffect(() => {
    getListForm();
  }, [getListForm]);

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Row>
        <h4>{t('formBuilder.title')}</h4>
      </Row>
      <Row className="mb-2">
        <Button color="primary" className="mr-2">
          {t('create')}
        </Button>
        <Button color="danger" className="mr-2">
          {t('delete')}
        </Button>
      </Row>
      <Row className="p-3 backgroud__white">
        <Table data={listForm} />
      </Row>
    </React.Fragment>
  );
}

FormBuilder.propTypes = Proptype;

const mapStateToProps = state => {
  return {
    listForm: state.FormBuilderReducer.listForm
  };
};

const mapDispatchToProps = {
  getListForm: FormBuilderActions.getFormAction,
  createForm: FormBuilderActions.createFormAction,
  editForm: FormBuilderActions.editFormAction,
  deleteForm: FormBuilderActions.deleteFormAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormBuilder);
