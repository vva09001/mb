
const Actions = {
  GET_ROLES_REQUEST: 'GET_ROLES_REQUEST',
  GET_ROLES_RESPONSE: 'GET_ROLES_RESPONSE',

  GetRoles: () => ({
    type: Actions.GET_ROLES_REQUEST
  }),
  GET_TEAM_REQUEST: 'GET_TEAM_REQUEST',
  GET_TEAM_RESPONSE: 'GET_TEAM_RESPONSE',

  getAllTeam: () => ({
    type: Actions.GET_TEAM_REQUEST
  }),

  ADD_ROLES_REQUEST: 'ADD_ROLES_REQUEST',
  ADD_ROLES_RESPONSE: 'ADD_ROLES_RESPONSE',

  AddRoles: data => ({
    type: Actions.ADD_ROLES_REQUEST,
    data
  }),

  EDIT_ROLES_REQUEST: 'EDIT_ROLES_REQUEST',
  EDIT_ROLES_RESPONSE: 'EDIT_ROLES_RESPONSE',

  EditRole: data => ({
    type: Actions.EDIT_ROLES_REQUEST,
    data
  }),

  DELETE_ROLES_REQUEST: 'DELETE_ROLES_REQUEST',
  DELETE_ROLES_RESPONSE: 'DELETE_ROLES_RESPONSE',

  DeleteRoles: id => ({
    type: Actions.DELETE_ROLES_REQUEST,
    id
  }),

  GET_DETAIL_ROLES: 'GET_DETAIL_ROLES',

  getDetailRoles: data => ({
    type: Actions.GET_DETAIL_ROLES,
    data
  }),

  SET_PERMISSION_ROLE: 'SET_PERMISSION_ROLE',

  setPermission: (id, allowData, denyData) => ({
    type: Actions.SET_PERMISSION_ROLE,
    id,
    allowData,
    denyData
  }),

  GET_PRIVILEGE_ROLE_REQUEST: 'GET_PRIVILEGE_ROLE_REQUEST',
  GET_PRIVILEGE_ROLE_RESPONSE: 'GET_PRIVILEGE_ROLE_RESPONSE',

  getPrivilegeRole: id => ({
    type: Actions.GET_PRIVILEGE_ROLE_REQUEST,
    id
  }),
  GET_PRIVILEGE_ROLE_BY_GROUP_REQUEST: 'GET_PRIVILEGE_ROLE_BY_GROUP_REQUEST',
  GET_PRIVILEGE_ROLE_BY_GROUP_RESPONSE: 'GET_PRIVILEGE_ROLE_BY_GROUP_RESPONSE',

  getPrivilegeRoleByGroup: () => ({
    type: Actions.GET_PRIVILEGE_ROLE_BY_GROUP_REQUEST,
    
  }),
  GET_ROLE_BY_ID_REQUEST: 'GET_ROLE_BY_ID_REQUEST',
  GET_ROLE_BY_ID_RESPONSE: 'GET_ROLE_BY_ID_RESPONSE', 
  getRoleById: id => ({
    type: Actions.GET_ROLE_BY_ID_REQUEST,
    id
  })
};


export default Actions;
