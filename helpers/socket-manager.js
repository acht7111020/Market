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
  var storeState = {};

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

      // for(var prod in storeState){
      //   if(storeState[prod].indexOf(socket.id) != -1){
      //     index = storeState[prod].indexOf(socket.id);
      //     delete storeState[prod][index];
      //     break;
      //   }
      // }
      //
      // for (var id in users) {
      //   if (id != socket.id) {
      //     users[id].emit('remove person icon', socket.id);
      //   }
      // }
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
      NoticeInvitee('scroll', scrollTop);
    });

    socket.on('page load', function(url) {
      NoticeInvitee('page load', url);
    });

    socket.on('disconnect hang out', function() {
      NoticeInvitee('disconnect hang out', {});
      socket.request.session.together = {};
      socket.request.session.save();
    });


    // ------------------------------ run into friends part ------------------------------
    socket.on('run into friends', function(info) {
      socket.id = info.myId;
      //if( !users[socket.id] ){
        users[socket.id] = socket;
      //}

      if( !storeState[info.productId] ){
        storeState[info.productId] = [];
      }
      if(storeState[info.productId].indexOf(info.myId) == -1){
        storeState[info.productId].push(info.myId);
        User.findOne({'facebook.id': info.myId}, function(err, user) {
          if (err) throw err;
          var returninfo = {};
          returninfo.user = user;
          returninfo.productId = info.productId;
          for (var id in users) {
            if (id != socket.id) {
              users[id].emit('someone is shopping', returninfo);
            }
          }
        });
      }
    });

    socket.on('update shopping list', function(productId) {
      var storeList = storeState[productId];
      var userlist = [];
      for(var i in storeList){
        User.findOne({'facebook.id': storeList[i]}, function(err, user) {
          if (err) throw err;
          userlist.push(user);
          socket.emit('updating person icon', userlist);
        });
      }

    });

    socket.on('leave this store', function(info) {
      if(!storeState[info.productId])
        return;
      console.log(info);
      var index = storeState[info.productId].indexOf(info.myId);
      if(index != -1){
        delete storeState[info.productId][index];
        for (var id in users) {
          if (id != socket.id) {
            users[id].emit('remove this person icon', info.myId);
          }
        }
      }

    });



    function NoticeInvitee(emitName, emitData) {
      together = socket.request.session.together;
      if (together) {
        if (together.status == 'Leading') {
          if (users[together.company.facebookId])
            users[together.company.facebookId].emit(emitName, emitData);
        }
      }
    }
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
