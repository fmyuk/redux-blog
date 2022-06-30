import { Route, Switch } from 'react-router-dom';
import Admin from "./admin";
import { ToastContainer } from "react-toastify";
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <h1>Hello</h1>
        </Route>
        <Route path="/admin" component={() => <Admin />} />
      </Switch>
    </div>
  );
};
