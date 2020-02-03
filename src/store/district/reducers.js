import Actions from './actions';

const initialState = {
  data: []
};

const Districts = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_DISTRICT_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default Districts;
