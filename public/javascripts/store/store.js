$(document).ready(function(){
  $('.card-image').height(parseInt($('.card-image').eq(1).width()));
  $('#counter').height(parseInt($('.card').eq(1).height()));
  $('.card-image').click(function(e){
    window.location = '/store/products';
  });
});
