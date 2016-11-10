$(document).ready(function(){
  var socket = io.connect();
  var $messageForm = $('.messageForm');
  var $messageInput;
  var $chat;
  var $jqueryVars = $('#jqueryVars');
  var login = $jqueryVars.find('#loginVar').html();
  var email = $jqueryVars.find('#emailVar').html();

  if (login == 'true'){
    console.log('hi');
    socket.emit('new user', email);
    $messageForm.submit(function(e){
      e.preventDefault();
      var index = $(".messageForm").index(this);
      $messageInput = $('.messageInput').eq(index);
      $chat = $('.chatContent').eq(index);
      var friendsEmail = $('.friendsEmail').eq(index).html();
      socket.emit('send message', {content: $messageInput.val(), target: friendsEmail, self: email});
      console.log(email);
      $messageInput.val('');
    });

    socket.on('new message from other', function(data){
      var $friendsEmail = $('.friendsEmail');
      var index = 0;
      $friendsEmail.each(function(){
        if($(this).html() == data.target){
          index = $friendsEmail.index(this);
          return false;
        }
      });
      var $fromFriend = $('.chatContent').eq(index);
      $fromFriend.append(`<p class="messageText fromOther">${data.msg}</p>`);
      $fromFriend.scrollTop($fromFriend.scrollHeight);
    });

    socket.on('new message from self', function(data){
      $chat.append(`<p class="messageText fromSelf">${data.msg}</p>`);
      $chat.scrollTop($chat[0].scrollHeight);
    });
  }
});
