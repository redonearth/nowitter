import React, { useState } from "react";
import { dbService, storageService } from "myFirebase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NoweetFactory = ({ loggedInUser }) => {
  const [noweet, setNoweet] = useState("");
  const [photo, setPhoto] = useState("");
  const onSubmit = async (event) => {
    if (noweet === "") {
      return;
    }
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
    <form onSubmit={onSubmit} className="factory-form">
      <div className="factory-input__container">
        <input
          className="factory-input__input"
          value={noweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factory-input__arrow" />
      </div>
      <label htmlFor="attach-file" className="factory-input__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0
        }}
      />
      {photo && (
        <div className="factory-form__photo">
          <img src={photo} style={{ backgroundImage: photo }} alt="" />
          <div
            className="factory-form__clear"
            onClick={onCancelAttachmentPhoto}
          >
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NoweetFactory;
