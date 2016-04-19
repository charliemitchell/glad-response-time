var glad = require('glad');
var config = require(process.cwd() + '/config');

module.exports = {

    name : 'Glad Response Time',

    minGladVersion : '0.5.6',

    hook : 'onBeforeBodyParser',

    method : function (server, app, express, next) {

        var mongoose = require('glad').mongoose;
        var tokenizer = require('glad').tokenizer;
        var moment = require('glad').moment;
        var Schema = mongoose.Schema;

        var responseTimes = new Schema({
            url : {
                type : String
            },
            method : {
                type : String
            },
            responseTime : {
                type : Number
            },
            date: {
                type : Date
            }
        });

        var model = mongoose.model('glad_response_time', responseTimes);
        var count = 0;

        app.use(function (req, res, callback) {

            var skip = 5;

            if (config.gladResponseTimes && config.gladResponseTimes.all) {
                skip = 1;
            } else if (config.gladResponseTimes && config.gladResponseTimes.logEvery) {
                skip = config.gladResponseTimes.logEvery || 1;
            }

            req.on('end', function () {
                count += 1;

                if (count % skip === 0) {
                    count = 0;
                    var now = new Date().getTime();
                    var start = tokenizer.timeDecoded(req.id);
                    console.log(("Timings   " + req.id + '  ' +  (now - start) + 'ms').magenta);
                    new model({
                        url : req.url,
                        method: req.method,
                        responseTime : now - start,
                        date : new moment(start).toDate()
                    }).save(function (err) {
                        if (err) {
                            console.error('Error saving Response Time From glad-response-times', err);
                        }
                    });
                }
            });
            callback();
        });
        next();
    }
};