import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {}
};

const Slider = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SLIDER_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.CREATE_SLIDER_RESPONSE:
      return {
        ...state,
        data: [...state.data, action.data]
      };
    case Actions.EDIT_SLIDER_RESPONSE:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_SLIDER_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL_SLIDER:
      return {
        ...state,
        detail: action.data
      };
    case Actions.GET_SLIDER_BY_ID_RESPONSE:
      return {
        ...state,
        detail: action.data
      };
    default:
      return state;
  }
};

export default Slider;
