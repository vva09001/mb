const Actions = {
  GET_MAILS_REQUEST: 'GET_MAILS_REQUEST',
  GET_MAILS_RESPONSE: 'GET_MAILS_RESPONSE',

  GetMails: () => ({
    type: Actions.GET_MAILS_REQUEST
  }),

  GET_MAILS_BY_ID_REQUEST: 'GET_MAILS_BY_ID_REQUEST',
  GET_MAILS_BY_ID_RESPONSE: 'GET_MAILS_BY_ID_RESPONSE',

  GetMailsId: id => ({
    type: Actions.GET_MAILS_BY_ID_REQUEST,
    id
  }),

  ADD_MAILS_REQUEST: 'ADD_MAILS_REQUEST',
  ADD_MAILS_RESPONSE: 'ADD_MAILS_RESPONSE',

  AddMails: data => ({
    type: Actions.ADD_MAILS_REQUEST,
    data
  }),

  EDIT_MAILS_REQUEST: 'EDIT_MAILS_REQUEST',
  EDIT_MAILS_RESPONSE: 'EDIT_MAILS_RESPONSE',

  EditMails: data => ({
    type: Actions.EDIT_MAILS_REQUEST,
    data
  }),

  DELETE_MAILS_REQUEST: 'DELETE_MAILS_REQUEST',
  DELETE_MAILS_RESPONSE: 'DELETE_MAILS_RESPONSE',

  DeleteMails: id => ({
    type: Actions.DELETE_MAILS_REQUEST,
    id
  }),

  GET_DETAIL: 'GET_DETAIL',

  GetDetailMails: data => ({
    type: Actions.GET_DETAIL,
    data
  })
};
export default Actions;
