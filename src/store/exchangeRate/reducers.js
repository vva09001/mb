import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {}
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
    default:
      return state;
  }
};

export default ExchangeRate;
