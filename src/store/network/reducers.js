import Actions from './actions';
import { filter, map } from 'lodash';
import { Input } from 'reactstrap';
import React from 'react';

const initialState = {
  data: {},
  detail: {},
  dataSearch: [],
  category: {}
};

const Networks = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_NETWORK_RESPONSE:
      return {
        ...state,
        data: action.data,
        detail: {},
      };
    case Actions.CREATE_NETWORK_RESPONSE:
      return {
        ...state,
        data: action.data
      };
    case Actions.EDIT_NETWORK_RESPONSE:
      return {
        ...state,
        data: map(state.data, values => {
          if (values.id === action.data.id) {
            values = action.data;
          }
          return values;
        })
      };
    case Actions.DELETE_NETWORK_RESPONSE:
      return {
        ...state,
        data: filter(state.listNetworks, values => {
          return values.id !== action.data;
        })
      };
    case Actions.GET_DETAIL_NETWORK:
      return {
        ...state,
        detail: action.data
      };
    case Actions.SEARCH_NETWORK_RESPONSE:
      return {
        ...state,
        dataSearch: action.data
      };
    case Actions.GET_BY_NETWORK_ID_RESPONSE:
      return {
        ...state,
        detail: action.data
      };
    default:
      return state;
  }
};

export default Networks;
