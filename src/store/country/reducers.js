import Actions from './actions';
import { map } from 'lodash';

const initialState = {
  detail:[],
};

const Country = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_COUNTRY_RESPONSE:
      return {
        ...state,
        detail: map(action.data, values => ({
          value: values.id,
          label: values.name,
        }))
      };
    default:
      return state;
  }
};

export default Country;
