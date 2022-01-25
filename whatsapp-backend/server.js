//Importing APIs
import express from 'express';
import mongoose from 'mongoose'
import Messages from './dbMessages.js';
import Pusher from "pusher";
import Cors from 'cors';

//App Config
const app = express();
const port = process.env.port || 9000;

const pusher = new Pusher({
    appId: '1067105',
    key: 'PLACEHERE///',
    secrey: 'PLACEHERE',
    cluster: 'PLACEHERE',
    encrypted: true
});

//Middleware
app.use(express.json());
app.use(cors());

//Database Config
const connection_url = "TEMP MONGO DB srv"

mongoose.connect(connection_url,{
 useCreateIndex: true,
 useNewUrlParser: true,
 useUnifiedTopology: true
})

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