import express from 'express';

const app = express();
const port = process.env.port || 9000;


app.get('/', (req,res) => res.status(200).send("HELLO WROLD!!"));

app.listen(port, () => console.log(`Listening on localhost:${port}`));