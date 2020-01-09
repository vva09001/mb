const Actions = {
    GET_SLIDER_REQUEST: 'GET_SLIDER_REQUEST',
    GET_SLIDER_RESPONSE: 'GET_SLIDER_RESPONSE',

    getSliderAction: () => ({
      type: Actions.GET_SLIDER_REQUEST
    }),

    GET_SLIDER_BY_ID_REQUEST: 'GET_SLIDER_BY_ID_REQUEST',
    GET_SLIDER_BY_ID_RESPONSE: 'GET_SLIDER_BY_ID_RESPONSE',

    getSliderIdAction: id => ({
      type: Actions.GET_SLIDER_BY_ID_REQUEST,
      id
    }),

    CREATE_SLIDER_REQUEST: 'CREATE_SLIDER_REQUEST',
    CREATE_SLIDER_RESPONSE: 'CREATE_SLIDER_RESPONSE',

    createSliderAction: (data, onSuccess, onFail) => ({
      type: Actions.CREATE_SLIDER_REQUEST,
      data,
      onSuccess,
      onFail
    }),

    EDIT_SLIDER_REQUEST: 'EDIT_SLIDER_REQUEST',
    EDIT_SLIDER_RESPONSE: 'EDIT_SLIDER_RESPONSE',

    editSliderAction: (data, onSuccess, onFail) => ({
      type: Actions.EDIT_SLIDER_REQUEST,
      data,
      onSuccess,
      onFail
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
