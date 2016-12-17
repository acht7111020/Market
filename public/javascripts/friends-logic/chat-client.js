$(document).ready(function(){
  var socket = io.connect();
  var $messageForm = $('.messageForm');
  var $messageInput;
  var $chat;
  var $jqueryVars = $('#jqueryVars');
  var login = $jqueryVars.find('#loginVar').html();
  var myId = $jqueryVars.find('#idVar').html();
  var openingChat = '';
  var friendsId;
  var oldMessages = {};
  var titleNewMessageFunction;

  if (login == 'true'){
    $(window).focus(function(){
      if (titleNewMessageFunction){
        clearInterval(titleNewMessageFunction);
        $('title').html('Ballon');
      }
    });
    socket.emit('new user', myId);

    $('.chatCollapsible').click(function(e){
      var index = $(".chatCollapsible").index(this);
      friendsId = $(".friendsId").eq(index).html();
      $chat = $('.chatContent').eq(index);
      e.preventDefault();
      if (openingChat != friendsId){
        UpdateReadStat(index, 0);
        socket.emit('open chat box', {friend: friendsId, self: myId});
        openingChat = friendsId;
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
        if (oldMessages[openingChat].history[i].fromUser == myId){
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
      socket.emit('send message', {content: $messageInput.val(), target: openingChat, origin: myId});
      $chat.append(`<p class="messageText fromSelfUnread">${$messageInput.val()}</p>`);
      $chat.scrollTop($chat[0].scrollHeight);
      $messageInput.val('');
    });

    socket.on('new message', function(data){
      titleNewMessageFunction = setInterval(function(){ ChangeTitle() }, 1500);
      if(data.origin == openingChat){
          DisplayMsg(data.msg, 'fromOther');
          socket.emit('message read', {friend: openingChat, self: myId});
      }
      else {
        var index = GetIndex(data.origin);
        UpdateReadStat(index, -1);
      }
    });

    function ChangeTitle(){
      if ($('title').html() == 'new message'){
        $('title').html('Ballon');
      }
      else{
        $('title').html('new message');
      }
    }

    socket.on('update message read', function(data){
      if ($chat)
        $chat.find('.fromSelfUnread').toggleClass('fromSelfUnread fromSelfRead');
    });

    socket.on('update unread status', function(data){
      for(var i = 0; i < data.length; i++){
        var index = GetIndex(data[i]._id);
        UpdateReadStat(index, data[i].numSend);
      }
    });

    socket.on('highlight online user', function(data) {
      for(var i = 0; i < data.length; i++){
        if (data[i] != myId){
            var index = GetIndex(data[i]);
            HighlightOnlineUser(index, true);
        }
      }
    });

    socket.on('someone is online or offline', function(data) {
      var index = GetIndex(data.email);
      HighlightOnlineUser(index, data.online);
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

  function UpdateReadStat(index, count){
    if (count > 0){
      $('.unreadMessages').eq(index).html(count);
      // $(".chatCollapsible").eq(index).find('i').css('color', 'black');
    }
    else if(count == -1){
      var unreadNum;
      if ($('.unreadMessages').eq(index).html() != ''){
          unreadNum = parseInt($('.unreadMessages').eq(index).html()) + 1;
      }
      else{
        unreadNum = 1;
      }
      $('.unreadMessages').eq(index).html(unreadNum);
    }
    else{
      $('.unreadMessages').eq(index).html('');
    }
  }

  function HighlightOnlineUser(index, online){
    if (online){
      $(".chatCollapsible").eq(index).find('i').css('color', '#009100');
    }
    else{
      $(".chatCollapsible").eq(index).find('i').css('color', 'black');
    }
  }
});
