import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {},
  listNewByCategory: []
};

const News = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_NEWS_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.ADD_NEWS_RESPONSE:
      return {
        ...state,
        data: [...state.data, action.data]
      };
    case Actions.EDIT_NEWS_REQUEST:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.newsId === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_NEWS_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values.newsId !== action.data;
        })
      };
    case Actions.GET_DETAIL:
      return {
        ...state,
        detail: action.data
      };
    case Actions.GET_NEWS_BY_ID_RESPONSE:
      return {
        ...state,
        detail: action.data
      };
    case Actions.GET_NEW_BY_CATEGORY_RESPONSE:
      return {
        ...state,
        listNewByCategory: action.data
      };
    default:
      return state;
  }
};

export default News;
