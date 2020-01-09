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

    editSettingAction: (data) => ({
      type: Actions.EDIT_SETTING_REQUEST,
      data
    }),

  GET_ENCRYPTION_REQUEST: 'GET_ENCRYPTION_REQUEST',
  GET_ENCRYPTION_RESPONSE: 'GET_ENCRYPTION_RESPONSE',

  getEncryptionAction: () => ({
    type: Actions.GET_ENCRYPTION_REQUEST
  }),
  };

  export default Actions;
