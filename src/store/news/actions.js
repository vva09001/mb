const Actions = {
  GET_NEWS_REQUEST: 'GET_NEWS_REQUEST',
  GET_NEWS_RESPONSE: 'GET_NEWS_RESPONSE',

  GetNews: () => ({
    type: Actions.GET_NEWS_REQUEST
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
  })
};

export default Actions;
