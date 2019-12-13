import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  listForm: []
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
            return (values = action.data);
          }
        })
      };
    case Actions.DELETE_FORM_RESPONSE:
      return {
        ...state,
        listForm: filter(state.listForm, values => values.id !== action.id)
      };
    default:
      return state;
  }
};

export default FormBuilder;
