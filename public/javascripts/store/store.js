$(document).ready(function(){
  $('.card-image').height(parseInt($('.card-image').eq(0).width()));
  $('#counter').height(parseInt($('.card').eq(1).height()));
  $('.productCard').click(function(e){
    // console.log($(this).find('.productId').html());
    var productId = $(this).data('productid');
    window.location = `/product/${productId}`;
  });

  var userId = $('#editBtn').data('userid');
  var ownerId = $('#editBtn').data('ownerid');
  if (userId != ownerId) {
    $('#editBtn').css('display', 'none');
  }
});
