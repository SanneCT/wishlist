const mongoose = require('mongoose');
let connections = null;

function connectToDB(DBSTRING){
    mongoose.set('strictQuery', false);
    mongoose.connect(DBSTRING)
        .then(result => {
            connections = result.connections;
            result.connections.forEach(connection => {
                console.log(`connected to ${connection.name}`)
            });
        })   
        .catch(err => {
            console.log(err);
        })
}

module.exports  = {connectToDB};