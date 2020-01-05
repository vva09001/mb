import Actions from './actions';
import { map } from 'lodash';

const initialState = {
  dataStoreFont: [],
  dataStoreFontGeneral: {},
  dataStoreFontLogo: {},
  dataStoreFontSociallink: {},

  detail: {}
};

const StoreFont = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_STORE_FONT_RESPONSE:
     
      return {
        ...state,
        dataStoreFont: action.data,
        dataStoreFontGeneral: action.data.general, 
        dataStoreFontLogo: action.data.logo,
        dataStoreFontSociallink: action.data.socialLink
      };
    case Actions.EDIT_STORE_FONT_GENERAL_RESPONSE:
      return {
        ...state,
         dataStoreFont: map(state.data, values => {
           
             values = action.data.general;
          
          return values;
        })
      };
      case Actions.EDIT_STORE_FONT_LOGO_RESPONSE:
      return {
        ...state,
         dataStoreFont: map(state.data, values => {
           
             values = action.data.logo;
          
          return values;
        })
      };
      case Actions.EDIT_STORE_FONT_SOCIALLINK_RESPONSE:
      return {
        ...state,
         dataStoreFont: map(state.data, values => {
           
             values = action.data.socialLink;
          
          return values;
        })
      };
    default:
      return state;
  }
};

export default StoreFont;
