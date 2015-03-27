

var df = require('dateformat')


var arDrone = require('../node_modules/ar-drone')
var arDroneConstants = require('../node_modules/ar-drone/lib/constants')

var autonomy = require('../node_modules/ardrone-autonomy')


var client  = arDrone.createClient();


// client.on('navdata', console.log);



function navdata_option_mask(c) {
  return 1 << c;
}

// From the SDK.
var navdata_options = (
    navdata_option_mask(arDroneConstants.options.DEMO)
  | navdata_option_mask(arDroneConstants.options.VISION_DETECT)
  | navdata_option_mask(arDroneConstants.options.MAGNETO)
  | navdata_option_mask(arDroneConstants.options.WIFI)
);


// Connect and configure the drone
client.config('general:navdata_demo', true);
client.config('general:navdata_options', navdata_options);
client.config('video:video_channel', 1);
client.config('detect:detect_type', 12);
// client.config('control:flying_mode', 2);



var control = new autonomy.Controller(client, {debug: false});
var mission = new autonomy.Mission(client, control, {debug: false});


mission.takeoff()
 .altitude(1.6)
       .hover(20000)
       // .altitude(1.4)
       // .forward(0.5)
       // .right(0.5)
       // .backward(0.5)
       // .left(0.5)
       // .hover(500)
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

