const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
var db
app.use(express.static('public'))
// user:yoda pw: maytheforcebewithyou1

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://yoda:maytheforcebewithyou1@ds113452.mlab.com:13452/crud-express-app',(err, client) => {
  if (err) return console.log(err)
  db = client.db('crud-express-app') // whatever your database name is

  app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.use(bodyParser.json())
app.put('/notes', (req, res) => {
  db.collection('quotes')
    .findOneAndUpdate({name: 'Yoda'}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

  app.post('/notes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('saved to database')
      res.redirect('/')
    })
  })

  app.listen(3003, function() {
    console.log('listening on 3003')
  })
})
