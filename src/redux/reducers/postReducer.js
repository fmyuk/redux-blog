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
    case types.UPDATE_POST:
      const current = state.posts.find(
        (pst) => pst.postId === action.payload.postId
      );
      current.postData.title = action.payload.updatedPost.title;
      current.postData.description = action.payload.description;
      return {
        ...state,
        posts: state.posts.map((pst) =>
          pst.postId === action.payload.postId ? current : pst
        ),
      };
    case types.ADD_COMMENT:
      const findPost = state.posts.find(pst => pst.postId === action.payload.postId);
      const comments = findPost.postData.comments;
      comments.push(action.payload.comment);
      findPost.postData.comments = comments;
      return {
        ...state,
        posts: state.posts.map(pt => pt.postId === action.payload.postId ? findPost : pt)
      };
    case types.DELETE_COMMENT:
      const currentPost = state.posts.find(pst => pst.postId === action.payload.postId);
      const filteredComments = currentPost.postData.comments.filter((cmt, index) => index !== action.payload.index);
      currentPost.postData.comments = filteredComments;
      return {
        ...state,
        posts: state.posts.map(pt => pt.postId === action.payload.postId ? currentPost : pt)
      };
    case types.ADD_REPLY:
      const oldPost = state.posts.find(pst => pst.postId === action.payload.postId);
      oldPost.postData.comments = action.payload.oldComments;
      return {
        ...state,
        posts: state.posts.map(pt => pt.postId === action.payload.postId ? oldPost : pt)
      };
    default:
      return state;
  }
};

export default postReducer;