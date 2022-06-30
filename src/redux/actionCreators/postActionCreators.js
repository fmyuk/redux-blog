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

const resetPosts = (data) => ({
  type: types.RESET_POSTS
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