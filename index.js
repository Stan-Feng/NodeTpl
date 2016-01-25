var config = require('./server/config/config');

var app = require('./server/app');
var logger = require('./server/utils/logger');

app.listen(config.port, function (req, res, next) {
  logger.log(`Server is ruunning at port ${config.port}....`);
});
