import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  listForm: [],
  detail: {}
};

const FormBuilder = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_FORM_RESPONSE:
      return {
        ...state,
        listForm: action.data
      };
    case Actions.CREATE_FROM_REQUEST:
      return {
        ...state,
        listForm: [...state.listForm, action.data]
      };
    case Actions.EDIT_FORM_RESPONSE:
      return {
        ...state,
        listForm: map(state.listForm, values => {
          if (values.id === action.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_FORM_RESPONSE:
      return {
        ...state,
        listForm: filter(state.listForm, values => values.id !== action.data)
      };
    case Actions.GET_FORM_DETAIL:
      return {
        ...state,
        detail: action.detail
      };
    default:
      return state;
  }
};

export default FormBuilder;
