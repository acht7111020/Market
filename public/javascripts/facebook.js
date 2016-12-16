function statusChangeCallback(response) {
  if (response.status === 'connected') {
    testAPI();
    getFriendList();
  } else if (response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '375788132760115',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.5'
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
      var username = response.name;
      FB.api('/me/picture', function(response) {
        var url = response.data['url'];
      });
  });
}
function getName(){
  FB.api(
      "/me/",
      function (response) {
        if (response && !response.error) {
          return response.name;
        }
      }
  );
}
function getEmail(){
  FB.api(
      "/me/email",
      function (response) {
        if (response && !response.error) {
          return response.email;
        }
      }
  );
}
function getPicture(){
  FB.api(
      "/me/picture",
      function (response) {
        if (response && !response.error) {
          return response.data['url'];
        }
      }
  );
}
function getFriendList() {
  FB.api('/me/friends',
    function (response) {
      if (response && !response.error) {
        for(let friend of response.data){
          var name = friend['name'];
          console.log(name);
        }
          return response.data;
      }
    });
}
