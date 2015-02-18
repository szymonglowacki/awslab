var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var autoscaling = new AWS.AutoScaling();

var task =  function(request, callback){
	
    var params = {
        AutoScalingGroupName: 'GlowackiASG',
		DesiredCapacity: 2,
    };
    autoscaling.setDesiredCapacity(params, function(err, data) {
		if (err)
			callback(err, null);
		else {
			callback(null,data);
		}
    });
}

exports.lab = task