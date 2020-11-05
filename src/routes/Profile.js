import React, { useEffect } from "react";
import { authService, dbService } from "myFirebase";
import { useHistory } from "react-router-dom";

export default ({ loggedInUser }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNoweets = async () => {
    const noweets = await dbService
      .collection("noweets")
      .where("creatorId", "==", loggedInUser.uid)
      .orderBy("createdAt", "desc")
      .get();
    console.log(noweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyNoweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};
