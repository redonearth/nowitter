import React, { useState, useEffect } from "react";
import { dbService } from "myFirebase";
import Noweet from "components/Noweet";
import NoweetFactory from "components/NoweetFactory";

const Home = ({ loggedInUser }) => {
  const [noweets, setNoweets] = useState([]);
  useEffect(() => {
    dbService.collection("noweets").onSnapshot((snapshot) => {
      const noweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setNoweets(noweetArray);
    });
  }, []);
  return (
    <div className="container">
      <NoweetFactory loggedInUser={loggedInUser} />
      <div style={{ marginTop: 30 }}>
        {noweets.map((noweet) => (
          <Noweet
            key={noweet.id}
            noweetObj={noweet}
            isOwner={noweet.creatorId === loggedInUser.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
