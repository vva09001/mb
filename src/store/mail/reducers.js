import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {}
};

const Mails = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MAILS_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.ADD_MAILS_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.EDIT_MAILS_RESPONSE:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
        })
      };
    case Actions.DELETE_MAILS_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL:
      return {
        ...state,
        detail: action.data
      };
    case Actions.GET_MAILS_BY_ID_RESPONSE:
      return {
        ...state,
        detail: action.data
      };
    default:
      return state;
  }
};

export default Mails;
