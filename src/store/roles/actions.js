const Actions = {
  GET_ROLES_REQUEST: 'GET_ROLES_REQUEST',
  GET_ROLES_RESPONSE: 'GET_ROLES_RESPONSE',

  GetRoles: () => ({
    type: Actions.GET_ROLES_REQUEST
  }),

  ADD_ROLES_REQUEST: 'ADD_ROLES_REQUEST',
  ADD_ROLES_RESPONSE: 'ADD_ROLES_RESPONSE',

  AddRoles: data => ({
    type: Actions.ADD_ROLES_REQUEST,
    data
  }),

  EDIT_ROLES_REQUEST: 'EDIT_ROLES_REQUEST',
  EDIT_ROLES_RESPONSE: 'EDIT_ROLES_RESPONSE',

  EditRole: data => ({
    type: Actions.EDIT_ROLES_REQUEST,
    data
  }),

  DELETE_ROLES_REQUEST: 'DELETE_ROLES_REQUEST',
  DELETE_ROLES_RESPONSE: 'DELETE_ROLES_RESPONSE',

  DeleteRoles: id => ({
    type: Actions.DELETE_ROLES_REQUEST,
    id
  }),

  GET_DETAIL_ROLES: 'GET_DETAIL_ROLES',

  getDetailRoles: data => ({
    type: Actions.GET_DETAIL_ROLES,
    data
  }),

  APRR_ROLES_REQUEST: 'APRR_ROLES_REQUEST',
  APRR_ROLES_RESPONSE: 'APRR_ROLES_RESPONSE',

  AprrRole: data => ({
    type: Actions.APRR_ROLES_REQUEST,
    data
  })
};

export default Actions;
