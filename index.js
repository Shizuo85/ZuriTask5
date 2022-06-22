const express = require('express');
require('dotenv').config();
const routes = require('./routes/flightRoute');

const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
	res.send("<h1>Flight Api</h1><a href='/api/v1/flights'>flights route</a>");
});

app.use('/api/v1/flights', routes);

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = () => {
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}...`);
	});
};

start();
