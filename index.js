const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConfig');
const formRouter = require('./routes/form.route');
const app = express();


dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({
    allowedHeaders: '*',
    origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnect();

app.use('/api/form', formRouter);

app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT} 🚀`);
});
