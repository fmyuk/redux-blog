import * as types from "../types/authTypes";

const setUser = (data) => ({
  type: types.SET_USER,
  payload: data
});

const resetUser = () => ({
  type: types.RESET_USER
});

export const loginUser = (data) => dispatch => {
  dispatch(setUser(data));
};

export const logoutUser = () => dispatch => {
  dispatch(resetUser());
};