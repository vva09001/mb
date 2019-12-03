import Actions from './actions';

const initialState = {
  data: []
};

const News = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_NEWS_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default News;
