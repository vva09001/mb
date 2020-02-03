import Actions from './actions';

const initialState = {
  data: []
};

const Provinces = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PROVINCE_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default Provinces;
