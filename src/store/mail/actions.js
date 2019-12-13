const Actions = {
  GET_MAILS_REQUEST: 'GET_MAILS_REQUEST',
  GET_MAILS_RESPONSE: 'GET_MAILS_RESPONSE',

  GetMails: () => ({
    type: Actions.GET_MAILS_REQUEST
  }),

  ADD_MAILS_REQUEST: 'ADD_MAILS_REQUEST',
  ADD_MAILS_RESPONSE: 'ADD_MAILS_RESPONSE',

  AddMails: (data, onSuccess, onFail) => ({
    type: Actions.ADD_MAILS_REQUEST,
    data,
    onSuccess,
    onFail
  }),

  EDIT_MAILS_REQUEST: 'EDIT_MAILS_REQUEST',
  EDIT_MAILS_RESPONSE: 'EDIT_MAILS_RESPONSE',

  EditMails: (data, onSuccess, onFail) => ({
    type: Actions.EDIT_MAILS_REQUEST,
    data,
    onSuccess,
    onFail
  }),
  DELETE_MAILS_REQUEST: 'DELETE_MAILS_REQUEST',
  DELETE_MAILS_RESPONSE: 'DELETE_MAILS_RESPONSE',

  DeleteMails: id => ({
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
