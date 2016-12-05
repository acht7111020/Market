$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({full_width: true});

  $('#mainPicture').height(parseInt($('#mainPicture').width()));
  $('.minorPicture').height(parseInt($('.minorPicture').width()));


  $('.productPictures').click(function(){
    $('#mainPicture').css('background-image', $(this).css('background-image'))
    console.log($(this).css('background-image'));
});
});
