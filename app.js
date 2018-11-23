const express = require('express');
const app = express();
const path = require("path");

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+"/index.html"));
});

app.listen(3003, () => console.log('Listening on port 3003'));
