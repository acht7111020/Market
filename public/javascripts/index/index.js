var center_left = '35%', center_top = '32.5%';
var highlight_left = '5%', highlight_top = '29%';
var topping_parameters = '60%', leftting_parameters = 35;
var highlight_index = 6;

$(document).ready(function(){
  $($(".indexStore")[$(".indexStore").length-1]).css({left: center_left, top:center_top, opacity:'0.0'});
  setHighLightImage($(".indexStore")[$(".indexStore").length-1]);
  for(var i = 0 ; i < ($(".indexStore").length-1); i++){
    var left_start = leftting_parameters*(i%3).toString() + '%';
    var top_start = (i > 2)? topping_parameters: '0%';
    $($(".indexStore")[i]).css({left: left_start, top:top_start});
  }

  $(".indexStore").click(function(evt){
    var level = GetLevel($(this).context.style.left, $(this).context.style.top);
    var contextimage = $($(this).context).data('content');
    var images = contextimage.split(',');
    var img = "";
    for (var i = 0 ; i < images.length; i++){
      img += `<img src=${images[i]}>`
    }
    $(".highlight").html(img);
    $('.highlight').data('link', $($(this).context).data('link'));
    CircleMove(level, highlight_index);
    var div = $(".highlight");
    var left_start = (getLeftStart(level) - 18).toString() + '%';
    var top_start = (level > 2)? topping_parameters: '0%';
    div.css({left: left_start, top:top_start,  opacity: '0.1'});
    div.animate({top: highlight_top, left:highlight_left,  opacity: '1.0'}, 1000);

  });

  $(".highlight").click(function(evt){
    var paths = $($(this).context).data('link');
    if (paths)
      window.location = `/store/${paths}`;
  });

});

function CircleMove(pre_index, highlight_index){

  for(var i = 0 ; i < $(".indexStore").length; i++){
    var level = GetLevel($(".indexStore")[i].style.left, $(".indexStore")[i].style.top);
    if(level == pre_index){
      $($(".indexStore")[i]).css({left: center_left, top:center_top, opacity:'0.0'});
      continue;
    }else if (level == highlight_index){
      $($(".indexStore")[i]).css({left: '0%', top:'0%', opacity:'1.0'});
      continue;
    }else if (level >= pre_index)
      continue;

    level += 1;
    if(level > 5) level = 5;
    var left_start = getLeftStart(level).toString() + '%';
    var top_start = (level > 2)? topping_parameters: '0%';
    $($(".indexStore")[i]).css({left: left_start, top:top_start});
  }

}

function setHighLightImage(tmpItem){
  var contextimage = $($(tmpItem).context).data('content');
  var images = contextimage.split(',');
  var img = "";
  for (var i = 0 ; i < images.length; i++){
    img += `<img src=${images[i]}>`
  }
  $(".highlight").html(img);
  //$(".highlight").data('link') = $($(tmpItem).context).data('link');
  $('.highlight').data('link', $($(tmpItem).context).data('link'));
}

function GetLevel(left, top){
  var level = 0;
  if(top == topping_parameters ) {
    if(left == ((leftting_parameters).toString()+'%')) level = 4;
    else if (left == '0%') level = 5;
    else level = 3;
  }
  else if (top == '0%'){
    if(left == ((leftting_parameters).toString()+'%')) level = 1;
    else if (left == ((leftting_parameters*2).toString()+'%')) level = 2;
  }else {
    level = highlight_index;
  }
  return level;
}

function getLeftStart(level){
  if(level > 2)
    var left_start = leftting_parameters*(2-level%3);
  else
    var left_start = leftting_parameters*(level%3);
  return left_start;
}
