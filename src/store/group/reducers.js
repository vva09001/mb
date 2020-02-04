import Actions from './actions';
import { map, filter } from 'lodash';

const initialState = {
  listGroup: [],
  detail: {},
  listGroupByUser: [],
  listPages: [],
  listNews: [],
  listCategories: []
};

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_GROUP_RESPONSE:
      return {
        ...state,
        listGroup: action.data,
        listNews: action.data
      };
    case Actions.ADD_GROUP_RESPONSE:
      return {
        ...state,
        listGroup: [...state.listGroup, action.data]
      };
    case Actions.EDIT_GROUP_RESPONSE:
      return {
        ...state,
        listGroup: map(state.listGroup, values => {
          if (values.idTeam === action.data.idTeam) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_GROUP_RESPONSE:
      return {
        ...state,
        listGroup: filter(state.listGroup, values => {
          return values.idTeam !== action.data;
        })
      };
    case Actions.GET_GROUP_BY_ID_RESPONSE:
      return {
        ...state,
        detail: action.data,
        listPages: action.data.pages,
        listNews: action.data.news
      };
    case Actions.GET_GROUP_BY_USER_RESPONSE:
      return {
        ...state,
        listGroupByUser: action.data
      };
    case Actions.GET_NEWS_BY_USER_RESPONSE:
      return {
        ...state,
        listNews: action.data
      };
    case Actions.GET_CATEGORIES_BY_GROUP:
      return {
        ...state,
        listCategories: action.data
      };
    default:
      return state;
  }
};

export default GroupReducer;
