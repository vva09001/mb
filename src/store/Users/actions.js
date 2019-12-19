const Actions = {
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_RESPONSE: 'GET_USERS_RESPONSE',

  GetUsers: () => ({
    type: Actions.GET_USERS_REQUEST
  }),

  ADD_USERS_REQUEST: 'ADD_USERS_REQUEST',
  ADD_USERS_RESPONSE: 'ADD_USERS_RESPONSE',

  AddUsers: data => ({
    type: Actions.ADD_USERS_REQUEST,
    data
  }),

  EDIT_USERS_REQUEST: 'EDIT_USERS_REQUEST',
  EDIT_USERS_RESPONSE: 'EDIT_USERS_RESPONSE',

  EditUser: data => ({
    type: Actions.EDIT_USERS_REQUEST,
    data
  }),

  DELETE_USERS_REQUEST: 'DELETE_USERS_REQUEST',
  DELETE_USERS_RESPONSE: 'DELETE_USERS_RESPONSE',

  DeleteUsers: id => ({
    type: Actions.DELETE_USERS_REQUEST,
    id
  }),

  GET_DETAIL_USERS: 'GET_DETAIL_USERS',

  getDetailUsers: data => ({
    type: Actions.GET_DETAIL_USERS,
    data
  }),

  APRR_USERS_REQUEST: 'APRR_USERS_REQUEST',
  APRR_USERS_RESPONSE: 'APRR_USERS_RESPONSE',

  AprrUser: data => ({
    type: Actions.APRR_USERS_REQUEST,
    data
  })
};

export default Actions;
