var myVar;

$(document).ready(function(){
  myVar = window.setTimeout("redirect()",3000);
});

function redirect(){
  window.location = `/`;
}
