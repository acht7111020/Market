$(document).ready(function() {
  $('.modal').modal();
  var myId = $('#idVar').html();
  var socket = io.connect();
  $('.chatMenuForm').submit(function(e) {
    e.preventDefault();
    var index = $('.chatMenuForm').index(this);
    var friendsId = $('.friendsId').eq(index).html();

    var invitation = {
      inviter: myId,
      invitee: friendsId
    }
    socket.emit('new invitation', invitation);

  });

  // socket.on('invited', function(invitation) {
  //   console.log(invitation);
  //   $('#modalP').append('hello');
  //   $('#consent').modal('open');
  // });
});
