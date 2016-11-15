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

  if (login == 'true'){
    socket.emit('new user', myEmail);

    $('.chatCollapsible').click(function(e){
      var index = $(".chatCollapsible").index(this);
      friendsEmail = $(".friendsEmail").eq(index).html();
      $chat = $('.chatContent').eq(index);
      e.preventDefault();
      if (openingChat != friendsEmail){
        console.log(`email: ${myEmail}`);
        socket.emit('open chat box', {friend: friendsEmail, self: myEmail});
        openingChat = friendsEmail;
      }
      else{
        openingChat = '';
      }
    });

    socket.on('load old messages', function(data){
      $chat.html('');
      for (var i = data.history.length - 1; i >= 0; i--){
        if (data.history[i].fromUser == myEmail){
          DisplayMsg(data.history[i].msg, 'fromSelf');
        }
        else {
          DisplayMsg(data.history[i].msg, 'fromOther');
        }
        // console.log(data.history[i]);
      }
    });

    $messageForm.submit(function(e){
      e.preventDefault();
      var index = $(".messageForm").index(this);
      $messageInput = $('.messageInput').eq(index);
      socket.emit('send message', {content: $messageInput.val(), target: friendsEmail, origin: myEmail});
      $chat.append(`<p class="messageText fromSelf">${$messageInput.val()}</p>`);
      $chat.scrollTop($chat[0].scrollHeight);
      $messageInput.val('');
    });

    socket.on('new message', function(data){
      if(data.origin == openingChat);{
          DisplayMsg(data.msg, 'fromOther');
          console.log(data.origin, friendsEmail);
      }
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
