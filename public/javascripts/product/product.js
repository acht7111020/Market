$(document).ready(function(){
  // $('.carousel.carousel-slider').carousel({full_width: true});

  $('#mainPictureField').height(parseInt($('#mainPictureField').width()));
  $('.minorPictureField').height(parseInt($('.minorPictureField').width()));


  $('.productPictures').click(function(){
    $("#mainPicture").attr("src", $(this).attr("src"));
  });

  var userId = $('#editBtn').data('userid');
  var ownerId = $('#editBtn').data('ownerid');

  if (userId != ownerId) {
    $('#editBtn').css('display', 'none');
  }
});
