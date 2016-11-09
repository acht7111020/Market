$(document).ready(function(){
  var socket = io.connect();
  var $messageForm = $('.messageForm');
  var $messageInput;
  var $chat;

  $messageForm.submit(function(e){
    e.preventDefault();
    var index = $(".messageForm").index(this);
    $messageInput = $('.messageInput').eq(index);
    $chat = $('.chatContent').eq(index);
    console.log(index);
    socket.emit('send message', $messageInput.val());
    $messageInput.val('');
  });

  socket.on('new message', function(data){
    $chat.append(`<p class="messageText">${data.msg}</p>`);
    $chat.scrollTop($chat[0].scrollHeight);
  });
});
