$(document).ready(function(){
  console.log($(".indexStore").length);
  for(var i = 0 ; i < $(".indexStore").length; i++){
    var myclass = "circle";
    myclass += i;
    $($(".indexStore")[i]).addClass(myclass);
  }
});

$(".indexStore").hover(function(){
  console.log("hello !!" );
  console.log($(this));
});
