const mongoose = require("mongoose")

const FlightSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "must provide title"],
        trim : true,
        maxLength : [20, "title cannot be too long"]
    },
    time: {
        type: String,
        required: [true, "must provide time"]
    },
    price: {
        type: Number,
        required: [true, "Product price must be provided"]
    },
    date: {
            type: String,
            required: [true, "Date must be provided"]
    }
})

module.exports = mongoose.model("Flight", FlightSchema)