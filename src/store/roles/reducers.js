import Actions from './actions';
import { filter, map } from 'lodash';

const initialState = {
  data: [],
  detail: {},
  dataTeam: [],
  listPrivilege: [],
  listPrivilegeByGroup: []
};

const Roles = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ROLES_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.GET_TEAM_RESPONSE:
      return {
        ...state,
        dataTeam: action.data
      };
    case Actions.ADD_ROLES_RESPONSE:
      return {
        ...state,
        data: [...state.data, action.data]
      };
    case Actions.EDIT_ROLES_REQUEST:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_ROLES_RESPONSE:
      return {
        ...state,
        data: filter(state.data, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL_ROLES:
      return {
        ...state,
        detail: action.data
      };
    case Actions.GET_PRIVILEGE_ROLE_RESPONSE:
      return {
        ...state,
        listPrivilege: action.data
      };
    case Actions.GET_PRIVILEGE_ROLE_BY_GROUP_RESPONSE:
      return {
        ...state,
        listPrivilegeByGroup: action.data
      };
    default:
      return state;
  }
};

export default Roles;
