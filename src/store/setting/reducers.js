import Actions from './actions';
import { map } from 'lodash';

const initialState = {
  setting: [],
  detail: {}
};

const Slider = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SETTING_RESPONSE:
      return {
        ...state,
        setting: action.data
      };
    case Actions.CREATE_SETTING_RESPONSE:
      return {
        ...state,
        setting: [...state.data, action.data]
      };
    case Actions.EDIT_SETTING_RESPONSE:
      return {
        ...state,
        setting: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    default:
      return state;
  }
};

export default Slider;