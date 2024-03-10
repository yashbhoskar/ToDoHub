// // MongoDBAtlas#Y31

const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require('cors');
// const mongoose = require('mongoose');
const multer = require("multer");

const app = Express();
app.use(cors());
// // todohub pass :: bQXXblntVmcUwCn4 
const password = encodeURIComponent('bQXXblntVmcUwCn4');
const CONNECTION_STRING = `mongodb+srv://todohubDB:${password}@cluster0.khfq1dj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const DATABASE_NAME = "todohub";

let database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true, sslValidate: true }, (err, client) => {
        if (err) {
            console.error("++++++++++++Error connecting to MongoDB:++++++++++++", err);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log("----------MongoDB connection successful--------------");
    });
});

app.get('/api/todohub/GetAllNotes', (req, res) => {
    database.collection("ToDoHubCollection").find({}).toArray((err, result) => {
        res.send(result);
    })
})

app.post('/api/todohub/AddNote',multer().none(),(req, res) => {
    database.collection("ToDoHubCollection").count({}, function(err, numOfDoc){
        database.collection("ToDoHubCollection").insertOne({
            id:(numOfDoc+1).toString(),
            description: req.body.newNote
        })
        res.json("success");
    })
})

app.delete('/api/todohub/DeleteNote',(req, res) =>{
    console.log(req);
    database.collection("ToDoHubCollection").deleteOne({
        id:req.query.id 
    });
    res.json("delete success");
})

// app.delete('/api/todohub/DeleteAll', (res, req) => {
//     debugger
//     database.collection("ToDoHubCollection").deleteMany({
  
//     });
//     console.log("failed to delete all documents-----------------------", err);
//         res.status(500).json({ error : "Failed to delete all documents"})
// })
