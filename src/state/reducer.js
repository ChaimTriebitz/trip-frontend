import { ACTIONS } from './actions';

export const reducer = (state, action) => {
   switch (action.type) {
      // payload => string
      case ACTIONS.UPDATE_PAGE_NAME:
         return { ...state, page: action.payload, }
      // payload => object
      case ACTIONS.UPDATE_DATA:
         return { ...state, data: action.payload }
      default:
         return state
   }
};

