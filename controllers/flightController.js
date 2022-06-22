// exports.example = (req, res) => {
//     console.log("example")
//     res.send("Flight example")
// }
const fs = require("fs")
let flights = JSON.parse(fs.readFileSync("./Flight.json", "utf-8"))

const writeFlight = () => {
    fs.writeFile(
        './Flight.json',
        JSON.stringify(flights),
        (err, result) => {
          if (err) {
            console.log(err)
            return
          }
          console.log('done with this task') 
        }
    )
} 
const addFlight = (req, res) => {
    const flight ={}
    const {title, time, price, date} = req.body
    if(title && time && price && date){
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;
        flight.id = flights.length
    }
    else{
        return res.status(400).json({ msg: "Insufficient data"})
    }
    flights.push(flight)
    writeFlight();
    res.status(201).json({addedFlight : flight})
}
const getAllFlights = (req, res) => {
        res.status(200).json({flights})
}
const getOneFlight = (req, res) => {
    const singleFlight = flights.find(element => element.id == req.params.id)
    if(!singleFlight){
        return res.status(400).json({msg: `no Flight with id : ${req.params.id}`})
    }
    res.status(200).json({singleFlight})
}
const updateFlight = (req, res) => {
    const updateFlight = flights.find(element => element.id == req.params.id)
    if(!updateFlight){
        return res.status(400).json({msg: `no Flight with id : ${req.params.id}`})
    }
    const {title, time, price, date} = req.body
    if(title){
        updateFlight.title = title;
    }
    if(time){
        updateFlight.time = time;
    }
    if(price){
        updateFlight.price = price;
    }
    if(date){
        updateFlight.date = date;
    }
    flights = flights.map(element => {
        if(element.id == updateFlight.id){
            element = updateFlight
        }
        return element
    })
    writeFlight();
    res.status(201).json({Update: updateFlight})
}
const deleteFlight =  (req, res) => {
    const deleteFlight = flights.find(element => element.id == req.params.id)
    if(!deleteFlight){
        return res.status(400).json({msg: `no Flight with id : ${req.params.id}`})
    }
    flights.splice(flights.indexOf(deleteFlight), 1)
    writeFlight();
    res.status(201).json({deletedFlight: deleteFlight})
}

module.exports = {
    addFlight,
    getAllFlights,
    getOneFlight,
    updateFlight,
    deleteFlight
}

