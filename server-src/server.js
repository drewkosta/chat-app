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

// allow cross origin
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/classes/messages')
  .get(function(req, res) {
    let json = { results: [] };

    fs.readFile(msgFile, function(err, data) {
      if (err) { throw err; }

      // iterate over each line in the messages file and JSON parse the message
      // so it can be added as a object to the results array
      if (data.toString().trim().length > 0) {
        data.toString().trim().split('\n').forEach(function(msg) {
          json.results.push( JSON.parse(msg) );
        });
      }

      // finally, send the stringified object to the client
      res.json( json );
    });
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
      res.status(201).send();
    });
  });

app.get('/*', function(req, res) {
  console.log('Request', 'client' + req.url);

  fs.exists('client' + req.url, (exists) => {
    if (exists) {
      res.status(200).send('client' + req.url);
    } else {
      res.status(404).send();
    }
  });
});

app.listen(3000, function() {
  console.log('Example app on 3000');
});
