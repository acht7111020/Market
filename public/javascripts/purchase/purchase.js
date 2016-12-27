var center_left = '35%', center_top = '32.5%';
var highlight_left = '5%', highlight_top = '29%';
var topping_parameters = '60%', leftting_parameters = 35;
var highlight_index = 6;

$(document).ready(function(){

  for(var i = 0 ; i < ($(".indexStore").length-1); i++){
    var left_start = leftting_parameters*(i%3).toString() + '%';
    var top_start = (i > 2)? topping_parameters: '0%';
    $($(".indexStore")[i]).css({left: left_start, top:top_start});
  }
  //$($(".indexStore")[$(".indexStore").length-1]).hide();
  setHighLightImage($(".indexStore")[$(".indexStore").length-1]);
});

function purchase(this_id){
  window.location = `/purchase/buying-store/${this_id}`;
}
function setHighLightImage(tmpItem){
  $(tmpItem).removeClass('indexStore');
  $(tmpItem).addClass('highlight');
  var contextimage = $($(tmpItem).context).data('content');
  var images = contextimage.split(',');
  var purchasebox = $(tmpItem).html();
  if(purchasebox.trim() == ""){
    tmpItem.style = "";
    var img = ""
    for (var i = 0 ; i < images.length; i++){
      img += `<img src=${images[i]}>`
    }
    $(tmpItem).html(img);
  }
  else{
    $(tmpItem).html(purchasebox);
  }

}
