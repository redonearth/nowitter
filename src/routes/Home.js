import React, { useState } from "react";
import { dbService } from "myFirebase";

const Home = () => {
  const [noweet, setNoweet] = useState("");
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
    </div>
  );
};
export default Home;
