import Actions from './actions';

const initialState = {
  profile: {}
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN_RESPONSE:
      return {
        ...state,
        profile: action.data
      };
    default:
      return state;
  }
};

export default Auth;
