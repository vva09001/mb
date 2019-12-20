const Actions = {
  GET_TAG_REQUEST: 'GET_TAG_REQUEST',
  GET_TAG_RESPONSE: 'GET_TAG_RESPONSE',

  getTagAction: () => ({
    type: Actions.GET_TAG_REQUEST
  }),

  CREATE_TAG_REQUEST: 'CREATE_TAG_REQUEST',
  CREATE_TAG_RESPONSE: 'CREATE_TAG_RESPONSE',

  createTagAction: data => ({
    type: Actions.CREATE_TAG_REQUEST,
    data
  }),

  EDIT_TAG_REQUEST: 'EDIT_TAG_REQUEST',
  EDIT_TAG_RESPONSE: 'EDIT_TAG_RESPONSE',

  editTagAction: (id, data) => ({
    type: Actions.EDIT_TAG_REQUEST,
    id,
    data
  }),

  DELETE_TAG_REQUEST: 'DELETE_TAG_REQUEST',
  DELETE_TAG_RESPONSE: 'DELETE_TAG_RESPONSE',

  deleteTagAction: id => ({
    type: Actions.DELETE_TAG_REQUEST,
    id
  })
};

export default Actions;
