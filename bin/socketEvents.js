function socket(server){
  var io = require('socket.io').listen(server);
  var Chat = require('../models/chatSchema');
  users = {};

  io.sockets.on('connection', function(socket){

    socket.on('new user', function(data, callback) {
      socket.email = data;
      users[socket.email] = socket;
      console.log(`[${data}] entered.`);
      var distinctQuery = Chat.distinct("fromUser", {toUser: socket.email, read: false});
      distinctQuery.exec(function(err, docs){
        socket.emit('highlight unread user', docs);
      });
    });
    // Disconnect
    socket.on('disconnect', function(data){
      delete users[socket.email];
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
