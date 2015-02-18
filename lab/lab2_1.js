var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var ec2 = new AWS.EC2();

var task =  function(request, callback){
	
    var params = {
        InstanceIds: [
            'i-ff358af3'
        ]
    };
    ec2.describeInstances(params, function(err, data) {
		if (err)
			console.log(err, err.stack); // an error occurred
		else {
			var t_data = data.Reservations[0];
			var res = {
				IDinst: t_data.ReservationId,
				IDuser: t_data.OwnerId,
				Typ:    t_data.Instances[0].InstanceType,
				pubDNS: t_data.Instances[0].PublicDnsName,
				Status: t_data.Instances[0].State.Name
			}
			console.log(res);
			callback(null,"ID instancji: " + res.IDinst + "<br>" +
				"ID właściciela: " + res.IDuser + "<br>" +
				"Typ instancji: " + res.Typ + "<br>" +
				"Publiczny DNS: " + res.pubDNS + "<br>" +
				"Status: " + res.Status + "<br>"
			);
		}
    });
}

exports.lab = task