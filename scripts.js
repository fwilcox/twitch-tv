$(document).ready(function() {
  // Set up base api call url
  var baseUrl = "https://wind-bow.gomix.me/twitch-api";
  // Preselected twitch users
  var campList = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "freecodecamp"
  ];
  // Empty array to store freeCodeCamp followers
  var friends = [];
  //Get freeecodecamps followers and store in array
  $.ajax({
    type: "GET",
    url: baseUrl + '/users/freecodecamp/follows/channels',
    dataType: "jsonp",
    success: function(data1) {
      for (var i = 0; i < data1.follows.length; i++) {
        var listName = data1.follows[i].channel.display_name;
        friends.push(listName);
      }
      // Combine name arrays
      var searchList = campList.concat(friends);
      // Get follows info
      for (var i = 0; i < searchList.length; i++) {
        $.ajax({
          type: 'GET',
          url: baseUrl + '/channels/' + searchList[i],
          dataType: 'jsonp',
          success: function(data2) {
            $.getJSON(baseUrl + '/streams/' + data2.name +'?callback=?',function(data3) {
              var url = data2.url;
              var game = data2.game;
              var logo = data2.logo;
              var name = data2.name;
              console.log(data3.stream);
              // Provide logo if none availaible
              if (logo === null) {
              logo = 'https://ih1.redbubble.net/image.7781578.0152/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1.jpg';
             }
              // Check Status
            if (data3.stream === null) {
              $('#followers-offline').prepend('<div class="row user-listing">' + '<div class="col-xs-6 img-holder">' + '<img class="profile-pic" src="' + logo + '">' + '<a href="' + url + '" target="blank">' + name + '</a></div>' + '<div class="col-xs-4 game-listing">Offline</div>' + '<div class="col-xs-2 status"><span class="offline"><i class="fa fa-times fa-2x" aria-hidden="true"></i></span></div></div>' );

            } else {
              $('#followers-online').prepend('<div class="row user-listing">' + '<div class="col-xs-6 img-holder">' + '<img class="profile-pic" src="' + logo + '">' + '<a href="' + url + '" target="blank">' + name + '</a></div>' + '<div class="col-xs-4 game-listing">' + game +'</div>' + '<div class="col-xs-2 status"><span class="online"><i class="fa fa-check fa-2x" aria-hidden="true"></i></span></div></div>' );
            }
            });
          }
        });
      }
    }
  });
  // Add toggle functionality
  $('#status-online').click(function(){
    $('#followers-offline').addClass('display');
    $('#followers-online').removeClass('display');
  });
  $('#status-offline').click(function(){
    $('#followers-online').addClass('display');
    $('#followers-offline').removeClass('display');
  });
  $('#status-all').click(function(){
    $('#followers-online').removeClass('display');
    $('#followers-offline').removeClass('display');
  });
});
