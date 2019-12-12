const Actions = {
  GET_CATEGORY_REQUEST: 'GET_CATEGORY_REQUEST',
  GET_CATEGORY_RESPONSE: 'GET_CATEGORY_RESPONSE',

  getCategoryAction: () => ({
    type: Actions.GET_CATEGORY_REQUEST
  }),

  ADD_CATEGORY_REQUEST: 'ADD_CATEGORY_REQUEST',
  ADD_CATEGORY_RESPONSE: 'ADD_CATEGORY_RESPONSE',

  addCategoryAction: data => ({
    type: Actions.ADD_CATEGORY_REQUEST,
    data
  }),

  EDIT_CATEGORY_REQUEST: 'EDIT_CATEGORY_REQUEST',
  EDIT_CATEGORY_RESPONSE: 'EDIT_CATEGORY_RESPONSE',

  editCategoryAction: data => ({
    type: Actions.EDIT_CATEGORY_REQUEST,
    data
  }),

  DELETE_CATEGORY_REQUEST: 'DELETE_CATEGORY_REQUEST',
  DELETE_CATEGORY_RESPONSE: 'DELETE_CATEGORY_RESPONSE',

  deleteCategoryAction: id => ({
    type: Actions.DELETE_CATEGORY_REQUEST,
    id
  }),

  EXPANSION_TOOGLE: 'EXPANSION_TOOGLE',
  expansionAction: data => ({
    type: Actions.EXPANSION_TOOGLE,
    data
  })
};

export default Actions;
