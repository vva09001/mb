import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  listSlider: [],
  detail: {}
};

const Slider = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SLIDER_RESPONSE:
      return {
        ...state,
        listSlider: action.data
      };
    case Actions.CREATE_SLIDER_RESPONSE:
      return {
        ...state,
        listSlider: [...state.data, action.data]
      };
    case Actions.EDIT_SLIDER_RESPONSE:
      return {
        ...state,
        listSlider: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_SLIDER_RESPONSE:
      return {
        ...state,
        listSlider: filter(state.data, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL_SLIDER:
      return {
        ...state,
        detail: action.data
      };
    default:
      return state;
  }
};

export default Slider;
