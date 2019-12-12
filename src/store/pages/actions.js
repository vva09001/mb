const Actions = {
  GET_PAGES_REQUEST: 'GET_PAGES_REQUEST',
  GET_PAGES_RESPONSE: 'GET_PAGES_RESPONSE',

  GetPages: () => ({
    type: Actions.GET_PAGES_REQUEST
  }),

  ADD_PAGES_REQUEST: 'ADD_PAGES_REQUEST',
  ADD_PAGES_RESPONSE: 'ADD_PAGES_RESPONSE',

  AddPages: (data, onSuccess, onFail) => ({
    type: Actions.ADD_PAGES_REQUEST,
    data,
    onSuccess,
    onFail
  }),

  EDIT_PAGES_REQUEST: 'EDIT_PAGES_REQUEST',
  EDIT_PAGES_RESPONSE: 'EDIT_PAGES_RESPONSE',

  EditPage: (data, onSuccess, onFail) => ({
    type: Actions.EDIT_PAGES_REQUEST,
    data,
    onSuccess,
    onFail
  }),

  DELETE_PAGES_REQUEST: 'DELETE_PAGES_REQUEST',
  DELETE_PAGES_RESPONSE: 'DELETE_PAGES_RESPONSE',

  DeletePages: id => ({
    type: Actions.DELETE_PAGES_REQUEST,
    id
  }),

  GET_DETAIL: 'GET_DETAIL',

  getDetail: data => ({
    type: Actions.GET_DETAIL,
    data
  })
};

export default Actions;
