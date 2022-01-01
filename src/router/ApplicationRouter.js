
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TesterPage from "../template/TesterPage";
import UserPage from "../template/UserPage";
import ResultPage from "../template/ResultPage";
import HomePage from "../template/HomePage";

const router = () => (
  <div style={style.background}>
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/user-info" component={UserPage} />
      <Route exact path="/covid-test" component={TesterPage} />
      <Route exact path="/covid-result" component={ResultPage} />
    </Router>
  </div>
)

const style = {
  background: {
  }
}

export default router;