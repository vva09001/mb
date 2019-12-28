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
  }),
  GET_MENUITEMS_REQUEST: 'GET_MENUITEMS_REQUEST',
  GET_MENUITEMS_RESPONSE: 'GET_MENUITEMS_RESPONSE',

  GetMenuItems: id => ({
    type: Actions.GET_MENUITEMS_REQUEST,
    id
  }),

  ADD_MENUITEMS_REQUEST: 'ADD_MENUITEMS_REQUEST',
  ADD_MENUITEMS_RESPONSE: 'ADD_MENUITEMS_RESPONSE',

  AddMenuItems: (id, data) => ({
    type: Actions.ADD_MENUITEMS_REQUEST,
    id,
    data
  }),

  EDIT_MENUITEMS_REQUEST: 'EDIT_MENUITEMS_REQUEST',
  EDIT_MENUITEMS_RESPONSE: 'EDIT_MENUITEMS_RESPONSE',

  EditMenuItems: data => ({
    type: Actions.EDIT_MENUITEMS_REQUEST,
    data
  }),

  DELETE_MENUITEMS_REQUEST: 'DELETE_MENUITEMS_REQUEST',
  DELETE_MENUITEMS_RESPONSE: 'DELETE_MENUITEMS_RESPONSE',

  DeleteMenuItems: data => ({
    type: Actions.DELETE_MENUITEMS_REQUEST,
    data
  }),

  GET_DETAIL_MENUITEM: 'GET_DETAIL_MENUITEM',

  getDetailMenuItems: data => ({
    type: Actions.GET_DETAIL_MENUITEM,
    data
  }),

  EXPANSION_TOOGLE_MENUITEM: 'EXPANSION_TOOGLE_MENUITEM',
  expansionMenuItemAction: data => ({
    type: Actions.EXPANSION_TOOGLE_MENUITEM,
    data
  }),

  UPDATE_POSITION_MENUITEM: 'UPDATE_POSITION_MENUITEM',
  updatePositionMenuItems: (idMenuItem, idParent, positions) => ({
    type: Actions.UPDATE_POSITION_MENUITEM,
    idMenuItem,
    idParent,
    positions
  }),

  GET_ALL_MENUITEM: 'GET_ALL_MENUITEM'
};

export default Actions;
