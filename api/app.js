const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const routes = require('./routes');
const connect = require('./schemas');

connect();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`${PORT} CONNECTED`);
});
