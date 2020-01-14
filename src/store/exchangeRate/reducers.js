import Actions from './actions';

const initialState = {
  data: [],
  detail:{},
  detailcurrency:[]
};

const ExchangeRate = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_EXCHANGE_RATE_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.CREATE_EXCHANGE_RATE_RESPONSE:
      return {
        ...state,
        detail: action.data
      };
    case Actions.EDIT_EXCHANGE_RATE_RESPONSE:
      return {
        ...state,
        detail: action.data
      };
    case Actions.GET_DETAIL_EXCHANGE_RATE:
      return {
        ...state,
        detailcurrency: action.data.exchangeRateDetail,
        detail: action.data
      };
    default:
      return state;
  }
};

export default ExchangeRate;
