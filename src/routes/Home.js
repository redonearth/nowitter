import React, { useState, useEffect } from "react";
import { dbService } from "myFirebase";

const Home = ({ userObj }) => {
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
      creatorId: userObj.uid
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
          <div key={noweet.id}>
            <h4>{noweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
