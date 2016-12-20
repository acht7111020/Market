$(document).ready(function() {
  $('#mainPicField').height(parseInt($('#mainPicField').width()) * 3 / 5);
  $('.minorPic').height(parseInt($('.minorPic').eq(0).width()) * 3 / 5);
  console.log($('.minorPic').eq(0).height());
  $('.plusIcon').css('line-height', parseInt($('.minorPic').eq(0).height()) + 'px');

  $(".uploadPic").each(function(){
    var index = $('.uploadPic').index(this);
    var $content = $('.picContent').eq(index);
    if ($(this).attr('src') != ''){
      $(this).css('display', 'block');
      $content.css('display', 'none');
    }
    else {
      $(this).css('display', 'none');
      $content.css('display', 'block');
    }
  });

  $(".fileUpload").change(function(){
    readURL(this);
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var index = $('.fileUpload').index(input);
      var $pic = $('.uploadPic').eq(index);
      var $content = $('.picContent').eq(index);
      $pic.css('display', 'block');
      $pic.attr('src', e.target.result);
      // $pic.css('background-image', `url('${e.target.result}')`);
      $content.css('display', 'none');
    }
    reader.readAsDataURL(input.files[0]);
  }
}
