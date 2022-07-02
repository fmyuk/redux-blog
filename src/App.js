import { Route, Switch } from 'react-router-dom';
import Admin from "./admin";
import { ToastContainer } from "react-toastify";
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from './redux/actionCreators/postActionCreators';
import SeePost from './components/seepost/SeePost';

export const App = () => {
  const isLoading = useSelector(state => state.post.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchPosts());
    }
  }, [isLoading, dispatch]);
  
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <h1>Hello</h1>
        </Route>
        <Route path="/post/:postId" component={() => <SeePost />} />
        <Route path="/admin" component={() => <Admin />} />
      </Switch>
    </div>
  );
};
