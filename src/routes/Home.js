import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "myFirebase";
import Noweet from "components/Noweet";

const Home = ({ loggedInUser }) => {
  const [noweet, setNoweet] = useState("");
  const [noweets, setNoweets] = useState([]);
  const [photo, setPhoto] = useState("");
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
    let photoURL = "";
    if (photo !== "") {
      const photoRef = storageService
        .ref()
        .child(`${loggedInUser.uid}/${uuidv4()}`);
      const response = await photoRef.putString(photo, "data_url");
      photoURL = await response.ref.getDownloadURL();
    }
    const noweetObj = {
      text: noweet,
      createdAt: Date.now(),
      creatorId: loggedInUser.uid,
      photoURL
    };
    await dbService.collection("noweets").add(noweetObj);
    setNoweet("");
    setPhoto("");
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
    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  };
  const onCancelAttachmentPhoto = () => setPhoto("");
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
