function socket(server) {
  var io = require('socket.io').listen(server);
  var Chat = require('../models/chat-schema');
  var User = require('../models/user-schema');
  var session = require('express-session');
  var MongoStore = require('connect-mongo')(session);
  var mongoose = require('mongoose');
  var sessionMiddleware = session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "hellosirandy",
  });
  io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });
  users = {};

  // ------------------------------ chat part ------------------------------
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
        socket.emit('update unread status', docs);
      });

      User.findOne({'facebook.id': socket.id}, function(err, user) {
        if (err) throw err;
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
          users[id].emit('someone is online or offline', {friend: socket.id, online: false})
        }
      }
      console.log(`[${socket.id}] leaved.`);
    });

    socket.on('send message', function(data) {
      var newMsg = new Chat(data);
      newMsg.save(function(err) {
        if (err) throw err;
        if (users[data.toUser]) {
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


    // ------------------------------ shop together part ------------------------------
    socket.on('new invitation', function(invitation) {
      if (invitation.invitee in users) {
        User.findOne({'facebook.id': invitation.inviter}, function(err, user) {
          if (err) throw err;
          users[invitation.invitee].emit('invited', user);
        });
      }
    });

    socket.on('accept or decline invitation', function(data) {
      if (data.accept) {
        User.findOne({'facebook.id': data.inviteeFbId}, function(err, invitee) {
          User.findOne({'facebook.id': data.inviterFbId}, function(err, inviter) {
            socket.request.session.together = {
              company: {
                name: inviter.facebook.name,
                facebookId: data.inviterFbId,
              },
              status: 'Following'
            };
            socket.request.session.save();
            users[data.inviterFbId].emit('invitation accepted', invitee);
          });
        });
      }
      else {

      }
    });

    socket.on('invitation accepted', function(invitee) {
      socket.request.session.together = {
        company: {
          name: invitee.facebook.name,
          facebookId: invitee.facebook.id,
        },
        status: 'Leading'
      };
      socket.request.session.save();
    });

    socket.on('get together status', function() {
      // console.log(socket.request.session.together);
      socket.emit('show together status', socket.request.session.together);
    });

    socket.on('scrolling', function(scrollTop) {
      together = socket.request.session.together;
      if (together.status == 'Leading') {
        if (users[together.company.facebookId])
          users[together.company.facebookId].emit('scroll', scrollTop);
      }
    });
  });

  function UpdateReadStat(data) {
    var updateQuery = Chat.update(
      {$or:[{fromUser: data.friend, toUser: data.me, read: false} ]},
      {$set: {read: true}},
      {multi: true}
    );
    updateQuery.exec(function(err, affected){
      if (users[data.friend])
        users[data.friend].emit('someone read message', {friend: data.me});
    });
  }
}

module.exports = socket;
