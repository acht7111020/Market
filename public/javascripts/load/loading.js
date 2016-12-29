var myVar;

$(document).ready(function(){
  myVar = window.setTimeout("redirect()",3000);
});

function redirect(){
  //alert("redirect");
  var type = $("#thistype").val();
  var level = $("#thislevel").val();
  window.location = `/${type}/${level}`;

}
