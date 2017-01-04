var friendlist = [];
$(document).ready(function() {
  var myId = $("#jqueryVars").data("userid");
  var productId = $("#storeId").val();
  var status = $("#storeStatus").val();
  var info = {};
  if (myId && productId) {
    var socket = io.connect();
    if(status == "out"){
      //alert("out and emit");
      info.myId = myId;
      info.productId = productId;
      socket.emit('leave this store', info);
    }
    else {
      info.myId = myId;
      info.productId = productId;
      socket.emit('run into friends', info);
      socket.emit('update shopping list', productId);
    }
    socket.on('someone is shopping', function(data) {
      console.log(data);
      if(data.productId == productId && data.user.facebook.id != myId){
        addIcon(data.user.facebook.profilePic, data.user.facebook.name, data.user.facebook.id);
      }
    });

    socket.on('updating person icon', function(userlist) {
      for(var i in userlist){
        if(userlist[i].facebook.id != myId)
          addIcon(userlist[i].facebook.profilePic, userlist[i].facebook.name, userlist[i].facebook.id);
      }
    });

    socket.on('remove this person icon', function(id) {
      console.log(id);
      //removeThisIcon(id);
    });


    function addIcon(pic, name, id){
      if(friendlist.indexOf(id) != -1)
        return;
      friendlist.push(id);
      console.log(pic);
      console.log(name);
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
        for(var i in chips){
          console.log($(chips[i]).context);
          // if($($(chips[i]).context).data('id') == id){
          //
          // }
            //$(chips[i]).remove();
        }
      }
    }
  }
});
