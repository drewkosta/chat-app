let express = require('express');
let app = express();

app.get('/classes/messages', function(req, res) {
  res.send('Hello world!');
});

app.listen(3000, function() {
  console.log('Example app on 3000');
});
