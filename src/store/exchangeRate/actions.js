const Actions = {
  GET_EXCHANGE_RATE_REQUEST: 'GET_EXCHANGE_RATE_REQUEST',
  GET_EXCHANGE_RATE_RESPONSE: 'GET_EXCHANGE_RATE_RESPONSE',

  GetExchangeRate: () => ({
    type: Actions.GET_EXCHANGE_RATE_REQUEST
  }),

  CREATE_EXCHANGE_RATE_REQUEST: 'CREATE_EXCHANGE_RATE_REQUEST',
  CREATE_EXCHANGE_RATE_RESPONSE: 'CREATE_EXCHANGE_RATE_RESPONSE',

  CreateExchangeRate: data => ({
    type: Actions.CREATE_EXCHANGE_RATE_REQUEST,
    data
  }),

  EDIT_EXCHANGE_RATE_REQUEST: 'EDIT_EXCHANGE_RATE_REQUEST',
  EDIT_EXCHANGE_RATE_RESPONSE: 'EDIT_EXCHANGE_RATE_RESPONSE',

  EditExchangeRate: (id,data) => ({
    type: Actions.EDIT_EXCHANGE_RATE_REQUEST,
    id,
    data
  }),

  DELETE_EXCHANGE_RATE: 'DELETE_EXCHANGE_RATE',

  DeleteExchangeRate: id => ({
    type: Actions.DELETE_EXCHANGE_RATE,
    id
  }),

  GET_DETAIL_EXCHANGE_RATE: 'GET_DETAIL_EXCHANGE_RATE',

  GetDetailExChangeRate: data => ({
    type: Actions.GET_DETAIL_EXCHANGE_RATE,
    data
  })
};

export default Actions;
