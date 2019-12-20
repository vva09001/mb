const Actions = {
  GET_BLOCK_REQUEST: 'GET_BLOCK_REQUEST',
  GET_BLOCK_RESPONSE: 'GET_BLOCK_RESPONSE',

  getBlockAction: () => ({
    type: Actions.GET_BLOCK_REQUEST
  }),

  CREATE_BLOCK_REQUEST: 'CREATE_BLOCK_REQUEST',
  CREATE_BLOCK_RESPONSE: 'CREATE_BLOCK_RESPONSE',

  createBlockAction: data => ({
    type: Actions.CREATE_BLOCK_REQUEST,
    data
  }),

  EDIT_BLOCK_REQUEST: 'EDIT_BLOCK_REQUEST',
  EDIT_BLOCK_RESPONSE: 'EDIT_BLOCK_RESPONSE',

  editBlockAction: (id, data) => ({
    type: Actions.EDIT_BLOCK_REQUEST,
    id,
    data
  }),

  DELETE_BLOCK_REQUEST: 'DELETE_BLOCK_REQUEST',
  DELETE_BLOCK_RESPONSE: 'DELETE_BLOCK_RESPONSE',

  deleteBlockAction: id => ({
    type: Actions.DELETE_BLOCK_REQUEST,
    id
  }),
  GET_BLOCK_DETAIL: 'GET_BLOCK_DETAIL',
  getBlockDetail: data => ({
    type: Actions.GET_BLOCK_DETAIL,
    data
  })
};

export default Actions;
