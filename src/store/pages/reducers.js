import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: []
};

const Pages = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PAGES_RESPONSE:
      return {
        ...state,
        data: map(action.data, values => {
          return { ...values, title: values.name, expanded: true };
        })
      };
    case Actions.ADD_PAGES_RESPONSE:
      return {
        ...state,
        data: [...state.data, { ...action.data, title: action.data.name }]
      };
    case Actions.EDIT_PAGES_RESPONSE:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = { ...action.data, title: action.data.name };
          }
          return values;
        })
      };
    case Actions.DELETE_PAGES_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values !== action.data;
        })
      };
    case Actions.EXPANSION_TOOGLE:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default Pages;
