//Required-Modules
const fs = require('fs');
const chalk = require('chalk');

//empty-check
const empty = () =>  {

    if (fs.existsSync('notesInJson.json')) {

        const data = readNotes();
        if (data.length === 0) {

            return true;

        }
         else {
            return false;
        }
    }
     else {
        console.log(chalk.red.inverse('File not found!'));
    }
}
//reads from the file
const readNotes = () => {

try {
    const dataBuffer = fs.readFileSync('notesInJson.json');
   const dataString = dataBuffer.toString();
   const data = JSON.parse(dataString);
   return data;
}
catch (error) {
    return []
    }
}

//write onto the file
const writeNote = (note) => {
    const data = JSON.stringify(note);
    fs.writeFileSync('notesInJson.json' ,data);
}

//adding note after validating
const addNote = (title, body) => {
    
    const notes = readNotes();
    const checkDuplicate = notes.filter( (note) => note.title === title);
    
    if (checkDuplicate.length === 0) {

        notes.push({
            title: title,
            body: body
        })
        writeNote(notes);
        console.log(chalk.green.inverse('Note is added Successfully!'));
    }
     else {
        console.log(chalk.red.inverse('Sorry! This Title is already taken.'));
    }    
}

//deleting the note
const removeNote = (title) => {
    
    const notes = readNotes();
    const notesToKeep = notes.filter( (note) => note.title !== title);

    if (notesToKeep < notes) {

        writeNote(notesToKeep);
        console.log(chalk.green.inverse('Note is removed Successfully!'));
    }
     else {
        console.log(chalk.red.inverse('No Note found with this Title.'));
    }    
}

//Listing-all-notes
const listNotes = () => {
    
    const notes = readNotes();

    console.log(chalk.blueBright.inverse('Your Notes: '));
    notes.forEach((note) => {

        console.log(chalk.bold.red('Title: ') + chalk.green(note.title));
    });
}

//reading the note
const readNote = (title) => {
    
    const notes = readNotes();
    const requiredNote = notes.find( (note) => note.title === title);

    if (requiredNote !== undefined) {
        
        console.log(chalk.bold.red('Title: ') + chalk.green(requiredNote.title));
        console.log(chalk.bold.red('Body: ') + chalk.green(requiredNote.body));
    }
     else {
        console.log(chalk.red.inverse('No note found!'));
    }

}

//exporting methods
module.exports = {
    empty: empty,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}