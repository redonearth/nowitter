import React, { useState } from "react";
import { dbService, storageService } from "myFirebase";
import { v4 as uuidv4 } from "uuid";

const NoweetFactory = ({ loggedInUser }) => {
  const [noweet, setNoweet] = useState("");
  const [photo, setPhoto] = useState("");
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
  );
};

export default NoweetFactory;
