import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import CallActivity from "./components/CallActivity.jsx";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import CallDetails from "./components/CallDetails.jsx";
// import CallDetails from "./pages/CallDetails.jsx";
import "./css/callActivity.css";
const App = () => {
  return (
    <Router>
      <Switch>
        <div className="container">
          <Header />
          <div className="container-view">
            <Route exact path="/" component={CallActivity} />
            <Route path="/call/:id" component={CallDetails} />
          </div>
        </div>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
