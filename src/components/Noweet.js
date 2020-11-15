import React, { useState } from "react";
import { dbService, storageService } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Noweet = ({ noweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNoweet, setNewNoweet] = useState(noweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this noweet?");
    if (ok) {
      await dbService.doc(`noweets/${noweetObj.id}`).delete();
      await storageService.refFromURL(noweetObj.photoURL).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`noweets/${noweetObj.id}`).update({
      text: newNoweet
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewNoweet(value);
  };
  return (
    <div className="noweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container noweet-edit">
            <input
              type="text"
              placeholder="Edit your noweet"
              value={newNoweet}
              required
              autoFocus
              onChange={onChange}
              className="form-input"
            />
            <input type="submit" value="Update noweet" className="form-btn" />
          </form>
          <button onClick={toggleEditing} className="form-btn cancel-btn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{noweetObj.text}</h4>
          {noweetObj.photoURL && <img src={noweetObj.photoURL} alt="" />}
          {isOwner && (
            <div className="noweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Noweet;
