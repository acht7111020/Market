$(document).ready(function() {
  $('#mainPic').height(parseInt($('#mainPic').width()) * 3 / 5);
  $('.minorPic').height(parseInt($('.minorPic').eq(0).width()) * 3 / 5);
  console.log($('.minorPic').eq(0).height());
  $('.plusIcon').css('line-height', parseInt($('.minorPic').eq(0).height()) + 'px');

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

      $pic.css('background-image', `url('${e.target.result}')`);
      $content.css('display', 'none');
    }
    reader.readAsDataURL(input.files[0]);
  }
}
