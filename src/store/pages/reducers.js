import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {},
  homeID: null
};

const Pages = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PAGES_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.GET_ALL_PAGES_RESPONSE:
      return {
        ...state,
        data: action.data
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
    case Actions.APPR_PAGES_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values !== action.data;
        })
      };
    case Actions.EXPANSION_TOOGLE_PAGE:
      return {
        ...state,
        data: action.data
      };
    case Actions.GET_DETAIL_PAGE:
      return {
        ...state,
        detail: action.data
      };
    case Actions.GET_ID_HOMEPAGE_RESPONSE:
      return {
        ...state,
        homeID: action.data
      };
    default:
      return state;
  }
};

export default Pages;
