import Actions from './actions';
import { map } from 'lodash';

const initialState = {
  setting:{},
  customerFontend: {},
  generals: {},
  mailSettings: {},
  country: [],
  encryption:[],
};

const Slider = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SETTING_RESPONSE:
        if (action.data[0].generals.defaulCountries.id && action.data[0].generals.defaulCountries) {
          action.data[0].generals.defaulCountries = action.data[0].generals.defaulCountries.id;
      }
        if (action.data[0].mailSettings.encryptions.id && action.data[0].mailSettings.encryptions) {
          action.data[0].mailSettings.encryptions = action.data[0].mailSettings.encryptions.id;
      }
      return {
        ...state,
        setting: action.data[0],
        customerFontend:  action.data[0].customerFontends,
        generals:   action.data[0].generals,
        mailSettings:  action.data[0].mailSettings
      };
    case Actions.GET_ENCRYPTION_RESPONSE:
      return {
        ...state,
        encryption: action.data
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
