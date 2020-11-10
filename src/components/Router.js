import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, loggedInUser }) => {
  return (
    <Router>
      {loggedInUser && <Navigation loggedInUser={loggedInUser} />}
      <Switch>
        {loggedInUser ? (
          <>
            <Route exact path="/">
              <Home loggedInUser={loggedInUser} />
            </Route>
            <Route exact path="/profile">
              <Profile loggedInUser={loggedInUser} refreshUser={refreshUser} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
