const express = require('express');

const Router = express.Router();
const {
    addFlight,
    getAllFlights,
    getOneFlight,
    updateFlight,
    deleteFlight
} = require('../controllers/flightController');

Router.route("/").get(getAllFlights).post(addFlight)
Router.route("/:id").get(getOneFlight).patch(updateFlight).delete(deleteFlight)

module.exports = Router;

