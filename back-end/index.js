const path = require('path');
require('dotenv').config({
path: path.resolve(__dirname, '.env')
});
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// route to send the Feedback by the user
app.use('/send_feed', require('./routes/sendFeed'));
app.use('/get_feed', require('./routes/getFeed'))

app.get('/' , (req,res)=>{
    res.send("hello kavitha!")
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
