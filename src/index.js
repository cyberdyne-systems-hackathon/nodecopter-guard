var df = require('dateformat')
  , autonomy = require('../node_modules/ardrone-autonomy')
  , mission  = autonomy.createMission()

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

