var friendlist = [];
$(document).ready(function() {
  var myId = $("#jqueryVars").data("userid");
  var positionId = $("#jqueryVars").data("storeid");
  var status = $("#jqueryVars").data("storestatus");
  var info = {};
  if (myId && positionId) {
    var socket = io.connect();
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
      console.log(data);
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
      console.log(user);
      removeThisIcon(user.facebook.id);
    });


    function addIcon(pic, name, id){
      if(friendlist.indexOf(id) != -1)
        return;
      friendlist.push(id);
      console.log(id);
      console.log(friendlist);
      console.log(friendlist.indexOf(id));
      var users = $(".UserIcon").html();
      users += `<div class="chip" data-id=${id}><img src=${pic} alt="head photo">${name}</div>`;
      $(".UserIcon").html(users);
      /*
      <div class="chip" >
         <!--img src="images/yuna.jpg" alt="Contact Person"-->
         <img src="{{fb_user.profilePic}}" alt="head photo">
         {{fb_user.name}}
       </div>
      */
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
});
