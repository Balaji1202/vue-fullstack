const express = require('express');
const mongodb = require('mongodb');
require('dotenv/config');

const router = express.Router();

// Get the collections via query params of id or stock symbol
router.get('/', async(req, res) => {
  const posts = await loadPostsCollection();
  if (req.query.symbol) {
    res.send(await posts.find({ stock_symbol: req.query.symbol }).toArray());
  } else if (req.query.id) {
    let id = Number(req.query.id);
    res.send(await posts.find({ _id: id }).toArray());
  } else {
    res.send(await posts.find({}).toArray());
  }
});

// Get the collections via normal params of id
router.get('/:id', async(req, res) => {
  const posts = await loadPostsCollection();
  let id = Number(req.params.id);
  res.send(await posts.find({ _id: id }).toArray());
});


// Add the posts
const pushCollection = async() => {
    // const jsonData = require('./../../stock_mock');
    const posts = await loadPostsCollection();
    jsonData.forEach((data, index) => {
      data._id = index;
      posts.insertOne(data);
    });
  }
  // pushCollection();



// Delete collection
const deleteCollection = async() => {
    const posts = await loadPostsCollection();
    posts.deleteMany();
  }
  // deleteCollection();

async function loadPostsCollection() {
  const dbKey = process.env.DB_KEY;
  const client = await mongodb.MongoClient.connect(dbKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return client.db('test').collection('stock-data');
}

module.exports = router;
