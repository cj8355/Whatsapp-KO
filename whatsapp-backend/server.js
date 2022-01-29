//Importing APIs
import express from 'express';
import mongoose from 'mongoose'
import Messages from './dbMessages.js';

//App Config
const app = express();
const port = process.env.port || 8080;

//Middleware
app.use(express.json());

//Database Config
const connection_url = "mongodb+srv://MilesBeler:Thisispassword@cluster0.8tcf5.mongodb.net/Whatsappdb?retryWrites=true&w=majority"

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', {
});

const db = mongoose.connection

db.once("open",() => {
    console.log("DB connected");

const msgCollection = db.collection("messagecontents");
const changeStream = msgCollection.watch();

changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === 'insert') {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log('error triggering pusher');
        }
    });
});

// API Routes
app.get('/', (req,res) => res.status(200).send("Hello World!"));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
// Listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));

// Test Heroku Deployment
if (process.env.NODE_ENV === 'production') {
    

}