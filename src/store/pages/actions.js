const Actions = {
  GET_PAGES_REQUEST: 'GET_PAGES_REQUEST',
  GET_PAGES_RESPONSE: 'GET_PAGES_RESPONSE',

  GetPages: () => ({
    type: Actions.GET_PAGES_REQUEST
  }),

  ADD_PAGES_REQUEST: 'ADD_PAGES_REQUEST',
  ADD_PAGES_RESPONSE: 'ADD_PAGES_RESPONSE',

  AddPages: data => ({
    type: Actions.ADD_PAGES_REQUEST,
    data
  }),

  EDIT_PAGES_REQUEST: 'EDIT_PAGES_REQUEST',
  EDIT_PAGES_RESPONSE: 'EDIT_PAGES_RESPONSE',

  EditPages: data => ({
    type: Actions.EDIT_PAGES_REQUEST,
    data
  }),

  DELETE_PAGES_REQUEST: 'DELETE_PAGES_REQUEST',
  DELETE_PAGES_RESPONSE: 'DELETE_PAGES_RESPONSE',

  DeletePages: id => ({
    type: Actions.DELETE_PAGES_REQUEST,
    id
  }),

  EXPANSION_TOOGLE: 'EXPANSION_TOOGLE_PAGE',
  expansionPageAction: data => ({
    type: Actions.EXPANSION_TOOGLE_PAGE,
    data
  }),

  UPDATE_POSITION_PAGE: 'UPDATE_POSITION_PAGE',
  updatePositionPages: (idPage, idParent, positions) => ({
    type: Actions.UPDATE_POSITION_PAGE,
    idPage,
    idParent,
    positions
  })
};

export default Actions;
