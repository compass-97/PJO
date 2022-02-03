const mongoose = require('mongoose');

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  mongoose
    .connect(
      'mongodb+srv://punco:itlmpsywtra97!@cluster0.xnh60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
        if (error) {
          console.log('mongodb error', error);
        } else {
          console.log('mongodb connected');
        }
      },
    );
};

mongoose.connection.on('error', (error) => {
  console.error('mongodb connection error', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('mongodb disconnected. retry connect again');
  connect();
});

module.exports = connect;
