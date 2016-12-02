$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({full_width: true});

  $('#mainPicture').height(parseInt($('#mainPicture').width()));
  // console.log(parseInt($('#productPicturesField').width()));
});
