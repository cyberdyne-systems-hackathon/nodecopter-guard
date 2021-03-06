var arDrone = require('../node_modules/ar-drone');
var arDroneConstants = require('../node_modules/ar-drone/lib/constants');
var autonomy = require('../node_modules/ardrone-autonomy');

var http = require("http");
var drone = require("../node_modules/dronestream");

var client  = arDrone.createClient();


function navdata_option_mask(c) {
  return 1 << c;
}

// From the SDK.
var navdata_options = (
  navdata_option_mask(arDroneConstants.options.DEMO)| 
  navdata_option_mask(arDroneConstants.options.VISION_DETECT)| 
  navdata_option_mask(arDroneConstants.options.MAGNETO)
  | navdata_option_mask(arDroneConstants.options.WIFI)
);


// Connect and configure the drone
client.config('general:navdata_demo', true);
client.config('general:navdata_options', navdata_options);
client.config('video:video_channel', 1);
client.config('detect:detect_type', 12);

client.config();

var control = new autonomy.Controller(client, {debug: false});
var mission = new autonomy.Mission(client, control, {debug: false});


var server = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(server);
server.listen(5555);


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

