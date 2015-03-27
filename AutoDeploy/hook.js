// Listen on port 9001
var gith = require('gith').create( 9001 );
// Import execFile, to run our bash script
var execFile = require('child_process').execFile;

gith({
    repo: 'cyberdyne-systems-hackathon/nodecopter-guard'
}).on( 'all', function( payload ) {
    if( payload.branch === 'master' )
    {
            // Exec a shell script
            execFile('/AutoDeploy/hook.sh', function(error, stdout, stderr) {
                    // Log success in some manner
                    console.log( 'NodeCopter has downloaded the repo' );
            });
    }
});
