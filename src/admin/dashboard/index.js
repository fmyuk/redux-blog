import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actionCreators/authActionCreators";
import { auth } from "../../config/firebase";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Register from "../auth/register/Register";
import NavbarComponent from "./navbar/NavbarComponent";
import AddPost from "./addpost/AddPost";
import AllPosts from "./allposts/AllPosts";
import EditPost from "./editpost/EditPost";
import Home from "./home/Home";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const logout = () => {
    auth.signOut();
    dispatch(logoutUser());
  };

  return (
    <>
      {!path.includes("addUser") && <NavbarComponent logout={logout} />}
      <Switch>
        <Route exact path={path} component={() => <Home />} />
        <Route path={`${path}/addPost`} component={() => <AddPost />} />
        <Route path={`${path}/posts`} component={() => <AllPosts />} />
        <Route path={`${path}/addUser`} component={() => <Register />} />
        <Route path={`${path}/post/:postId/edit`} component={() => <EditPost />} />
      </Switch>
    </>
  );
};

export default Dashboard;