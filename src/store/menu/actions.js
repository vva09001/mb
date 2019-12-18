const Actions = {
  GET_MENUS_REQUEST: 'GET_MENUS_REQUEST',
  GET_MENUS_RESPONSE: 'GET_MENUS_RESPONSE',

  GetMenus: () => ({
    type: Actions.GET_MENUS_REQUEST
  }),

  ADD_MENUS_REQUEST: 'ADD_MENUS_REQUEST',
  ADD_MENUS_RESPONSE: 'ADD_MENUS_RESPONSE',

  AddMenus: data => ({
    type: Actions.ADD_MENUS_REQUEST,
    data
  }),

  EDIT_MENUS_REQUEST: 'EDIT_MENUS_REQUEST',
  EDIT_MENUS_RESPONSE: 'EDIT_MENUS_RESPONSE',

  EditMenus: (data, onSuccess, onFail) => ({
    type: Actions.EDIT_MENUS_REQUEST,
    data,
    onSuccess,
    onFail
  }),

  DELETE_MENUS_REQUEST: 'DELETE_MENUS_REQUEST',
  DELETE_MENUS_RESPONSE: 'DELETE_MENUS_RESPONSE',

  DeleteMenus: id => ({
    type: Actions.DELETE_MENUS_REQUEST,
    id
  }),

  GET_DETAIL_MENU: 'GET_DETAIL_MENU',

  getDetailMenus: data => ({
    type: Actions.GET_DETAIL_MENU,
    data
  })
};

export default Actions;
