$(document).ready(function(){
  var socket = io.connect();
  var $messageForm = $('.messageForm');
  var $messageInput;
  var $chat;
  var $jqueryVars = $('#jqueryVars');
  var login = $jqueryVars.find('#loginVar').html();
  var myEmail = $jqueryVars.find('#emailVar').html();
  var openingChat = '';
  var friendsEmail;
  var oldMessages = {};

  if (login == 'true'){
    socket.emit('new user', myEmail);

    $('.chatCollapsible').click(function(e){
      var index = $(".chatCollapsible").index(this);
      friendsEmail = $(".friendsEmail").eq(index).html();
      $chat = $('.chatContent').eq(index);
      e.preventDefault();
      if (openingChat != friendsEmail){
        // if (oldMessages[friendsEmail]){
        //   LoadOldMsg();
        //   console.log('hi');
        // }
        // else {
        //   socket.emit('open chat box', {friend: friendsEmail, self: myEmail});
        //   console.log('hey');
        // }
        socket.emit('open chat box', {friend: friendsEmail, self: myEmail});
        openingChat = friendsEmail;
      }
      else{
        openingChat = '';
      }
    });

    socket.on('load old messages', function(data){
      oldMessages[openingChat] = data;
      LoadOldMsg();
    });

    function LoadOldMsg(){
      $chat.html('');
      for (var i = oldMessages[openingChat].history.length - 1; i >= 0; i--){
        if (oldMessages[openingChat].history[i].fromUser == myEmail){
          if (oldMessages[openingChat].history[i].read){
            DisplayMsg(oldMessages[openingChat].history[i].msg, 'fromSelfRead');
          }
          else{
            DisplayMsg(oldMessages[openingChat].history[i].msg, 'fromSelfUnread');
          }
        }
        else {
          DisplayMsg(oldMessages[openingChat].history[i].msg, 'fromOther');
        }
      }
    }

    $messageForm.submit(function(e){
      e.preventDefault();
      var index = $(".messageForm").index(this);
      $messageInput = $('.messageInput').eq(index);
      socket.emit('send message', {content: $messageInput.val(), target: openingChat, origin: myEmail});
      $chat.append(`<p class="messageText fromSelfUnread">${$messageInput.val()}</p>`);
      $chat.scrollTop($chat[0].scrollHeight);
      $messageInput.val('');
    });

    socket.on('new message', function(data){
      if(data.origin == openingChat){
          DisplayMsg(data.msg, 'fromOther');
          socket.emit('message read', {friend: openingChat, self: myEmail});
      }
    });

    socket.on('update message read', function(data){
      $chat.find('.fromSelfUnread').toggleClass('fromSelfUnread fromSelfRead');
    });
  }

  function DisplayMsg(msg, from){
    $chat.append(`<p class="messageText ${from}">${msg}</p>`);
    $chat.scrollTop($chat[0].scrollHeight);
  }

  function GetIndex(email){
    var $friendsEmail = $('.friendsEmail');
    var index = 0;
    $friendsEmail.each(function(){
      if($(this).html() == email){
        index = $friendsEmail.index(this);
        return false;
      }
    });
    return index;
  }
});
