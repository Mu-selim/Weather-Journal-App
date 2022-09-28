// OpenWeather API key
const apiKey = '&appid=8ae27bb50c48a9f8b8ecf7bf04194d9c&units=imperial';

/**
 * Global variables to link all the
 * elements once.
 */
const zip = document.querySelector('#zip'),
      errorMessage = document.querySelector('#error'),
      feelings = document.querySelector('#feelings'),
      generate = document.querySelector('#generate'),
      date = document.querySelector('#date'),
      cityName = document.querySelector('#cityName'),
      temp = document.querySelector('#temp'),
      description = document.querySelector('#description'),
      content = document.querySelector('#content');


/**
 * Date object to display it,
 * it takes the formula: mm/dd/yyyy
 */
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();


/**
 * This function takes zip code of 
 * the city to fetch the OpenWeather 
 * API and returns JSON object.
 */
const fetchAPI = async(zipCode) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${apiKey}`)
    return (await response.json());
}

/**
 * This function takes two paramters:
 * (url): the POST link to send data to server
 * (data): an object have properties to be sent
 * 
 * if all works will, then it will check status
 * of response and call function to update UI
 */
const postData = async (url = '', data = {}) => {
    let response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify(data),
    });

    if (response.ok) {
        updateUI();
    }
}

/**
 * This function fetches weather data
 * (makes GET request) from the local
 * server, convert response to JSON object
 * then update UI.
 */
const updateUI = async () => {
    let request = await fetch('/weather');
    try {
        const allData = await request.json();
        date.textContent = allData['date'];
        cityName.textContent = allData['city'];
        temp.innerHTML = Math.round(allData['temperature']) + '<span><sup>o</sup>F</span>';
        description.textContent = allData['description'];
        content.textContent = allData['feelings'];
    }
    catch (error) {
        console.log(error);
    }
}

generate.addEventListener('click', ()=> {
    //Get value from ZIP code input
    let value = zip.value;

    // Validate data to make sure it is a number.
    if(value === '') {
        errorMessage.textContent = 'zipcode can not be empty';
        zip.style.cssText = 'border-bottom: 1px solid #ff0000;';
    } else if (isNaN(parseInt(value))) {
        errorMessage.textContent = 'zipcode can be numbers only';
        zip.style.cssText = 'border-bottom: 1px solid #ff0000;';
    } else {
        errorMessage.textContent = '';
        zip.style.cssText = 'border-bottom: 1px solid #000000;';

        /**
         * if all works as expected, send zip code
         * to API to get DATA and then make 'POST request'
         * to send data to server.
         */
        let obj = fetchAPI(value);
        obj.then(res => postData('/addData', {
            'date': newDate,
            'temp': res.main.temp,
            'city': res.name,
            'description': res.weather[0].description,
            'content': feelings.value,
        }))
        .catch (console.log);
    }
});