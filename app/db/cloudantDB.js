'use strict';
module.exports = function(){
    var config = require('./../../config.json'),
    dbCredentials = {
        'dbName': config.cloudantDBNAME
    },
    cloudant,
    db;
    if (process.env.VCAP_SERVICES) {
        var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        for (var vcapService in vcapServices) {
            if (vcapService.match(/cloudant/i)) {
                dbCredentials.url = vcapServices[vcapService][0].credentials.url;
            }
        }
    } else {
        dbCredentials.url = config.cloudantURL;
    }
    cloudant = require('cloudant')(dbCredentials.url);
    cloudant.db.create(dbCredentials.dbName, function(err, res) {
        if (err) {
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
    });
    return cloudant.use(dbCredentials.dbName);
};