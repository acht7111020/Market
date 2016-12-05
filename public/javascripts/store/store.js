$(document).ready(function(){
  $('.card-image').height(parseInt($('.card-image').eq(0).width()));
  $('#counter').height(parseInt($('.card').eq(1).height()));
  $('.card-image').click(function(e){
    // console.log($(this).find('.productId').html());
    var productId = $(this).find('.productId').html();
    window.location = `/store/product/${productId}`;
  });
});
