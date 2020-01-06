const Actions = {

    GET_STORE_FONT_REQUEST: 'GET_STORE_FONT_REQUEST',
    GET_STORE_FONT_RESPONSE: 'GET_STORE_FONT_RESPONSE',
    getStoreFontAction: (name, data) => ({
      type: Actions.GET_STORE_FONT_REQUEST,
      name, 
      data
    }),

    EDIT_STORE_FONT_GENERAL_REQUEST: 'EDIT_STORE_FONT_GENERAL_REQUEST',
    EDIT_STORE_FONT_GENERAL_RESPONSE: 'EDIT_STORE_FONT_GENERAL_RESPONSE',
    editStoreFontGeneralAction: data => ({
      type: Actions.EDIT_STORE_FONT_GENERAL_REQUEST,
      data
    }),

    EDIT_STORE_FONT_LOGO_REQUEST: 'EDIT_STORE_FONT_LOGO_REQUEST',
    EDIT_STORE_FONT_LOGO_RESPONSE: 'EDIT_STORE_FONT_LOGO_RESPONSE',
    editStoreFontLogoAction: data => ({
      type: Actions.EDIT_STORE_FONT_LOGO_REQUEST,
      data
    }),

    EDIT_STORE_FONT_SOCIALLINK_REQUEST: 'EDIT_STORE_FONT_SOCIALLINK_REQUEST',
    EDIT_STORE_FONT_SOCIALLINK_RESPONSE: 'EDIT_STORE_FONT_SOCIALLINK_RESPONSE',
    editStoreFontSocialLinkAction: data => ({
      type: Actions.EDIT_STORE_FONT_SOCIALLINK_REQUEST,
      data
    }),
  };
    

  export default Actions;