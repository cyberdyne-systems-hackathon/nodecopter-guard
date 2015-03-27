var df = require('dateformat');
var autonomy = require('../node_modules/ardrone-autonomy');
var mission  = autonomy.createMission();
var http = require('http');


  client.animateLeds('doubleMissile', 5, 2);
  captureImage();
  startJourney();


function captureImage() {
  console.log('Capturing image...');

  var pngStream = mission.client().getPngStream();

  var lastPng;
  pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer) {
      lastPng = pngBuffer;
    });

  var server = http.createServer(function(req, res) {
    if (!lastPng) {
      res.writeHead(503);
      res.end('No data');
      return;
    }

    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(lastPng);
  });

  server.listen(8080, function() {
    console.log('Serving on port 8080 ...');
  });
}

function startJourney() {
  console.log('Starting journey...');

  mission.takeoff()
         .go({x:0, y:0, z:1.5})
         .hover(30000)
         .land();

  mission.run(function (err, result) {
      if (err) {
          console.trace("Oops, something bad happened: %s", err.message);
          mission.client().stop();
          mission.client().land();
      } else {
          console.log("We are done!");
          process.exit(0);
      }
  });
}

