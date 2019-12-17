import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {}
};

const Menus = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MENUS_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.ADD_MENUS_RESPONSE:
      return {
        ...state,
        data: [...state.data, action.data]
      };
    case Actions.EDIT_MENUS_REQUEST:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_MENUS_RESPONSE:
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

export default Menus;
