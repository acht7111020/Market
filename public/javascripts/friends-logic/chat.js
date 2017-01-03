$(document).ready(function() {
  $('#consent').modal();
  $('#waiting').modal({
    dismissible: false,
  });
  var socket = io.connect();
  var myId = $('#idVar').html();
  var chooseId;
  var historyMsgs = {};
  var $openingChatContent;
  var titleNewMessageFunction;
  if (myId) {
    socket.emit('new user', myId);
    $('.chatCollapsible').click(function() {
      var index = $('.chatCollapsible').index(this);
      $openingChatContent = $('.chatContent').eq(index);
      var onChooseId = $('.friendsId').eq(index).html();
      if (chooseId != onChooseId) {
        UpdateReadStat(index, 0);
        chooseId = onChooseId;
        socket.emit('open chat box', {friend: chooseId, me: myId});
      }
      else {
        chooseId = '';
      }
    });

    $('.messageForm').submit(function(e) {
      e.preventDefault();
      var index = $('.messageForm').index(this);
      var $messageInput = $('.messageInput').eq(index);
      var newMsg = {
        fromUser: myId,
        toUser: chooseId,
        msg: $messageInput.val(),
        read: false
      };
      socket.emit('send message', newMsg);
      DisplayMsg(newMsg);
      $messageInput.val('');
    });

    socket.on('load history messages', function(data) {
      historyMsgs[data.friend] = data.msgs;
      LoadHistoryMsgs();
    });

    socket.on('update unread status', function(data) {
      for (var i = 0; i < data.length; i++) {
        UpdateReadStat(GetIndex(data[i]._id), data[i].numSend);
      }
    });

    socket.on('new message', function(data) {
      titleNewMessageFunction = setInterval(function(){ ChangeTitle() }, 1500);
      if (data.fromUser == chooseId) {
        DisplayMsg(data);
        socket.emit('message read', {friend: chooseId, me: myId})
      }
      else {
        UpdateReadStat(GetIndex(data.fromUser), -1);
      }
    });

    socket.on('someone read message', function(data) {
      if ($openingChatContent) {
        $openingChatContent.find('.fromSelfUnread').toggleClass('fromSelfUnread fromSelfRead');
      }
    });

    socket.on('someone is online or offline', function(data) {
      var index = GetIndex(data.friend);
      HighlightOnlineUser(index, data.online);
    });

    socket.on('highlight online user', function(data) {
      for(var i = 0; i < data.length; i++){
        if (data[i] != myId){
            var index = GetIndex(data[i]);
            HighlightOnlineUser(index, true);
        }
      }
    });

    $(window).focus(function(){
      if (titleNewMessageFunction){
        clearInterval(titleNewMessageFunction);
        $('title').html('Ballon');
      }
    });

    // ------------------------------ shop together part ------------------------------

    $('.chatMenuForm').submit(function(e) {
      e.preventDefault();
      var index = $('.chatMenuForm').index(this);
      var friendsId = $('.friendsId').eq(index).html();
      $('#waiting').modal('open');

      var invitation = {
        inviter: myId,
        invitee: friendsId
      }
      socket.emit('new invitation', invitation);

    });

    socket.on('invited', function(inviter) {
      $('#modalP').data('inviterFbId', inviter.facebook.id);
      $('#modalP').html(`You have been invited by <span id="inviterName">${inviter.facebook.name}</span>`);
      $('#consent').modal('open');
    });

    $('.consentAccDec').click(function() {
      socket.emit('accept or decline invitation',
       {accept: $(this).data('accept'), inviter: $('#modalP').data('inviterFbId'), inviteeFbId: myId});
    });

    socket.on('invitation accepted', function(invitee) {
      console.log(invitee);
      $('#waitingHeader').html('Invitation accepted');
      $('#waitingContent').html(`<span id="inviteeName">${invitee} </span>just accepted your invitation`);
      $('#waitingPreloader').css('display', 'none');
    });
  }

  function LoadHistoryMsgs() {
    $openingChatContent.html('');
    for (var i = historyMsgs[chooseId].length - 1; i >= 0; i--) {
      DisplayMsg(historyMsgs[chooseId][i]);
    }
  }

  function DisplayMsg(msg) {
    var from = '';
    if (msg.fromUser == myId) {
      if (msg.read) {
        from = 'fromSelfRead';
      }
      else {
        from = 'fromSelfUnread';
      }
    }
    else {
      from = 'fromOther';
    }
    $openingChatContent.append(`<p class="messageText ${from}">${msg.msg}</p>`);
    $openingChatContent.scrollTop($openingChatContent[0].scrollHeight);
  }

  function GetIndex (id) {
    var index = -1;
    $('.friendsId').each(function() {
      if ($(this).html() == id) {
        index = $('.friendsId').index(this)
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
    if (online && index >= 0){
      $(".chatCollapsible").eq(index).find('i').css('color', '#009100');
    }
    else{
      $(".chatCollapsible").eq(index).find('i').css('color', 'rgba(0,0,0,0.54);');
    }
  }

  function ChangeTitle(){
    if ($('title').html() == 'new message'){
      $('title').html('Ballon');
    }
    else{
      $('title').html('new message');
    }
  }
});
