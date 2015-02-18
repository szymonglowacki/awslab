var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var ec2 = new AWS.EC2();

var task =  function(request, callback){
	
    var params = {
        ImageId: 'ami-4983d779', 
        MaxCount: 1, 			 
		MinCount: 1, 			 
		DisableApiTermination: false,
		InstanceInitiatedShutdownBehavior: 'stop',
		InstanceType: 't1.micro',
		Monitoring: {
			Enabled: true  		 
		},
		KeyName: 'szymon.glowacki',
		DisableApiTermination: false,
		SecurityGroupIds: [
			'default',
		],
		Placement: {
			AvailabilityZone: 'us-west-2c',
		}
    };
    ec2.runInstances(params, function(err, data) {
		if (err)
			console.log(err, err.stack); // an error occurred
		else {			
			var res = {
				IP: data.Instances[0].PrivateIpAddress,
				DNS: data.Instances[0].PrivateDnsName
			}
			callback(null,"Adres IP: " + res.IP + "<br>" +	"DNS: " + res.DNS);
		}
    });
}

exports.lab = task