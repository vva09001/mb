import Actions from './actions';
import { map } from 'lodash';

const initialState = {
  data: [],
  detail: {}
};

const FeedbackMail = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_FEEDBACK_MAIL_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.EDIT_FEEDBACK_MAILS_RESPONSE:
        return {
          ...state,
          data: map(state.data, values => {
            if (values.id === action.data.id) {
              values = action.data;
            }
          })
        };
    case Actions.GET_FEEDBACK_DETAIL:
        return {
          ...state,
          detail: action.data
        };
    case Actions.GET_RELY_MAILS_BY_ID_RESPONSE:
      return {
        ...state,
        detail: action.data
      };        
    default:
      return state;
  }
};

export default FeedbackMail;
