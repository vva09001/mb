import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {},
  ImageSelete: '',
  ListFiles: [],
  PathFolder: ''
};

const Images = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_IMAGES_RESPONSE:
      return {
        ...state,
        data: map(action.data, values => ({
          key: values.type === 'file' ? `${values.path}${values.name}` : `${values.path}`,
          modified: values.createdAt,
          id: values.id,
          path: values.path,
          size: values.size,
          name: values.name,
          url: values.url
        })),
        ListFiles: action.data
      };
    case Actions.ADD_IMAGES_RESPONSE:
      return {
        ...state,
        data: [...state.data, action.data]
      };
    case Actions.EDIT_IMAGES_RESPONSE:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_IMAGES_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL_IMAGE:
      return {
        ...state,
        detail: action.data
      };
    case Actions.SELETE_IMAGE:
      return {
        ...state,
        ImageSelete: action.data
      };
    case Actions.GET_PATH_FOLDER:
      return {
        ...state,
        PathFolder: action.data.path
      };
    default:
      return state;
  }
};

export default Images;
