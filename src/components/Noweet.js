import React, { useState } from "react";
import { dbService } from "myFirebase";

const Noweet = ({ noweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNoweet, setNewNoweet] = useState(noweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this noweet?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`noweets/${noweetObj.id}`).delete();
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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your noweet"
              value={newNoweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update noweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{noweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Noweet</button>
              <button onClick={toggleEditing}>Edit Noweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Noweet;
