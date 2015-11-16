
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

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');

  conn.subscribe({uuid: GET.uuid, types: ["sent"]});

  conn.on('message', function(data){
    console.log('message received', data);
    var img = new Image();
    img.src = data.payload.pictures;
    context.drawImage(img,0,0);

  });

});
