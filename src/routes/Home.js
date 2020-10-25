import React, { useState, useEffect } from "react";
import { dbService } from "myFirebase";
import Noweet from "components/Noweet";

const Home = ({ loggedInUser }) => {
  const [noweet, setNoweet] = useState("");
  const [noweets, setNoweets] = useState([]);
  const [photo, setPhoto] = useState();
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
  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setPhoto(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onCancelAttachmentPhoto = () => setPhoto(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Noweet" />
        {photo && (
          <div>
            <img src={photo} width="50px" height="50px" alt="" />
            <button onClick={onCancelAttachmentPhoto}>Cancel upload</button>
          </div>
        )}
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
