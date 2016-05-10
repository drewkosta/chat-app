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
    message: req.body.message || ''
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci1zcmMvc2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLElBQUksS0FBSyxRQUFRLElBQVIsQ0FBVDtBQUNBLElBQUksVUFBVSxzQkFBZDs7O0FBR0EsSUFBSSxVQUFVLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBSSxNQUFNLFNBQVY7OztBQUdBLElBQUksYUFBYSxRQUFRLGFBQVIsQ0FBakI7QUFDQSxJQUFJLEdBQUosQ0FBUSxXQUFXLElBQVgsRUFBUixFO0FBQ0EsSUFBSSxHQUFKLENBQVEsV0FBVyxVQUFYLENBQXNCLEVBQUUsVUFBVSxJQUFaLEVBQXRCLENBQVIsRTs7QUFFQSxJQUFJLEtBQUosQ0FBVSxtQkFBVixFQUNHLEdBREgsQ0FDTyxVQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CO0FBQ3RCLE1BQUksT0FBTyxFQUFFLFNBQVMsRUFBWCxFQUFYOztBQUVBLEtBQUcsUUFBSCxDQUFZLE9BQVosRUFBcUIsVUFBUyxHQUFULEVBQWMsSUFBZCxFQUFvQjtBQUN2QyxRQUFJLEdBQUosRUFBUztBQUFFLFlBQU0sR0FBTjtBQUFZOzs7O0FBSXZCLFFBQUksS0FBSyxRQUFMLEdBQWdCLElBQWhCLEdBQXVCLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLFdBQUssUUFBTCxHQUFnQixJQUFoQixHQUF1QixLQUF2QixDQUE2QixJQUE3QixFQUFtQyxPQUFuQyxDQUEyQyxVQUFTLEdBQVQsRUFBYztBQUN2RCxhQUFLLE9BQUwsQ0FBYSxJQUFiLENBQW1CLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBbkI7QUFDRCxPQUZEO0FBR0Q7OztBQUdELFFBQUksSUFBSixDQUFVLElBQVY7QUFDRCxHQWJEO0FBY0QsQ0FsQkgsRUFtQkcsSUFuQkgsQ0FtQlEsVUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQjs7QUFFdkIsTUFBSSxVQUFVO0FBQ1osZUFBVyxLQUFLLEdBQUwsRUFEQztBQUVaLGNBQVUsSUFBSSxJQUFKLENBQVMsUUFBVCxJQUFxQixFQUZuQjtBQUdaLGNBQVUsSUFBSSxJQUFKLENBQVMsUUFBVCxJQUFxQixFQUhuQjtBQUlaLGFBQVMsSUFBSSxJQUFKLENBQVMsT0FBVCxJQUFvQjtBQUpqQixHQUFkOztBQU9BLEtBQUcsVUFBSCxDQUFjLE9BQWQsRUFBdUIsS0FBSyxTQUFMLENBQWUsT0FBZixJQUEwQixJQUFqRCxFQUF1RCxVQUFVLEdBQVYsRUFBZTtBQUNwRSxRQUFJLEdBQUosRUFBUztBQUFFLFlBQU0sR0FBTjtBQUFZO0FBQ3ZCLFFBQUksTUFBSixDQUFXLEdBQVgsRUFBZ0IsSUFBaEI7QUFDRCxHQUhEO0FBSUQsQ0FoQ0g7O0FBbUNBLElBQUksTUFBSixDQUFXLElBQVgsRUFBaUIsWUFBVztBQUMxQixVQUFRLEdBQVIsQ0FBWSxxQkFBWjtBQUNELENBRkQiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWVzc2FnZXMgZmlsZSBzdG9yYWdlXG5sZXQgZnMgPSByZXF1aXJlKCdmcycpO1xubGV0IG1zZ0ZpbGUgPSAnc2VydmVyL21lc3NhZ2VzLmpzb24nO1xuXG4vLyBleHByZXNzXG5sZXQgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmxldCBhcHAgPSBleHByZXNzKCk7XG5cbi8vIGV4cHJlc3MgYm9keSBwYXJzZXJcbnZhciBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAvLyBzdXBwb3J0IGpzb24gZW5jb2RlZCBib2RpZXNcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpOyAvLyBzdXBwb3J0IGVuY29kZWQgYm9kaWVzXG5cbmFwcC5yb3V0ZSgnL2NsYXNzZXMvbWVzc2FnZXMnKVxuICAuZ2V0KGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgbGV0IGpzb24gPSB7IHJlc3VsdHM6IFtdIH07XG5cbiAgICBmcy5yZWFkRmlsZShtc2dGaWxlLCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcbiAgICAgIGlmIChlcnIpIHsgdGhyb3cgZXJyOyB9XG5cbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGxpbmUgaW4gdGhlIG1lc3NhZ2VzIGZpbGUgYW5kIEpTT04gcGFyc2UgdGhlIG1lc3NhZ2VcbiAgICAgIC8vIHNvIGl0IGNhbiBiZSBhZGRlZCBhcyBhIG9iamVjdCB0byB0aGUgcmVzdWx0cyBhcnJheVxuICAgICAgaWYgKGRhdGEudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBkYXRhLnRvU3RyaW5nKCkudHJpbSgpLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgIGpzb24ucmVzdWx0cy5wdXNoKCBKU09OLnBhcnNlKG1zZykgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGZpbmFsbHksIHNlbmQgdGhlIHN0cmluZ2lmaWVkIG9iamVjdCB0byB0aGUgY2xpZW50XG4gICAgICByZXMuanNvbigganNvbiApO1xuICAgIH0pO1xuICB9KVxuICAucG9zdChmdW5jdGlvbihyZXEsIHJlcykge1xuICAgIC8vIGNyZWF0ZWRBdCwgcm9vbW5hbWUsIHVzZXJuYW1lLCB0ZXh0XG4gICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICBjcmVhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICByb29tbmFtZTogcmVxLmJvZHkucm9vbW5hbWUgfHwgJycsXG4gICAgICB1c2VybmFtZTogcmVxLmJvZHkudXNlcm5hbWUgfHwgJycsXG4gICAgICBtZXNzYWdlOiByZXEuYm9keS5tZXNzYWdlIHx8ICcnXG4gICAgfTtcblxuICAgIGZzLmFwcGVuZEZpbGUobXNnRmlsZSwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkgKyAnXFxuJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikgeyB0aHJvdyBlcnI7IH1cbiAgICAgIHJlcy5zdGF0dXMoMjAxKS5zZW5kKCk7XG4gICAgfSk7XG4gIH0pO1xuXG5cbmFwcC5saXN0ZW4oMzAwMCwgZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCdFeGFtcGxlIGFwcCBvbiAzMDAwJyk7XG59KTtcbiJdfQ==