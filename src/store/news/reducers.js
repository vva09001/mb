import Actions from './actions';
import { filter } from 'lodash';

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
    case Actions.DELETE_NEWS_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL:
      console.log(action.data);
      return {
        ...state,
        detail: action.data
      };
    default:
      return state;
  }
};

export default News;
