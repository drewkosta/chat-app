'use strict';

// messages file storage
var fs = require('fs');
var msgFile = 'server/messages.json';

// express
var express = require('express');
var app = express();

// serve static files
app.use(express.static(__dirname + '/../client'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

// express body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// allow cross origin
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci1zcmMvc2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLElBQUksS0FBSyxRQUFRLElBQVIsQ0FBVDtBQUNBLElBQUksVUFBVSxzQkFBZDs7O0FBR0EsSUFBSSxVQUFVLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBSSxNQUFNLFNBQVY7OztBQUdBLElBQUksR0FBSixDQUFRLFFBQVEsTUFBUixDQUFlLFlBQVksWUFBM0IsQ0FBUjtBQUNBLElBQUksR0FBSixDQUFRLGVBQVIsRUFBeUIsUUFBUSxNQUFSLENBQWUsWUFBWSxrQkFBM0IsQ0FBekI7OztBQUdBLElBQUksYUFBYSxRQUFRLGFBQVIsQ0FBakI7QUFDQSxJQUFJLEdBQUosQ0FBUSxXQUFXLElBQVgsRUFBUixFO0FBQ0EsSUFBSSxHQUFKLENBQVEsV0FBVyxVQUFYLENBQXNCLEVBQUUsVUFBVSxJQUFaLEVBQXRCLENBQVIsRTs7O0FBR0EsSUFBSSxHQUFKLENBQVEsVUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QjtBQUMvQixNQUFJLE1BQUosQ0FBVyw2QkFBWCxFQUEwQyxHQUExQztBQUNBLE1BQUksTUFBSixDQUFXLDhCQUFYLEVBQTJDLGdEQUEzQztBQUNBO0FBQ0QsQ0FKRDs7QUFNQSxJQUFJLEtBQUosQ0FBVSxtQkFBVixFQUNHLEdBREgsQ0FDTyxVQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CO0FBQ3RCLE1BQUksT0FBTyxFQUFFLFNBQVMsRUFBWCxFQUFYOztBQUVBLEtBQUcsUUFBSCxDQUFZLE9BQVosRUFBcUIsVUFBUyxHQUFULEVBQWMsSUFBZCxFQUFvQjtBQUN2QyxRQUFJLEdBQUosRUFBUztBQUFFLFlBQU0sR0FBTjtBQUFZOzs7O0FBSXZCLFFBQUksS0FBSyxRQUFMLEdBQWdCLElBQWhCLEdBQXVCLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLFdBQUssUUFBTCxHQUFnQixJQUFoQixHQUF1QixLQUF2QixDQUE2QixJQUE3QixFQUFtQyxPQUFuQyxDQUEyQyxVQUFTLEdBQVQsRUFBYztBQUN2RCxhQUFLLE9BQUwsQ0FBYSxJQUFiLENBQW1CLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBbkI7QUFDRCxPQUZEO0FBR0Q7OztBQUdELFFBQUksSUFBSixDQUFVLElBQVY7QUFDRCxHQWJEO0FBY0QsQ0FsQkgsRUFtQkcsSUFuQkgsQ0FtQlEsVUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQjs7QUFFdkIsTUFBSSxVQUFVO0FBQ1osZUFBVyxLQUFLLEdBQUwsRUFEQztBQUVaLGNBQVUsSUFBSSxJQUFKLENBQVMsUUFBVCxJQUFxQixFQUZuQjtBQUdaLGNBQVUsSUFBSSxJQUFKLENBQVMsUUFBVCxJQUFxQixFQUhuQjtBQUlaLFVBQU0sSUFBSSxJQUFKLENBQVMsSUFBVCxJQUFpQjtBQUpYLEdBQWQ7O0FBT0EsS0FBRyxVQUFILENBQWMsT0FBZCxFQUF1QixLQUFLLFNBQUwsQ0FBZSxPQUFmLElBQTBCLElBQWpELEVBQXVELFVBQVUsR0FBVixFQUFlO0FBQ3BFLFFBQUksR0FBSixFQUFTO0FBQUUsWUFBTSxHQUFOO0FBQVk7QUFDdkIsUUFBSSxNQUFKLENBQVcsR0FBWCxFQUFnQixJQUFoQjtBQUNELEdBSEQ7QUFJRCxDQWhDSDs7QUFrQ0EsSUFBSSxNQUFKLENBQVcsSUFBWCxFQUFpQixZQUFXO0FBQzFCLFVBQVEsR0FBUixDQUFZLHFCQUFaO0FBQ0QsQ0FGRCIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtZXNzYWdlcyBmaWxlIHN0b3JhZ2VcbmxldCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5sZXQgbXNnRmlsZSA9ICdzZXJ2ZXIvbWVzc2FnZXMuanNvbic7XG5cbi8vIGV4cHJlc3NcbmxldCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xubGV0IGFwcCA9IGV4cHJlc3MoKTtcblxuLy8gc2VydmUgc3RhdGljIGZpbGVzXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSArICcvLi4vY2xpZW50JykpO1xuYXBwLnVzZSgnL25vZGVfbW9kdWxlcycsIGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSArICcvLi4vbm9kZV9tb2R1bGVzJykpO1xuXG4vLyBleHByZXNzIGJvZHkgcGFyc2VyXG52YXIgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgLy8gc3VwcG9ydCBqc29uIGVuY29kZWQgYm9kaWVzXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTsgLy8gc3VwcG9ydCBlbmNvZGVkIGJvZGllc1xuXG4vLyBhbGxvdyBjcm9zcyBvcmlnaW5cbmFwcC51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsICdPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0Jyk7XG4gIG5leHQoKTtcbn0pO1xuXG5hcHAucm91dGUoJy9jbGFzc2VzL21lc3NhZ2VzJylcbiAgLmdldChmdW5jdGlvbihyZXEsIHJlcykge1xuICAgIGxldCBqc29uID0geyByZXN1bHRzOiBbXSB9O1xuXG4gICAgZnMucmVhZEZpbGUobXNnRmlsZSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICBpZiAoZXJyKSB7IHRocm93IGVycjsgfVxuXG4gICAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBsaW5lIGluIHRoZSBtZXNzYWdlcyBmaWxlIGFuZCBKU09OIHBhcnNlIHRoZSBtZXNzYWdlXG4gICAgICAvLyBzbyBpdCBjYW4gYmUgYWRkZWQgYXMgYSBvYmplY3QgdG8gdGhlIHJlc3VsdHMgYXJyYXlcbiAgICAgIGlmIChkYXRhLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGF0YS50b1N0cmluZygpLnRyaW0oKS5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgICBqc29uLnJlc3VsdHMucHVzaCggSlNPTi5wYXJzZShtc2cpICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBmaW5hbGx5LCBzZW5kIHRoZSBzdHJpbmdpZmllZCBvYmplY3QgdG8gdGhlIGNsaWVudFxuICAgICAgcmVzLmpzb24oIGpzb24gKTtcbiAgICB9KTtcbiAgfSlcbiAgLnBvc3QoZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICAvLyBjcmVhdGVkQXQsIHJvb21uYW1lLCB1c2VybmFtZSwgdGV4dFxuICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgY3JlYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgcm9vbW5hbWU6IHJlcS5ib2R5LnJvb21uYW1lIHx8ICcnLFxuICAgICAgdXNlcm5hbWU6IHJlcS5ib2R5LnVzZXJuYW1lIHx8ICcnLFxuICAgICAgdGV4dDogcmVxLmJvZHkudGV4dCB8fCAnJ1xuICAgIH07XG5cbiAgICBmcy5hcHBlbmRGaWxlKG1zZ0ZpbGUsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpICsgJ1xcbicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHsgdGhyb3cgZXJyOyB9XG4gICAgICByZXMuc3RhdHVzKDIwMSkuc2VuZCgpO1xuICAgIH0pO1xuICB9KTtcblxuYXBwLmxpc3RlbigzMDAwLCBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJ0V4YW1wbGUgYXBwIG9uIDMwMDAnKTtcbn0pO1xuIl19