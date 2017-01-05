var floors = [['Cosmetic','Exchange','Starbucks','Luxury','Boutique','Women','Ladies','Shoe','Leather'],
  ['Sewing','Clock','Watch','Bag','Clothing','Accessories'],
  ['Wear','Jewelry','Children','Toy','Maternity','Baby'],
  ['Lingerie','Pajama','Bed','Aromatherapy','Porcelain','Cooking','Pot','Home'],
  ['Men','Shirt','Suit','Outdoor','Shoes','Sport','Jean','Swimsuit','Casual','SALES']];
var questions = [['what','floor']];
var answers = [["Floor Guide","5F Sports & Jeans/Home Appliances/Gentlemen's Wear","4F Living & Leisure/Lingerie & Pajamas","3F Children's Wear/Young Ladies' Wear","2F Ladies' Elegance Fashion","1F Cosmetics/Luxury Boutique & Women's Shoes"]];
var dirMsg_prefix = "You could go to floor ";
var dirMsg_suffix = " to find what you want";
var errMsg = "Sorry. I don't get your question.";
var idRob = "000000";

$(document).ready(function() {
  $('#consent').modal();
  $('#waiting').modal({
    dismissible: false,
  });
  var myId = $("#jqueryVars").data("userid");
  var chooseId;
  var historyMsgs = {};
  var $openingChatContent;
  var titleNewMessageFunction;
  var together = {};

  if (myId) {
    var socket = io.connect();
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
      if(chooseId==idRob){
        replyMsg(myId, chooseId, $messageInput.val());
      }
      else {
        var newMsg = sendNewMsg(myId, chooseId, $messageInput.val());
        socket.emit('send message', newMsg);
      }
      $messageInput.val('');
    });

    // ------------------------------ Customer service part ------------------------------
    function replyMsg(myId, chooseId, thisMsg){
      var hasReply = false;
      sendNewMsg(myId, chooseId, thisMsg);
      thisMsg = thisMsg.toUpperCase();
      for(i in floors){ // Floor
        for(c in floors[i]){ // Category
          if(thisMsg.includes(floors[i][c].toUpperCase())){
            sendNewMsg(chooseId, myId, dirMsg_prefix+(i+1)+dirMsg_suffix);
            hasReply = true;
            break;
          }
        }
      }
      for(i in questions){
        var numHasThis = 0;
        for(limit in questions[i]){ // limit
          if(thisMsg.includes(questions[i][limit].toUpperCase())){
            numHasThis += 1;
          }
        }
        if(numHasThis==questions[i].length){
          for(j in answers[i])
            sendNewMsg(chooseId, myId, answers[i][j]);
          hasReply = true;
          return 0;
        }
      }
      if(!hasReply)
        sendNewMsg(chooseId, myId, errMsg);
    }

    function sendNewMsg(myId, chooseId, thisMsg){
      var newMsg = {
        fromUser: myId,
        toUser: chooseId,
        msg: thisMsg,
        read: false
      };
      DisplayMsg(newMsg);
      return newMsg;
    }
    // ------------------------------ ---------------------- ------------------------------

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
      // var friendsId = $('.friendsId').eq(index).html();
      var friendsId = $(this).data('friendsid');
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
      together = together;
      ShowNavbarStatus(together);
    });

    $(window).scroll(function() {
      socket.emit('scrolling', $(window).scrollTop());
    });

    socket.on('scroll', function(scrollTop) {
      // $(window).animate({scrollTop:scrollTop}, function() {
      //
      // };
      // $(window).animate({ scrollTop: scrollTop }, 600);
      $(window).scrollTop(scrollTop);
    });

    // socket.emit('page load', window.location.href);
    socket.on('page load', function(url) {
      // window.location.href = url;
    });

    $('#disconnectBtn').click(function() {
      socket.emit('disconnect hang out');
      $('#statusArea').css('display', 'none');
      location.reload();
    });

    socket.on('disconnect hang out', function() {
      socket.emit('disconnect hang out');
      $('#statusArea').css('display', 'none');
      $('.MouseDiv').css('display', 'none');
      location.reload();
    });

    $('.floorBtn').click(function() {
      socket.emit('floor button clicked', $(this).attr('id'));
    });
    socket.on('floor button clicked', function(btnId) {
      $(`#${btnId}`).click();
    });

    $('.indexStore').click(function() {
      socket.emit('highlight store', $('.indexStore').index(this));
    });
    socket.on('highlight store', function(storeIndex) {
      $('.indexStore').eq(storeIndex).click();
    });

    $('.highlight').click(function() {
      socket.emit('enter store', $('.highlight').index(this));
    });
    socket.on('enter store', function(highlightIndex) {
      $('.highlight').eq(highlightIndex).click();
    });

    $('#topbarLogo').click(function() {
      socket.emit('back to mall');
    });
    socket.on('back to mall', function(nothing) {
      window.location = '/';
    });

    $('.productCard').click(function() {
      socket.emit('enter product', $('productCard').index(this));
    });
    socket.on('enter product', function(productIndex) {
      $('.productCard').eq(productIndex).click();
    });

    $('#aboutBtn').click(function() {
      socket.emit('about button clicked');
    });
    socket.on('about button clicked', function() {
      window.location = $('#aboutBtn').attr('href');
    });

    $('#storeOwnerName').click(function() {
      socket.emit('store owner clicked');
    });
    socket.on('store owner clicked', function() {
      window.location = $('#storeOwnerName').attr('href');
    });

    $('.storeTr').click(function() {
      socket.emit('user store table clicked', $('.storeTr').index(this));
    });
    socket.on('user store table clicked', function(trIndex) {
      window.location = $('.storeTr').eq(trIndex).data('hrefurl');
    });

    function myMoveFunction(mouse){

      var x = mouse.x;
      var y = mouse.y;
      console.log(mouse);
      if (y < 64) y = 64;
      $('.MouseDiv').css('display', 'block');
      $(".MouseDiv").css({left:x, top:y});
    }
    window.setInterval(function(){
      socket.emit('mouse move', mouse);
    }, 100);

    var mouse = {}
    $( "body" ).mousemove(function( event ) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

    });
    socket.on('mouse move', function(mouse) {
      myMoveFunction(mouse);
    });

    // ------------------------------ run into friends part ------------------------------
    var positionId = $("#jqueryVars").data("storeid");
    var status = $("#jqueryVars").data("storestatus");
    var friendlist = [];
    var info = {};
    if (positionId) {
      if(status == "out"){
        //alert("out and emit");
        info.myId = myId;
        info.positionId = positionId;
        socket.emit('leave this store', info);
      }
      else {
        info.myId = myId;
        info.positionId = positionId;
        socket.emit('run into friends', info);
        socket.emit('update shopping list', positionId);
      }
      socket.on('someone is shopping', function(data) {
        if(data.positionId == positionId && data.user.facebook.id != myId){
          addIcon(data.user.facebook.profilePic, data.user.facebook.name, data.user.facebook.id);
        }
      });

      socket.on('updating person icon', function(userlist) {
        for(var i in userlist){
          if(userlist[i].facebook.id != myId)
            addIcon(userlist[i].facebook.profilePic, userlist[i].facebook.name, userlist[i].facebook.id);
        }
      });

      socket.on('remove this person icon', function(user) {
        removeThisIcon(user.facebook.id);
      });

      function addIcon(pic, name, id){
        if(friendlist.indexOf(id) != -1)
          return;

        friendlist.push(id);
        var fbFriends = $(".friendsId");
        var users = $(".UserIcon").html();
        var greenColor = "chip green lighten-2";
        var subclass = "chip"
        for(var i = 0; i < fbFriends.length; i++){
          if($(fbFriends[i]).html() == id ){
            subclass = greenColor;
            console.log(subclass);
            break;
          }
        }
        users += `<div class='${subclass}' data-id=${id}><img src=${pic} alt="head photo">${name}</div>`;

        $(".UserIcon").html(users);
      }

      function removeThisIcon(id){
        var index = friendlist.indexOf(id);
        if(index != -1){
          delete friendlist[index];
          var chips = $(".chip");
          for(var i = 0; i < chips.length; i++){
            console.log($(chips[i]).context);
            if($($(chips[i]).context).data('id') == id){
              $(chips[i]).remove();
            }
          }
        }
      }
    }
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
      $(".chatCollapsible").eq(index).find('i').css('color', 'rgba(0,0,0,0.54)');
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

  function ShowNavbarStatus(together) {
    if (together.status) {
      $('#statusArea').css('display', 'block');
      $('#shoppingStatus').html(`${together.status} ${together.company.name}`);
    }
  }
});
