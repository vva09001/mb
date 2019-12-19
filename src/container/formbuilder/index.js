import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FormBuilderActions } from 'store/actions';
import Table from '../../components/formbuilder/Table';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';

const Proptype = {
  listForm: PropTypes.array,
  getListForm: PropTypes.func,
  getFormDetail: PropTypes.func,
  deleteForm: PropTypes.func
};

function Formbuilder({ listForm, getListForm, getFormDetail, deleteForm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formID, setformID] = useState(null);
  useEffect(() => {
    getListForm();
  }, [getListForm]);

  const { t } = useTranslation();

  const onGetDetail = detail => {
    getFormDetail(detail);
    history.push('/form-builder/edit');
  };

  const openComfirm = () => {
    if (formID !== null) {
      setIsOpen(!isOpen);
    }
  };
  const onDelete = () => {
    if (formID !== null) {
      deleteForm(formID);
      setIsOpen(!isOpen);
    }
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
        <Button color="danger" className="mr-2" onClick={openComfirm}>
          {t('delete')}
        </Button>
      </Row>
      <Row className="p-3 backgroud__white">
        <Table data={listForm} getID={id => setformID(id)} getDetail={onGetDetail} />
      </Row>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
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
