import * as types from "../types/authTypes";

const initialState = {
  isLoggedIn: false,
  user: null,
  user_id: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        isLoggedIn: true,
        user: action.payload.user,
        user_id: action.payload.id
      };
    case types.RESET_USER:
      return {
        ...initialState
      }
    default:
      return state;
  }
};

export default authReducer;