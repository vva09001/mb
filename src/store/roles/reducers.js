import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {}
};

const Roles = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ROLES_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.ADD_ROLES_RESPONSE:
      return {
        ...state,
        data: [...state.data, action.data]
      };
    case Actions.EDIT_ROLES_REQUEST:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_ROLES_RESPONSE:
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
    default:
      return state;
  }
};

export default Roles;
