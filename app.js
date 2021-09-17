//Required-Modules
const notes= require('./notes.js');
const yargs = require('yargs');

//updating-version
yargs.version('1.1.0');

//initializing the commands

// 1. Add Command
yargs.command({
    command: 'add',
    describe: 'Adding the Note',
    builder:{
            title: {
                describe: 'Title of the Note',
                type: 'string',
                demandOption: true
            },

            body: {
                describe: 'Body of the Note',
                type: 'string',
                demandOption: true
            }
    },

    handler (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// 2. remove Command
yargs.command({
    command: 'remove',
    describe: 'removing the Note',
    builder:{
            title: {
                describe: 'Title of the Note',
                type: 'string',
                demandOption: true
            }
    },

    handler (argv) {
        notes.removeNote(argv.title)
    }
})

// 3. list Command
yargs.command({
    command: 'list',
    describe: 'List all present Notes',
    builder:{
            all: {
                describe: 'For all confirmation',
                type: 'string',
                demandOption: false
            }
    },

    handler () {
        notes.listNotes();
    }
})

// 4. read Command
yargs.command({
    command: 'read',
    describe: 'gives the note',
    builder:{
            title: {
                describe: 'required note title',
                type: 'string',
                demandOption: true
            }
    },

    handler (argv) {
        notes.readNote(argv.title);
    }
})

// yargs in the end
yargs.parse();