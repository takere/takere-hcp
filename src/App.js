import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoute/protectedRoute";
import {AppPage} from "./routes/app/app";
import {Login} from "./routes/login/login";
import React from "react";
import NotProtectedRoute from "./routes/protectedRoute/notProtectedRoute";

function App() {

  return (
      <Router>
              <Switch>
                <NotProtectedRoute exact path="/login" component={Login} />
                <ProtectedRoute path="*" component={AppPage} />
              </Switch>
      </Router>
  );
}

export default App;
