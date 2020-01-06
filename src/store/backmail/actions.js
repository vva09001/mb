const Actions = {
  ADD_FEEDBACKMAIL_REQUEST: 'ADD_FEEDBACKMAIL_REQUEST',
  ADD_FEEDBACKMAIL_RESPONSE: 'ADD_FEEDBACKMAIL_RESPONSE',

  AddFeedbackMail: data => ({
    type: Actions.ADD_FEEDBACKMAIL_REQUEST,
    data
  })
};
export default Actions;
