import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {}
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
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_NEWS_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL:
      return {
        ...state,
        detail: {
          ...action.data,
          name: action.data.newsTranslation[0].name,
          shortDescription: action.data.newsTranslation[0].shortDescription,
          description: action.data.newsTranslation[0].description
        }
      };
    default:
      return state;
  }
};

export default News;
