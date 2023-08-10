import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Count from "./components/Count";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);

    // Save the updated notes to 'localStorage'
    saveNotesToLocalStorage([...notes, newNote]);
  }

  function deleteNotes(id) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== id));

    // Save the updated notes to 'localStorage'
    saveNotesToLocalStorage(notes.filter((_, index) => index !== id));
  }

  function editNote(id, title, content) {
    const updatedNotes = notes.map((note, index) =>
      index === id ? { ...note, title, content } : note
    );
    setNotes(updatedNotes);

    // Save the updated notes to 'localStorage'
    saveNotesToLocalStorage(updatedNotes);
  }

  function saveNotesToLocalStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  return (
    <div className="App">
      <Header />
      <Count
        count={
          notes.length === 0
            ? "Empty"
            : `Showing ${notes.length} Notes in Database`
        }
      />
      <CreateArea onAdd={addNote} onEdit={editNote} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNotes}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
