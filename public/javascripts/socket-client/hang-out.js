$(document).ready(function() {
  var myId = $("#jqueryVars").data("userid");
  if (myId) {
    var socket = io.connect({'force new': true});
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
       {accept: $(this).data('accept'), inviterFbId: $('#modalP').data('inviterFbId'), inviteeFbId: myId});
       location.reload();
    });

    socket.on('invitation accepted', function(invitee) {
      $('#waitingHeader').html('Invitation accepted');
      $('#waitingContent').html(`<span id="inviteeName">${invitee.facebook.name} </span>just accepted your invitation`);
      $('#waitingPreloader').css('display', 'none');
      socket.emit('invitation accepted', invitee);
      location.reload();
    });

    socket.emit('get together status');
    socket.on('show together status', function(together) {
      ShowNavbarStatus(together);
    });

    $(window).scroll(function() {
      socket.emit('scrolling', $(window).scrollTop());
    });

    socket.on('scroll', function(scrollTop) {
      $(window).scrollTop(scrollTop);
    });

    socket.emit('page load', window.location.href);
    socket.on('page load', function(url) {
      window.location.href = url;
    });

    $('#disconnectBtn').click(function() {
      socket.emit('disconnect hang out');
      $('#statusArea').css('display', 'none');
      location.reload();
    });

    socket.on('disconnect hang out', function() {
      socket.emit('disconnect hang out');
      $('#statusArea').css('display', 'none');
      location.reload();
    });
  }

  function ShowNavbarStatus(together) {
    if (together.status) {
      $('#statusArea').css('display', 'block');
      $('#shoppingStatus').html(`${together.status} ${together.company.name}`);
    }
  }
});
