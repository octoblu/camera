var app = angular.module('MyApp', ['ngMaterial']);

app.controller('AppCtrl', function($scope) {

  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++)
  {
    if (query[i] === "") // check for trailing & with no param
    continue;

    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }
  var conn = meshblu.createConnection({
    "uuid": GET.uuid,
    "token": GET.token
  });

  $scope.webRTC  = "http://camera.octoblu.com/webrtc.html?uuid=" + GET.uuid + "&token=" + GET.token;
  $scope.apply;

  conn.on('ready', function(data){
    console.log('UUID AUTHENTICATED!');
    conn.subscribe({uuid: GET.uuid, types: ["sent"]});

    conn.on('message', function(data){

      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var img = new Image();

      img.onload = function() {
        context.drawImage(this, 0, 0, canvas.width, canvas.height);
      }
      img.src = data.payload.pictures;

    });

  });

});
