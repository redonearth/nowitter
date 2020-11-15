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
    <div className="container">
      <form onSubmit={onSubmit} className="profile-form">
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          autoFocus
          onChange={onChange}
          className="form-input"
        />
        <input
          type="submit"
          value="Update Profile"
          className="form-btn"
          style={{ marginTop: 10 }}
        />
      </form>
      <button className="form-btn cancel-btn log-out" onClick={onLogOutClick}>
        Log Out
      </button>
    </div>
  );
};
