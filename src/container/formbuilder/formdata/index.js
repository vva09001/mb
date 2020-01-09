/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import FormDataTable from '../../../components/formbuilder/formdata/index';
import PropTypes from 'prop-types';
import { FormBuilderActions } from '../../../store/actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const PropsType = {
  formDetail: PropTypes.object,
  getFormId: PropTypes.func
};
let listform = null;
function Formdata({ formDetail, getFormId }) {
  let { id } = useParams();

  // useEffect(async () => {
  //   await getFormId(id);
  // }, [getFormId, id]);
  useEffect(() => {
    getFormId(id);
  }, [getFormId, id]);

  if (formDetail.list) {
    listform = JSON.parse(formDetail.list);
  }

  //eslint-disable-next-line no-unused-vars
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  return (
    <React.Fragment>
      <FormDataTable data={listform} />
    </React.Fragment>
  );
}

Formdata.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    formDetail: state.FormBuilderReducer.detail
  };
};

const mapDispatchToProps = {
  getFormId: FormBuilderActions.getformbyIDAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Formdata);
