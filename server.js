// Express to run server and routes
const express = require('express');

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
let app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('website'));

// Initialize the listenning with: URL
app.listen(3000, ()=> {
    console.log('Application running on port:3000');
    console.log('http://localhost:3000');
});

// Get method to send data to Client side
app.get('/weather', (request, response) => {
    response.send(projectData).status(200);
});

// Post Route
app.post('/addData', addData);

function addData(request, response) {
    // console.log(request.body);
    projectData['date'] = request.body.date;
    projectData['city'] = request.body.city;
    projectData['temperature'] = request.body.temp;
    projectData['description'] = request.body.description;
    projectData['feelings'] = request.body.content;
    response.send(projectData).status(200);
    console.log('The data is pushed');
}