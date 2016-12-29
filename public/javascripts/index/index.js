var center_left = '40%', center_top = '35.5%';
var highlight_left = '13%', highlight_top = '33%';
var topping_parameters = '70%', leftting_parameters = 40;
var highlight_index = 6;

$(document).ready(function(){
  setinit(".partA", 0);
  setinit(".partB", 1);
  setinit(".partC", 2);


  $(".partA").click(function(evt){
      storeClick(this, ".partA", 0)
  });

  $(".partB").click(function(evt){
      storeClick(this, ".partB", 1)
  });

  $(".partC").click(function(evt){
      storeClick(this, ".partC", 2)
  });

  $(".highlight").click(function(evt){
    var paths = $($(this).context).data('link');
    if (paths)
      window.location = `/store/${paths}`;
  });

});

function setinit(part, index){

  $($(part)[$(part).length-1]).css({left: center_left, top:center_top, opacity:'0.0'});
  setHighLightImage($(part)[$(part).length-1], index);
  for(var i = 0 ; i < ($(part).length-1); i++){
    var left_start = leftting_parameters*(i%3).toString() + '%';
    var top_start = (i > 2)? topping_parameters: '0%';
    $($(part)[i]).css({left: left_start, top:top_start});
  }
}

function storeClick(mythis, part, index){
  var level = GetLevel($(mythis).context.style.left, $(mythis).context.style.top);
  var contextimage = $($(mythis).context).data('content');
  var images;
  images= contextimage.split(',');
  var img = "";
  for (var i = 0 ; i < images.length; i++){
    img += `<img src=${images[i]}>`
  }
  $($(".highlight")[index]).html(img);
  $($(".highlight")[index]).data('link', $($(mythis).context).data('link'));
  CircleMove(level, highlight_index, part);
  var div = $($(".highlight")[index]);
  var left_start = (getLeftStart(level) - 18).toString() + '%';
  var top_start = (level > 2)? topping_parameters: '0%';
  div.css({left: left_start, top:top_start,  opacity: '0.1'});
  div.animate({top: highlight_top, left:highlight_left,  opacity: '1.0'}, 1000);

}

function CircleMove(pre_index, highlight_index, part){

  for(var i = 0 ; i < $(part).length; i++){
    var level = GetLevel($(part)[i].style.left, $(part)[i].style.top);
    if(level == pre_index){
      $($(part)[i]).css({left: center_left, top:center_top, opacity:'0.0'});
      continue;
    }else if (level == highlight_index){
      $($(part)[i]).css({left: '0%', top:'0%', opacity:'1.0'});
      continue;
    }else if (level >= pre_index)
      continue;

    level += 1;
    if(level > 5) level = 5;
    var left_start = getLeftStart(level).toString() + '%';
    var top_start = (level > 2)? topping_parameters: '0%';
    $($(part)[i]).css({left: left_start, top:top_start});
  }

}

function setHighLightImage(tmpItem, index){
  console.log(index);
  var contextimage = $($(tmpItem).context).data('content');
  console.log(contextimage);
  var images;
  images = contextimage.split(',');
  var img = "";
  for (var i = 0 ; i < images.length; i++){
    img += `<img src=${images[i]}>`
  }
  //var img = `<img src=${contextimage}>`
  $($(".highlight")[index]).html(img);
  //$(".highlight").data('link') = $($(tmpItem).context).data('link');
  $($(".highlight")[index]).data('link', $($(tmpItem).context).data('link'));
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
