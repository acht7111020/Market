$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({full_width: true});

  $('#mainPictureField').height(parseInt($('#mainPictureField').width()));
  $('.minorPictureField').height(parseInt($('.minorPictureField').width()));


  $('.productPictures').click(function(){
    $("#mainPicture").attr("src", $(this).attr("src"));
  });
});
