import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Dashboard} from "./routes/dashboard/dashboard";

function App() {
  return (
      <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
      </Router>
  );
}

export default App;
