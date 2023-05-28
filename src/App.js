
import React , {useState} from "react";
import {nanoid} from "nanoid"
import Sidebar from "./components/Sidebar";
import Split from "react-split"
import Editor from "./components/Editor";

export default function App() {

  const [notes,setNotes] = useState([])
  const [currentNoteId,setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  )

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "Type your note's title here"
    }

    setNotes(prevNotes => [newNote,...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text){
    setNotes(oldNotes => oldNotes.map(oldNote => {
        return oldNote.id === currentNoteId ? {...oldNote, body: text} : oldNote
    }))
  }

  function findCurrentNode(){
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }


  return (
    <main>
      {
        notes.length > 0 ?
        <Split
            sizes={[30,70]}
            direction="horizontal"
            className="split"
        >
            <Sidebar
                notes={notes}
                currentNote={findCurrentNode()}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
            />
            {
              currentNoteId && 
              notes.length > 0 && 
              <Editor 
                  currentNote={findCurrentNode()}
                  updateNote={updateNote}
              />
            }
        </Split>
        :

            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
      }
    </main>
  );
}

