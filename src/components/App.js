import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(loggedInUser)}
          loggedInUser={loggedInUser}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
