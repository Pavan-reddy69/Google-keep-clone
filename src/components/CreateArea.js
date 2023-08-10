import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import "./CreateArea.css";
function CreateArea({ onAdd, onEdit, editNote }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleExpanded = () => {
    setExpanded(true);
  };

  const submitButton = (event) => {
    event.preventDefault();

    if (editNote) {
      // Editing an existing note
      onEdit(editNote.id, note.title, note.content);
    } else {
      // Adding a new note
      onAdd(note);
    }

    // Clear the 'note' state to create a new empty note
    setNote({
      title: "",
      content: "",
    });
  };

  return (
    <div>
      <form>
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Enter Title"
            name="title"
            onChange={handleChange}
            required
          />
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Enter Note Details"
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
            required
          ></textarea>
        </p>
        <button className="add-button" onClick={submitButton} disabled={!note.title && !note.content}>
          {editNote ? "Save" : <IoIosAdd size={35} />}
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
