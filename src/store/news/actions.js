const Actions = {
  GET_NEWS_REQUEST: 'GET_NEWS_REQUEST',
  GET_NEWS_RESPONSE: 'GET_NEWS_RESPONSE',

  GetNews: () => ({
    type: Actions.GET_NEWS_REQUEST
  }),

  GET_NEWS_BY_ID_REQUEST: 'GET_NEWS_BY_ID_REQUEST',
  GET_NEWS_BY_ID_RESPONSE: 'GET_NEWS_BY_ID_RESPONSE',

  GetNewsId: id => ({
    type: Actions.GET_NEWS_BY_ID_REQUEST,
    id
  }),

  ADD_NEWS_REQUEST: 'ADD_NEWS_REQUEST',
  ADD_NEWS_RESPONSE: 'ADD_NEWS_RESPONSE',

  AddNews: (data, onSuccess, onFail) => ({
    type: Actions.ADD_NEWS_REQUEST,
    data,
    onSuccess,
    onFail
  }),

  EDIT_NEWS_REQUEST: 'EDIT_NEWS_REQUEST',
  EDIT_NEWS_RESPONSE: 'EDIT_NEWS_RESPONSE',

  EditNew: (data, onSuccess, onFail) => ({
    type: Actions.EDIT_NEWS_REQUEST,
    data,
    onSuccess,
    onFail
  }),

  DELETE_NEWS_REQUEST: 'DELETE_NEWS_REQUEST',
  DELETE_NEWS_RESPONSE: 'DELETE_NEWS_RESPONSE',

  DeleteNews: id => ({
    type: Actions.DELETE_NEWS_REQUEST,
    id
  }),

  GET_DETAIL: 'GET_DETAIL',

  getDetail: data => ({
    type: Actions.GET_DETAIL,
    data
  }),

  APRR_NEWS_REQUEST: 'APRR_NEWS_REQUEST',
  APRR_NEWS_RESPONSE: 'APRR_NEWS_RESPONSE',

  AprrNew: (data, onSuccess, onFail) => ({
    type: Actions.APRR_NEWS_REQUEST,
    data,
    onSuccess,
    onFail
  }),

  GET_NEW_BY_CATEGORY_REQUEST: 'GET_NEW_BY_CATEGORY_REQUEST',
  GET_NEW_BY_CATEGORY_RESPONSE: 'GET_NEW_BY_CATEGORY_RESPONSE',

  getNewByCategory: id => ({
    type: Actions.GET_NEW_BY_CATEGORY_REQUEST,
    id
  })
};

export default Actions;
