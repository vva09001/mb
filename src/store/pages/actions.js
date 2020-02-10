const Actions = {
  GET_PAGES_REQUEST: 'GET_PAGES_REQUEST',
  GET_PAGES_RESPONSE: 'GET_PAGES_RESPONSE',

  GetPages: () => ({
    type: Actions.GET_PAGES_REQUEST
  }),

  GET_ALL_PAGES_REQUEST: 'GET_ALL_PAGES_REQUEST',
  GET_ALL_PAGES_RESPONSE: 'GET_ALL_PAGES_RESPONSE',

  GetAllPages: () => ({
    type: Actions.GET_ALL_PAGES_REQUEST
  }),

  ADD_PAGES_REQUEST: 'ADD_PAGES_REQUEST',
  ADD_PAGES_RESPONSE: 'ADD_PAGES_RESPONSE',

  AddPages: data => ({
    type: Actions.ADD_PAGES_REQUEST,
    data
  }),

  EDIT_PAGES_REQUEST: 'EDIT_PAGES_REQUEST',
  EDIT_PAGES_RESPONSE: 'EDIT_PAGES_RESPONSE',

  EditPages: (data, link) => ({
    type: Actions.EDIT_PAGES_REQUEST,
    data,
    link
  }),

  DELETE_PAGES_REQUEST: 'DELETE_PAGES_REQUEST',
  DELETE_PAGES_RESPONSE: 'DELETE_PAGES_RESPONSE',

  DeletePages: id => ({
    type: Actions.DELETE_PAGES_REQUEST,
    id
  }),

  EXPANSION_TOOGLE_PAGE: 'EXPANSION_TOOGLE_PAGE',
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
  }),

  GET_DETAIL_PAGE: 'GET_DETAIL_PAGE',

  getDetailPages: data => ({
    type: Actions.GET_DETAIL_PAGE,
    data
  }),

  APPR_PAGES_REQUEST: 'APPR_PAGES_REQUEST',
  APPR_PAGES_RESPONSE: 'APPR_PAGES_RESPONSE',

  apprPages: data => ({
    type: Actions.APPR_PAGES_REQUEST,
    data
  }),

  DELETE_PAGE_BLOCK_REQUEST: 'DELETE_PAGE_BLOCK_REQUEST',
  DELETE_PAGE_BLOCK_RESPONE: 'DELETE_PAGE_BLOCK_RESPONE',
  detelePageBlockAction: (id, idBlock) => ({
    type: Actions.DELETE_PAGE_BLOCK_REQUEST,
    id,
    idBlock
  }),

  GET_ID_HOMEPAGE_REQUEST: 'GET_ID_HOMEPAGE_REQUEST',
  GET_ID_HOMEPAGE_RESPONSE: 'GET_ID_HOMEPAGE_RESPONSE',

  getHomepageIDAction: () => ({
    type: Actions.GET_ID_HOMEPAGE_REQUEST
  }),

  GET_PAGE_BY_ID_REQUEST: 'GET_PAGE_BY_ID_REQUEST',
  GET_PAGE_BY_ID_RESPONSE: 'GET_PAGE_BY_ID_RESPONSE',

  getPageByID: id => ({
    type: Actions.GET_PAGE_BY_ID_REQUEST,
    id
  })
};

export default Actions;
