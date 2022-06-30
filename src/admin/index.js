import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { loginUser } from "../redux/actionCreators/authActionCreators";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import Dashboard from "./dashboard";

const Admin = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user === null) {
        history.push("/admin/login");
        return;
      }

      const data = {
        user: user.providerData[0],
        id: user.uid
      };
      dispatch(loginUser(data));
      history.push("/admin/dashboard");
    });
  }, []);
  
  return (
    <Switch>
      <Route exact path={path} component={() => <h1>Admin Route</h1>} />
      <Route path={`${path}/login`} component={() => <Login />} />
      <Route path={`${path}/dashboard`} component={() => <Dashboard />} />
    </Switch>
  );
};

export default Admin;