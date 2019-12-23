import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  listBlocks: [],
  detail: {}
};

const Block = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_BLOCK_RESPONSE:
      return {
        ...state,
        listBlocks: action.data
      };
    case Actions.CREATE_BLOCK_RESPONSE:
      return {
        ...state,
        listBlocks: [...state.listBlocks, action.data]
      };
    case Actions.EDIT_BLOCK_RESPONSE:
      return {
        ...state,
        listBlocks: map(state.listBlocks, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_BLOCK_RESPONSE:
      return {
        ...state,
        listBlocks: filter(state.listBlocks, values => {
          return values.id !== action.id;
        })
      };
    case Actions.GET_BLOCK_DETAIL:
      return {
        ...state,
        detail: action.data
      };
    default:
      return state;
  }
};

export default Block;
