import React, { useState, useEffect } from "react";
import { dbService } from "myFirebase";
import Noweet from "components/Noweet";

const Home = ({ loggedInUser }) => {
  const [noweet, setNoweet] = useState("");
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
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("noweets").add({
      text: noweet,
      createdAt: Date.now(),
      creatorId: loggedInUser.uid
    });
    setNoweet("");
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNoweet(value);
  };
  console.log(noweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={noweet}
          onChange={onChange}
        />
        <input type="submit" value="Noweet" />
      </form>
      <div>
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
