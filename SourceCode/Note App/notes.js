const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchNotes = () => {
  try {                          //if file won't exist
    var notesString = fs.readFileSync('notes-data.json')
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};


// ------------------End of Reusable functions ---------------------


//  to add a new note

var addNote = (Client_id,Client_name,Client_email) => {
    var notes = fetchNotes();
    var note = {Client_id,Client_name,Client_email};

    var duplicateNotes =  notes.filter((note) => {  // to check if note already exists
    return note.Client_id === Client_id;
    });

    if (duplicateNotes.length === 0){
      notes.push(note);
      saveNotes(notes);
      return note
    }

  };


//to list all the notes

var getAll = () => {
    return fetchNotes();
};


// to read a note

var getNote = (Client_id) => {
    
    var notes = fetchNotes();

    var getNotes =  notes.filter((note) => {  // to check if note exists and return note
      return note.Client_id === Client_id;
    });

    return getNotes[0]

};


// to delete a note

var remove = (Client_id) => {

    var notes = fetchNotes();        // reusable func

    var filteredNotes =  notes.filter((note) => { // will return all other notes other than "note to be removed"
      return note.Client_id !== Client_id;
    });

    saveNotes(filteredNotes);      //save new notes array

    return notes.length !== filteredNotes.length
    
};
var update = (argv_Client_id,argv_Client_name,argv_Client_email) => {
    var notes = fetchNotes();        // reusable func


   };

// function just to print out note to screen

var logNote = (note) => { 
  console.log('--');
  console.log(`Client_id: ${note.Client_id}`);
  console.log(`Client_name: ${note.Client_name}`);
  console.log(`Client_email: ${note.Client_email}`);
};

// add new function names here to be accessible from other modules

module.exports = {
  addNote, getAll, remove, getNote,logNote,update
};
