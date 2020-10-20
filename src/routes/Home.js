import React, { useState, useEffect } from "react";
import { dbService } from "myFirebase";

const Home = () => {
  const [noweet, setNoweet] = useState("");
  const [noweets, setNoweets] = useState([]);
  const getNoweets = async () => {
    const dbNoweets = await dbService.collection("noweets").get();
    dbNoweets.forEach((document) => {
      const noweetObject = {
        ...document.data(),
        id: document.id
      };
      setNoweets((prev) => [noweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNoweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("noweets").add({
      noweet,
      createdAt: Date.now()
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
            <h4>{noweet.noweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
