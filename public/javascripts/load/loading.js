var myVar;

$(document).ready(function(){
  myVar = window.setTimeout("redirect()",3000);
});

function redirect(){
  //alert( $("#LoadingType").val());
  if($("#LoadingType").val() == "purchase")
    window.location = `/purchase/`;
  else
    window.location = `/`;

}
