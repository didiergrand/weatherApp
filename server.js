// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

const weatherData = [];

app.get('/all',getWeatherData)

function getWeatherData(req,res){
  res.send(weatherData);
}



app.post('/addWeather', addWeather )
function addWeather (req, res){

    newEntry = {
      date: req.body.date,
      temp: req.body.temp,
      feelings: req.body.feelings
    }

   weatherData.push(newEntry)
   res.send(weatherData)
   console.log(weatherData)

}
