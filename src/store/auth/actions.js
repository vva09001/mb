const Actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_RESPONSE: 'LOGIN_RESPONSE',

  loginAction: data => ({
    type: Actions.LOGIN_REQUEST,
    data
  }),

  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  logout: () => ({
    type: Actions.LOGOUT_REQUEST
  })
};

export default Actions;
