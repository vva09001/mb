import Actions from './actions';

const initialState = {
  data: [],
  modal: false
};

const InterestRate = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_INTEREST_RATE_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.CREATE_INTEREST_RATE_RESPONSE:
      return {
        ...state,
        modal: action.data
      };
    case Actions.UPDATE_INTEREST_RATE_RESPONSE:
      return {
        ...state,
        modal: action.data
      };
    default:
      return state;
  }
};

export default InterestRate;
