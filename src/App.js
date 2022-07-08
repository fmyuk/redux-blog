import { Route, Switch } from 'react-router-dom';
import Admin from "./admin";
import { ToastContainer } from "react-toastify";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from './redux/actionCreators/postActionCreators';
import SeePost from './components/seepost/SeePost';
import Home from './components/home/Home';
import NavbarComponent from './components/navbar/NavbarComponent';
import SubNavbar from './components/subnavbar/SubNavbar';
import { loginUser } from './redux/actionCreators/authActionCreators';
import { auth } from './config/firebase';
import Posts from './components/posts/Posts';
import './App.css';

export const App = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isLoading } = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.post.isLoading
  }), shallowEqual);

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchPosts());
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      const data = {
        user: user.providerData[0],
        id: user.uid
      };
      dispatch(loginUser(data));
    });
  }, []);
  
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          {isLoggedIn && <SubNavbar />}
          <NavbarComponent />
          <Home />
        </Route>
        <Route path="/posts">
          {isLoggedIn && <SubNavbar />}
          <NavbarComponent />
          <Posts />
        </Route>
        <Route path="/post/:postId" component={() => <SeePost />} />
        <Route path="/admin" component={() => <Admin />} />
      </Switch>
    </div>
  );
};
