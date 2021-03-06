import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {},
  detailById: {},
  detailByUsername: {}
};

const Users = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USERS_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.ADD_USERS_RESPONSE:
      return {
        ...state,
        data: [...state.data, action.data]
      };
    case Actions.EDIT_USERS_REQUEST:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_USERS_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL_USERS:
      return {
        ...state,
        detail: action.data
      };
    case Actions.GET_USER_BY_ID_RESPONSE:
      return {
        ...state,
        detailById: action.data
      };
      case Actions.GET_USER_BY_USERNAME_RESPONSE:
      return {
        ...state,
        detailByUsername: action.data
      };
    default:
      return state;
  }
};

export default Users;
