const Actions = {
  GET_IMAGES_REQUEST: 'GET_IMAGES_REQUEST',
  GET_IMAGES_RESPONSE: 'GET_IMAGES_RESPONSE',

  GetImages: () => ({
    type: Actions.GET_IMAGES_REQUEST
  }),

  ADD_IMAGES_REQUEST: 'ADD_IMAGES_REQUEST',
  ADD_IMAGES_RESPONSE: 'ADD_IMAGES_RESPONSE',

  AddImages: data => ({
    type: Actions.ADD_IMAGES_REQUEST,
    data
  }),

  EDIT_IMAGES_REQUEST: 'EDIT_NEWS_REQUEST',
  EDIT_IMAGES_RESPONSE: 'EDIT_IMAGE_REPONSE',

  EditImages: data => ({
    type: Actions.EDIT_IMAGES_REQUEST,
    data
  }),

  DELETE_IMAGES_REQUEST: 'DELETE_IMAGES_REQUEST',
  DELETE_IMAGES_RESPONSE: 'DELETE_IMAGES_RESPONSE',

  DeleteImages: id => ({
    type: Actions.DELETE_IMAGES_REQUEST,
    id
  }),

  GET_DETAIL_IMAGE: 'GET_DETAI_IMAGE',

  GetDetailImage: data => ({
    type: Actions.GET_DETAIL_IMAGE,
    data
  }),

  MOVE_FOLDER: 'MOVE_FOLDER',

  MoveFolder: data => ({
    type: Actions.MOVE_FOLDER,
    data
  }),

  MOVE_FILE: 'MOVE_FILE',

  MoveFile: (id, data) => ({
    type: Actions.MOVE_FILE,
    id,
    data
  }),

  RENAME_FOLDER: "RENAME_FOLDER",

  RenameFolder: data => ({
    type: Actions.RENAME_FOLDER,
    data
  }),

  CREATE_FOLDER: "CREATE_FOLDER",

  CreatFolder: data => ({
    type: Actions.CREATE_FOLDER,
    data
  }),

  DELETE_FOLDER: "DELETE_FOLDER",

  DeleteFolder: data => ({
    type: Actions.DELETE_FOLDER,
    data
  })
};



export default Actions;
