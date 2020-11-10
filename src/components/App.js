import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setLoggedInUser(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setLoggedInUser({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
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
