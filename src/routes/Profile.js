import React, { useState } from "react";
import { authService } from "myFirebase";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, loggedInUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(
    loggedInUser.displayName
  );
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (loggedInUser.displayName !== newDisplayName) {
      await loggedInUser.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};
