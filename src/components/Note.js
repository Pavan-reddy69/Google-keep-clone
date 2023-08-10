import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import './Note.css'

function Note({ id, title, content, onDelete, onEdit }) {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(id, editedTitle, editedContent);
    setEditing(false);
  };

  return (
    <div className={`note ${isEditing ? "editing" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={3}
          ></textarea>
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <div className="note-header">
            <MdEdit
              id="edit"
              className="edit"
              size={25}
              onClick={handleEditClick}
              style={{ color: "#4285F4", cursor: "pointer" }}
            />
            <MdDelete
              id="delete"
              className="delete"
              size={25}
              onClick={() => onDelete(id)}
              style={{ color: "#DB4437", cursor: "pointer" }}
            />
          </div>
          <h1>{title}</h1>
          <p>{content}</p>
        </>
      )}
    </div>
  );
}

export default Note;
