import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actionCreators/authActionCreators";
import { auth } from "../../config/firebase";
import { Link, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Register from "../auth/register/Register";
import NavbarComponent from "./navbar/NavbarComponent";

const Dashboard = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    auth.signOut();
    dispatch(logoutUser());
  };

  return (
    <>
      {!path.includes("addUser") && <NavbarComponent />}
      <Switch>
        <Route exact path={path}>
          <h1>Dashboard</h1>
          <button type="button" onClick={logout}>
            Logout
          </button>
          <Link to="/admin/dashboard/addUser">Add User</Link>
        </Route>
        <Route path={`${path}/addPost`} component={() => <h1>Add Post</h1>} />
        <Route path={`${path}/posts`} component={() => <h1>All Post</h1>} />
        <Route path={`${path}/addUser`} component={() => <Register />} />
      </Switch>
    </>
  );
};

export default Dashboard;