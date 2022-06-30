import * as types from "../types/postTypes";

const initialState = {
  isLoading: true,
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        user: action.payload.user,
        user_id: action.payload.id
      };
    case types.ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.payload
        ]
      };
    case types.SET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case types.RESET_POSTS:
      return initialState;
    default:
      return state;
  }
};

export default postReducer;