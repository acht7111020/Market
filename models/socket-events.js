function socket(server) {
  var io = require('socket.io').listen(server);
  var Chat = require('../models/chat-schema');
  users = {};

  io.sockets.on('connection', function(socket) {
    socket.on('new user', function(data, callback) {
      socket.id = data;
      users[socket.id] = socket;
      console.log(`[${data}] entered.`);
      var aggregateQuery = Chat.aggregate([
          {$match: {read: false, toUser: socket.id}},
          {$group : {_id : "$fromUser", numSend : {$sum : 1}}}
      ]);
      aggregateQuery.exec(function(err, docs){
        // console.log(docs);
        socket.emit('update unread status', docs);
      });

      for (var id in users) {
        if (id != socket.id) {
          users[id].emit('someone is online or offline', {friend: socket.id, online: true})
        }
      }
      socket.emit('highlight online user', Object.keys(users));
    });

    socket.on('disconnect', function(data) {
      delete users[socket.id];
      for (var id in users) {
        if (id != socket.id) {
          console.log(id);
          users[id].emit('someone is online or offline', {friend: socket.id, online: false})
        }
      }
      console.log(`[${socket.id}] entered.`);
    });

    socket.on('send message', function(data) {
      var newMsg = new Chat(data);
      newMsg.save(function(err) {
        if (err) throw err;
        if (users[data.toUser]) {
          console.log(data);
          users[data.toUser].emit('new message', data)
        }
      });
    });

    socket.on('open chat box', function(data) {
      var findQuery = Chat.find({$or: [
        {fromUser: data.me, toUser: data.friend},
        {fromUser: data.friend, toUser: data.me}
      ]});
      findQuery.sort('-created').limit(15).exec(function(err, docs) {
        if (err) throw err;
        socket.emit('load history messages', {friend: data.friend, msgs: docs})
      });
      UpdateReadStat(data);
    });

    socket.on('message read', function(data) {
      UpdateReadStat(data);
    });

    function UpdateReadStat(data) {
      console.log(data);
      var updateQuery = Chat.update(
        {$or:[{fromUser: data.friend, toUser: data.me, read: false} ]},
        {$set: {read: true}},
        {multi: true}
      );
      updateQuery.exec(function(err, affected){
        // console.log(`set ${affected.nModified} messages read`);
        if (users[data.friend])
          users[data.friend].emit('someone read message', {friend: data.me});
      });
    }
  });
}

module.exports = socket;
