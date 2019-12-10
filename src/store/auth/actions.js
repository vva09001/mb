const Actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_RESPONSE: 'LOGIN_RESPONSE',

  loginAction: data => ({
    type: Actions.LOGIN_REQUEST,
    data
  })
};

export default Actions;
