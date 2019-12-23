import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  listCategory: [],
  listOption: []
};

const Category = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CATEGORY_RESPONSE:
      return {
        ...state,
        listCategory: action.data
      };
    case Actions.ADD_CATEGORY_RESPONSE:
      return {
        ...state,
        listCategory: [...state.listCategory, { ...action.data, title: action.data.name }]
      };
    case Actions.EDIT_CATEGORY_RESPONSE:
      return {
        ...state,
        listCategory: map(state.listCategory, values => {
          if (values.id === action.data.id) {
            values = { ...action.data, title: action.data.name };
          }
          return values;
        })
      };
    case Actions.DELETE_CATEGORY_RESPONSE:
      return {
        ...state,
        listCategory: filter(state.listCategory, values => {
          return values !== action.data;
        })
      };
    case Actions.EXPANSION_TOOGLE:
      return {
        ...state,
        listCategory: action.data
      };
    case Actions.GET_CATEGORY_SELECT_RESPONSE:
      return { ...state, listOption: action.data };
    default:
      return state;
  }
};

export default Category;
