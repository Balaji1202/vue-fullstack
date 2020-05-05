const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/stock-mock');

app.use('/api/posts', posts)


app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`App started at ${port}`));