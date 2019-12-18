import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  listTags: [],
  detail: {}
};

const Tags = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_TAG_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.CREATE_TAG_RESPONSE:
      return {
        ...state,
        data: [...state.data, action.data]
      };
    case Actions.EDIT_TAG_RESPONSE:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_TAG_RESPONSE:
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

export default Tags;
