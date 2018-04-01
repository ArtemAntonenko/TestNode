module.exports = {
  connectToMongoDB () {
    const mongoUrl = 'mongodb://artemkpi:art220990@ds255588.mlab.com:55588/artem-test-db'
    let mongoose   = require('mongoose');
    mongoose.connect(mongoUrl);
  }
}

