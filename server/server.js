'use strict';

// messages file storage
var fs = require('fs');
var msgFile = 'server/messages.json';

// express
var express = require('express');
var app = express();

// express body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.route('/classes/messages').get(function (req, res) {
  var json = { results: [] };

  fs.readFile(msgFile, function (err, data) {
    if (err) {
      throw err;
    }

    // iterate over each line in the messages file and JSON parse the message
    // so it can be added as a object to the results array
    if (data.toString().trim().length > 0) {
      data.toString().trim().split('\n').forEach(function (msg) {
        json.results.push(JSON.parse(msg));
      });
    }

    // finally, send the stringified object to the client
    res.json(json);
  });
}).post(function (req, res) {
  // createdAt, roomname, username, text
  var message = {
    createdAt: Date.now(),
    roomname: req.body.roomname || '',
    username: req.body.username || '',
    text: req.body.text || ''
  };

  fs.appendFile(msgFile, JSON.stringify(message) + '\n', function (err) {
    if (err) {
      throw err;
    }
    res.status(201).send();
  });
});

app.listen(3000, function () {
  console.log('Example app on 3000');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci1zcmMvc2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLElBQUksS0FBSyxRQUFRLElBQVIsQ0FBVDtBQUNBLElBQUksVUFBVSxzQkFBZDs7O0FBR0EsSUFBSSxVQUFVLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBSSxNQUFNLFNBQVY7OztBQUdBLElBQUksYUFBYSxRQUFRLGFBQVIsQ0FBakI7QUFDQSxJQUFJLEdBQUosQ0FBUSxXQUFXLElBQVgsRUFBUixFO0FBQ0EsSUFBSSxHQUFKLENBQVEsV0FBVyxVQUFYLENBQXNCLEVBQUUsVUFBVSxJQUFaLEVBQXRCLENBQVIsRTs7QUFFQSxJQUFJLEtBQUosQ0FBVSxtQkFBVixFQUNHLEdBREgsQ0FDTyxVQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CO0FBQ3RCLE1BQUksT0FBTyxFQUFFLFNBQVMsRUFBWCxFQUFYOztBQUVBLEtBQUcsUUFBSCxDQUFZLE9BQVosRUFBcUIsVUFBUyxHQUFULEVBQWMsSUFBZCxFQUFvQjtBQUN2QyxRQUFJLEdBQUosRUFBUztBQUFFLFlBQU0sR0FBTjtBQUFZOzs7O0FBSXZCLFFBQUksS0FBSyxRQUFMLEdBQWdCLElBQWhCLEdBQXVCLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLFdBQUssUUFBTCxHQUFnQixJQUFoQixHQUF1QixLQUF2QixDQUE2QixJQUE3QixFQUFtQyxPQUFuQyxDQUEyQyxVQUFTLEdBQVQsRUFBYztBQUN2RCxhQUFLLE9BQUwsQ0FBYSxJQUFiLENBQW1CLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBbkI7QUFDRCxPQUZEO0FBR0Q7OztBQUdELFFBQUksSUFBSixDQUFVLElBQVY7QUFDRCxHQWJEO0FBY0QsQ0FsQkgsRUFtQkcsSUFuQkgsQ0FtQlEsVUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQjs7QUFFdkIsTUFBSSxVQUFVO0FBQ1osZUFBVyxLQUFLLEdBQUwsRUFEQztBQUVaLGNBQVUsSUFBSSxJQUFKLENBQVMsUUFBVCxJQUFxQixFQUZuQjtBQUdaLGNBQVUsSUFBSSxJQUFKLENBQVMsUUFBVCxJQUFxQixFQUhuQjtBQUlaLFVBQU0sSUFBSSxJQUFKLENBQVMsSUFBVCxJQUFpQjtBQUpYLEdBQWQ7O0FBT0EsS0FBRyxVQUFILENBQWMsT0FBZCxFQUF1QixLQUFLLFNBQUwsQ0FBZSxPQUFmLElBQTBCLElBQWpELEVBQXVELFVBQVUsR0FBVixFQUFlO0FBQ3BFLFFBQUksR0FBSixFQUFTO0FBQUUsWUFBTSxHQUFOO0FBQVk7QUFDdkIsUUFBSSxNQUFKLENBQVcsR0FBWCxFQUFnQixJQUFoQjtBQUNELEdBSEQ7QUFJRCxDQWhDSDs7QUFtQ0EsSUFBSSxNQUFKLENBQVcsSUFBWCxFQUFpQixZQUFXO0FBQzFCLFVBQVEsR0FBUixDQUFZLHFCQUFaO0FBQ0QsQ0FGRCIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtZXNzYWdlcyBmaWxlIHN0b3JhZ2VcbmxldCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5sZXQgbXNnRmlsZSA9ICdzZXJ2ZXIvbWVzc2FnZXMuanNvbic7XG5cbi8vIGV4cHJlc3NcbmxldCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xubGV0IGFwcCA9IGV4cHJlc3MoKTtcblxuLy8gZXhwcmVzcyBib2R5IHBhcnNlclxudmFyIGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7IC8vIHN1cHBvcnQganNvbiBlbmNvZGVkIGJvZGllc1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7IC8vIHN1cHBvcnQgZW5jb2RlZCBib2RpZXNcblxuYXBwLnJvdXRlKCcvY2xhc3Nlcy9tZXNzYWdlcycpXG4gIC5nZXQoZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICBsZXQganNvbiA9IHsgcmVzdWx0czogW10gfTtcblxuICAgIGZzLnJlYWRGaWxlKG1zZ0ZpbGUsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgaWYgKGVycikgeyB0aHJvdyBlcnI7IH1cblxuICAgICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggbGluZSBpbiB0aGUgbWVzc2FnZXMgZmlsZSBhbmQgSlNPTiBwYXJzZSB0aGUgbWVzc2FnZVxuICAgICAgLy8gc28gaXQgY2FuIGJlIGFkZGVkIGFzIGEgb2JqZWN0IHRvIHRoZSByZXN1bHRzIGFycmF5XG4gICAgICBpZiAoZGF0YS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRhdGEudG9TdHJpbmcoKS50cmltKCkuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAganNvbi5yZXN1bHRzLnB1c2goIEpTT04ucGFyc2UobXNnKSApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gZmluYWxseSwgc2VuZCB0aGUgc3RyaW5naWZpZWQgb2JqZWN0IHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5qc29uKCBqc29uICk7XG4gICAgfSk7XG4gIH0pXG4gIC5wb3N0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgLy8gY3JlYXRlZEF0LCByb29tbmFtZSwgdXNlcm5hbWUsIHRleHRcbiAgICBsZXQgbWVzc2FnZSA9IHtcbiAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgIHJvb21uYW1lOiByZXEuYm9keS5yb29tbmFtZSB8fCAnJyxcbiAgICAgIHVzZXJuYW1lOiByZXEuYm9keS51c2VybmFtZSB8fCAnJyxcbiAgICAgIHRleHQ6IHJlcS5ib2R5LnRleHQgfHwgJydcbiAgICB9O1xuXG4gICAgZnMuYXBwZW5kRmlsZShtc2dGaWxlLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSArICdcXG4nLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSB7IHRocm93IGVycjsgfVxuICAgICAgcmVzLnN0YXR1cygyMDEpLnNlbmQoKTtcbiAgICB9KTtcbiAgfSk7XG5cblxuYXBwLmxpc3RlbigzMDAwLCBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJ0V4YW1wbGUgYXBwIG9uIDMwMDAnKTtcbn0pO1xuIl19