// messages file storage
let fs = require('fs');
let msgFile = 'server/messages.json';

// express
let express = require('express');
let app = express();

// express body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.route('/classes/messages')
  .get(function(req, res) {
    res.send('query', req.query);
  })
  .post(function(req, res) {
    // createdAt, roomname, username, text
    let message = {
      createdAt: Date.now(),
      roomname: req.body.roomname || '',
      username: req.body.username || '',
      text: req.body.text || ''
    };

    fs.appendFile(msgFile, JSON.stringify(message) + '\n', function (err) {
      if (err) { throw err; }
    });

    res.send();
  });


app.listen(3000, function() {
  console.log('Example app on 3000');
});
