const Actions = {
    GET_SETTING_REQUEST: 'GET_SETTING_REQUEST',
    GET_SETTING_RESPONSE: 'GET_SETTING_RESPONSE',
  
    getSettingAction: () => ({
      type: Actions.GET_SETTING_REQUEST
    }),
  
    CREATE_SETTING_REQUEST: 'CREATE_SETTING_REQUEST',
    CREATE_SETTING_RESPONSE: 'CREATE_SETTING_RESPONSE',
  
    createSettingAction: data => ({
      type: Actions.CREATE_SETTING_REQUEST,
      data
    }),
  
    EDIT_SETTING_REQUEST: 'EDIT_SETTING_REQUEST',
    EDIT_SETTING_RESPONSE: 'EDIT_SETTING_RESPONSE',
  
    editSettingAction: (id, data) => ({
      type: Actions.EDIT_SETTING_REQUEST,
      id,
      data
    }),
  
  };
  
  export default Actions;