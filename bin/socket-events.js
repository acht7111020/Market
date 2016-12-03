function socket(server){
  var io = require('socket.io').listen(server);
  var Chat = require('../models/chat-schema');
  users = {};

  io.sockets.on('connection', function(socket){
    // when new user enter
    socket.on('new user', function(data, callback) {
      socket.email = data;
      users[socket.email] = socket;
      console.log(`[${data}] entered.`);
      // label the number of unread messages from each friends
      var aggregateQuery = Chat.aggregate([
          {$match: {read: false, toUser: socket.email}},
          {$group : {_id : "$fromUser", numSend : {$sum : 1}}}
      ]);
      aggregateQuery.exec(function(err, docs){
        socket.emit('update unread status', docs);
      });
      // update others view when online
      for (var email in users){
        if (email != socket.email)
          users[email].emit('someone is online or offline', {email: socket.email, online: true});
      }
      // highlight online user
      socket.emit('highlight online user', Object.keys(users));
    });
    // when user disconnect
    socket.on('disconnect', function(data){
      // pop out from online users pool
      delete users[socket.email];
      // update others view when offline
      for (var email in users){
        users[email].emit('someone is online or offline', {email: socket.email, online: false});
      }
      console.log(`[${socket.email}] leaved.`);
    });

    // send message
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
