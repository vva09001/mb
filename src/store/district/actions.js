const Actions = {
  GET_DISTRICT_REQUEST: 'GET_DISTRICT_REQUEST',
  GET_DISTRICT_RESPONSE: 'GET_DISTRICT_RESPONSE',

  getDistrictAction: id => ({
    type: Actions.GET_DISTRICT_REQUEST,
    id
  })

};

export default Actions;
