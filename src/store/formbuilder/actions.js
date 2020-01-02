const Actions = {
  GET_FORM_REQUEST: 'GET_FORM_REQUEST',
  GET_FORM_RESPONSE: 'GET_FORM_RESPONSE',

  getFormAction: () => ({
    type: Actions.GET_FORM_REQUEST
  }),

  GET_FORM_BY_ID_REQUEST: 'GET_FORM_BY_ID_REQUEST',
  GET_FORM_BY_ID_RESPONSE: 'GET_FORM_BY_ID_RESPONSE',

  getformbyIDAction: id => ({
    type: Actions.GET_FORM_BY_ID_REQUEST,
    id
  }),

  CREATE_FROM_REQUEST: 'CREATE_FROM_REQUEST',
  CREATE_FORM_RESPONSE: 'CREATE_FORM_RESPONSE',

  createFormAction: data => ({
    type: Actions.CREATE_FROM_REQUEST,
    data
  }),

  EDIT_FORM_REQUEST: 'EDIT_FORM_REQUEST',
  EDIT_FORM_RESPONSE: 'EDIT_FORM_RESPONSE',

  editFormAction: (id, data) => ({
    type: Actions.EDIT_FORM_REQUEST,
    id,
    data
  }),

  DELETE_FORM_REQUEST: 'DELETE_FORM_REQUEST',
  DELETE_FORM_RESPONSE: 'DELETE_FORM_RESPONSE',

  deleteFormAction: id => ({
    type: Actions.DELETE_FORM_REQUEST,
    id
  }),

  GET_FORM_DETAIL: 'GET_FORM_DETAIL',
  getFormDetailAction: detail => ({
    type: Actions.GET_FORM_DETAIL,
    detail
  })
};

export default Actions;
