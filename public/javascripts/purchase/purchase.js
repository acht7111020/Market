var center_left = '40%', center_top = '35.5%';
var highlight_left = '13%', highlight_top = '33%';
var topping_parameters = '70%', leftting_parameters = 40;
var highlight_index = 6;

$(document).ready(function(){
  setinit(".partA", 0);
  setinit(".partB", 1);
  setinit(".partC", 2);

});
function setinit(part, index){
  for(var i = 0 ; i < ($(part).length-1); i++){
    var left_start = leftting_parameters*(i%3).toString() + '%';
    var top_start = (i > 2)? topping_parameters: '0%';
    $($(part)[i]).css({left: left_start, top:top_start});
  }
  //$($(".indexStore")[$(".indexStore").length-1]).hide();
  setHighLightImage($(part)[$(part).length-1], index);
}
function purchase(this_id){
  window.location = `/purchase/buying-store/${this_id}`;
}
function setHighLightImage(tmpItem, index){
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
