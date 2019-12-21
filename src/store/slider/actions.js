const Actions = {
    GET_SLIDER_REQUEST: 'GET_SLIDER_REQUEST',
    GET_SLIDER_RESPONSE: 'GET_SLIDER_RESPONSE',
  
    getSliderAction: () => ({
      type: Actions.GET_SLIDER_REQUEST
    }),
  
    CREATE_SLIDER_REQUEST: 'CREATE_SLIDER_REQUEST',
    CREATE_SLIDER_RESPONSE: 'CREATE_SLIDER_RESPONSE',
  
    createSliderAction: data => ({
      type: Actions.CREATE_SLIDER_REQUEST,
      data
    }),
  
    EDIT_SLIDER_REQUEST: 'EDIT_SLIDER_REQUEST',
    EDIT_SLIDER_RESPONSE: 'EDIT_SLIDER_RESPONSE',
  
    editSliderAction: (id, data) => ({
      type: Actions.EDIT_SLIDER_REQUEST,
      id,
      data
    }),
  
    DELETE_SLIDER_REQUEST: 'DELETE_SLIDER_REQUEST',
    DELETE_SLIDER_RESPONSE: 'DELETE_SLIDER_RESPONSE',
  
    deleteSliderAction: id => ({
      type: Actions.DELETE_SLIDER_REQUEST,
      id
    }),
  
    GET_DETAIL_SLIDER: 'GET_DETAIL_SLIDER',
  
    getDetailSliderAction: data => ({
      type: Actions.GET_DETAIL_SLIDER,
      data
    })
  };
  
  export default Actions;