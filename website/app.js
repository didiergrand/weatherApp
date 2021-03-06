document.getElementById('latestentry').style.display = 'none';

// // Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Initialize back button
document.getElementById('back').addEventListener('click', function() {
  document.getElementById('latestentry').style.display = 'none';
});


// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=580c3d247f1a3d96cefcbc3387aa3f00&units=metric';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  let apiUrl = baseURL + zip + apiKey;
  getWeather(apiUrl)
    .then(function(data) {
      // C = K - 273.15
      const tempC = data.main.temp;
      const localDate = d.toLocaleDateString("en-US");
      postData('/addWeather', {
        date: localDate,
        temp: tempC.toFixed(1),
        feelings: feelings
      });
    }).then(() => {
      updateUI();
    });
}


/* Function to GET Web API Data*/
const getWeather = async (apiUrl) => {
  const res = await fetch(apiUrl)
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {

    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("postData error", error);
    // appropriately handle the error
  }
}

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById('latestentry').style.display = 'grid';
  } catch (error) {
    console.log("error", error);
  }
}
