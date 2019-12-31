import Actions from './actions';

const initialState = {
  data: [],
  detail: {}
};

const FeedbackMail = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_FEEDBACKMAIL_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default FeedbackMail;
