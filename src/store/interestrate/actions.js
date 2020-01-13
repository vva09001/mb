const Actions = {
  GET_INTEREST_RATE_REQUEST: 'GET_INTEREST_RATE_REQUEST',
  GET_INTEREST_RATE_RESPONSE: 'GET_INTEREST_RATE_RESPONSE',

  getInterestRateAction: () => ({
    type: Actions.GET_INTEREST_RATE_REQUEST
  }),
  CREATE_INTEREST_RATE_REQUEST: 'CREATE_INTEREST_RATE_REQUEST',
  CREATE_INTEREST_RATE_RESPONSE: 'CREATE_INTEREST_RATE_RESPONSE',

  createInterestRateAction: (data, onSuccess, onFail) => ({
    type: Actions.CREATE_INTEREST_RATE_REQUEST,
    data:data,
    onSuccess,
    onFail
  }),

  UPDATE_INTEREST_RATE_REQUEST: 'UPDATE_INTEREST_RATE_REQUEST',
  UPDATE_INTEREST_RATE_RESPONSE: 'UPDATE_INTEREST_RATE_RESPONSE',

  updateInterestRateAction: (data, onSuccess, onFail) => ({
    type: Actions.UPDATE_INTEREST_RATE_REQUEST,
    data:data,
    onSuccess,
    onFail
  }),

  DELETE_INTEREST_RATE_REQUEST: 'DELETE_INTEREST_RATE_REQUEST',
  DELETE_INTEREST_RATE_RESPONSE: 'DELETE_INTEREST_RATE_RESPONSE',

  deleteInterestRateAction: (data, onSuccess, onFail) => ({
    type: Actions.DELETE_INTEREST_RATE_REQUEST,
    data:data,
    onSuccess,
    onFail
  }),

};
  
export default Actions;
