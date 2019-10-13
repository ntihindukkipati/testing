
const fs =  require('fs');
const yargs = require('yargs');

const notes = require('./notes.js');
const nots = require('./notes.js');

// ------------ Begin - command configuration -----------------


const idoptions = {
    describe: 'id',
    demand : true,
    alias : 'i'
}

const nameoptions = {
    describe: 'Name',
    demand : true,
    alias : 'n'
}

const emailoptions = {
    describe: 'Email',
    demand : true,
    alias : 'e'
}
const argv =  yargs

    .command('add','Add a new note',{
      Client_id: idoptions,
      Client_name: nameoptions,
        Client_email: emailoptions
    })
    .command('update','update a  note',{
    Client_id: idoptions,
    Client_name: nameoptions,
    Client_email: emailoptions
})
    .command('list','List all notes')
    .command('read','Read a note',{
        Client_id: idoptions
    })
    .command('remove','Remove a Note',{
        Client_id: idoptions,
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var note = notes.addNote(argv.Client_id,argv.Client_name,argv.Client_email);
    if (note){
      notes.logNote(note);                                //add a new note
    } else{
      console.log("Note already exists");
    }
}

else if (command === 'list') {
  var AllNotes = notes.getAll();
  console.log(`Printing ${AllNotes.length} note(s).`);
  AllNotes.forEach((note)=>{                                //list all note(s)
    notes.logNote(note);
  });
}

else if (command === 'read') {
   var note = notes.getNote(argv.Client_id);
   if(note){
    notes.logNote(note);                                //read a note 
          }
   else{
    console.log("Note not found");
   }
}
else if (command === 'remove') {
    var noteRemoved = notes.remove(argv.Client_id);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}
else if (command === 'update') {

    var noteRemove = notes.remove(argv.Client_id);
    var message = noteRemove ? 'Note updated' : 'Note not found';
    console.log(message);

        var note = notes.addNote(argv.Client_id, argv.Client_name, argv.Client_email);


   }
else{
  console.log('command not recognized');
}
