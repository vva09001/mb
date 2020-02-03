const Actions = {
  GET_GROUP_REQUEST: 'GET_GROUP_REQUEST',
  GET_GROUP_RESPONSE: 'GET_GROUP_RESPONSE',

  getGroupAction: () => ({
    type: Actions.GET_GROUP_REQUEST
  }),

  GET_GROUP_BY_ID_REQUEST: 'GET_GROUP_BY_ID_REQUEST',
  GET_GROUP_BY_ID_RESPONSE: 'GET_GROUP_BY_ID_RESPONSE',

  getGroupByIDAction: id => ({
    type: Actions.GET_GROUP_BY_ID_REQUEST,
    id
  }),

  GET_GROUP_BY_USER_REQUEST: 'GET_GROUP_BY_USER_REQUEST',
  GET_GROUP_BY_USER_RESPONSE: 'GET_GROUP_BY_USER_RESPONSE',

  GET_NEWS_BY_USER_RESPONSE: 'GET_NEWS_BY_USER_RESPONSE',

  getGroupByUserAction: () => ({
    type: Actions.GET_GROUP_BY_USER_REQUEST
  }),

  ADD_GROUP_REQUEST: 'ADD_GROUP_REQUEST',
  ADD_GROUP_RESPONSE: 'ADD_GROUP_RESPONSE',

  addGroupAction: data => ({
    type: Actions.ADD_GROUP_REQUEST,
    data
  }),

  EDIT_GROUP_REQUEST: 'EDIT_GROUP_REQUEST',
  EDIT_GROUP_RESPONSE: 'EDIT_GROUP_RESPONSE',

  editGroupAction: (id, data) => ({
    type: Actions.EDIT_GROUP_REQUEST,
    id,
    data
  }),

  DELETE_GROUP_REQUEST: 'DELETE_GROUP_REQUEST',
  DELETE_GROUP_RESPONSE: 'DELETE_GROUP_RESPONSE',

  deleteGroupAction: id => ({
    type: Actions.DELETE_GROUP_REQUEST,
    id
  })
};

export default Actions;
