import { toast } from "react-toastify";
import { firestore, storage } from "../../config/firebase";
import * as types from "../types/postTypes";

const setLoading = (data) => ({
  type: types.SET_LOADING,
  payload: data
});

const addPost = (data) => ({
  type: types.ADD_POST,
  payload: data
});

const getPosts = (data) => ({
  type: types.SET_POSTS,
  payload: data
});

const addComment = (data) => ({
  type: types.ADD_COMMENT,
  payload: data
});

const deleteComment = (data) => ({
  type: types.DELETE_COMMENT,
  payload: data
});

const addReply = (data) => ({
  type: types.ADD_REPLY,
  payload: data
});

const updatePost = (data) => ({
  type: types.UPDATE_POST,
  payload: data
});

export const doPost = (data, image, setProgress) => dispatch => {
  firestore.collection("posts").add(data).then(async res => {
    const document = await res.get();
    const postData = { postData: document.data(), postId: document.id };
    const uploadRef = storage.ref(`posts/${document.id}`);

    uploadRef.put(image).on("state_change", (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    }, (err) => {
      console.log(err);
    }, async () => {
      const url = await uploadRef.getDownloadURL();
      firestore.collection("posts").doc(document.id).update({
        image: url
      }).then(() => {
        postData.postData.image = url;
        dispatch(addPost(postData));
        toast.success("Post created successfully!");
      }).catch(err => {
        console.log(err);
      })
    });
  }).catch(err => {
    console.log(err);
  });
  dispatch(setLoading(true));
};

export const fetchPosts = () => dispatch => {
  dispatch(setLoading(true));

  firestore.collection("posts").get().then(posts => {
    const allPosts = [];

    posts.forEach(post => {
      const data = {
        postData: post.data(),
        postId: post.id
      };
      allPosts.push(data);
    });
    dispatch(setLoading(false));
    dispatch(getPosts(allPosts));
  }).catch(err => {
    console.log(err);
    toast.error(err);
  });
};

export const updatePostData = (postId, prevPost, data) => dispatch => {
  const { title, description } = data;

  prevPost.postData.title = title;
  prevPost.postData.description = description;

  firestore.collection("posts").doc(postId).update({
    title,
    description
  }).then(() => {
    dispatch(updatePost({ postId, updatedPost: prevPost }));
    toast.success("Successfully Updated the post!");
  }).catch((err) => console.log(err));
};

export const doComment = (comment, postId, prevComments) => dispatch => {
  const oldComments = prevComments;
  oldComments.push(comment);

  firestore.collection("posts").doc(postId).update({
    comments: oldComments
  }).then(() => {
    dispatch(addComment({ comment, postId }));
    toast.success("Comment added Successfully!");
  }).catch(err => console.log(err));
};

export const removeComment = (index, postId, prevComments) => dispatch => {
  const filteredComments = prevComments.filter((cmt, id) => id !== index);

  firestore.collection("posts").doc(postId).update({
    comments: filteredComments
  }).then(() => {
    dispatch(deleteComment({ comment: filteredComments, postId }));
    toast.success("Comment delete Successfully!");
  }).catch(err => console.log(err));
};

export const doReply = (reply, postId, prevComments, index) => dispatch => {
  const oldComments = prevComments;
  const replies = oldComments[index].replies;
  replies.push(reply);
  oldComments[index].replies = replies;
  firestore.collection("posts").doc(postId).update({
    comments: oldComments
  }).then(() => {
    dispatch(addReply({ oldComments, postId }));
    toast.success("Reply added Successfully!");
  }).catch(err => console.log(err));
}