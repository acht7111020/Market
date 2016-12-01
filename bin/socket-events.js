function socket(server){
  var io = require('socket.io').listen(server);

  var User = require('../models/user-schema');
  var Chat = require('../models/chat-schema');
  users = {};

  io.sockets.on('connection', function(socket){

    socket.on('new user', function(data, callback) {
      User.find(function(err, docs) {
        if(err) throw err;
        var index = docs.map(function(item) {
          return item.email;
        }).indexOf(data);
        docs.splice(index, 1);
        console.log(docs);
        socket.emit('load chat friends', docs);
      });

      socket.email = data;
      users[socket.email] = socket;
      console.log(`[${data}] entered.`);

      var aggregateQuery = Chat.aggregate([
          {$match: {read: false, toUser: socket.email}},
          {$group : {_id : "$fromUser", numSend : {$sum : 1}}}
      ]);
      aggregateQuery.exec(function(err, docs){
        socket.emit('update unread status', docs);
      });
      for (var email in users){
        if (email != socket.email)
          users[email].emit('someone is online or offline', {email: socket.email, online: true});
      }
      socket.emit('highlight online user', Object.keys(users));
    });
    // Disconnect
    socket.on('disconnect', function(data){
      delete users[socket.email];
      for (var email in users){
        users[email].emit('someone is online or offline', {email: socket.email, online: false});
      }
      console.log(`[${socket.email}] leaved.`);
    });

    // SendMessage
    socket.on('send message', function(data){
      var newMsg = new Chat({fromUser: data.origin, toUser: data.target, msg: data.content, read: false});
      newMsg.save(function(err){
        if(err) throw err;
        if (users[data.target])
          users[data.target].emit('new message', {msg: data.content, origin: data.origin});
      });
    });

    socket.on('open chat box', function(data){
      var findQuery = Chat.find({$or:[ {fromUser: data.self, toUser: data.friend}, {fromUser: data.friend, toUser: data.self} ]});
      findQuery.sort('-created').limit(15).exec(function(err, docs){
        if(err) throw err;
        socket.emit('load old messages', {history: docs});
      });
      UpdateReadStat(data);
    });

    socket.on('message read', function(data) {
      UpdateReadStat(data);
    });

    function UpdateReadStat(data){
      var updateQuery = Chat.update(
        {$or:[{fromUser: data.friend, toUser: data.self, read: false} ]},
        {$set: {read: true}},
        {multi: true}
      );
      updateQuery.exec(function(err, affected){
        console.log(`set ${affected.nModified} messages read`);
        if (users[data.friend])
          users[data.friend].emit('update message read', {friend: data.self});
      });
    }
  });
}

module.exports = socket;
