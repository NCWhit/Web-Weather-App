// Funciton that grabs weather from open-meteo and displays it to user
async function queryWeather(){
    try {
        const objResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&current=temperature_2m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago',{
            method:'GET',
            headers: {
                'Content-Type':'application/json'
                },
        })

        if(!objResponse.ok){
            throw new Error(`HTTP Error Status:${objResponse.status}`)
        }

        const objData = await objResponse.json()  
        // Update HTML with Current Weather conditions pulled from fetch
        document.getElementById("Temprature").textContent = objData.current.temperature_2m + " °F"
        document.getElementById("Humidity").textContent = objData.current.relative_humidity_2m + " %"

        // Switch Case used for setting the current weather conditon
        switch(objData.current.weather_code) {
        case 0:
            interpretation = "<i class='bi bi-sun'></i> Clear sky";
            break;
        case 1:
            interpretation = "<i class='bi bi-cloud-sun'></i> Mainly clear";
            break;
        case 2:
            interpretation = "<i class='bi bi-cloud-sun'></i> Partly cloudy";
            break;
        case 3:
            interpretation = "<i class='bi bi-cloud'></i> Cloudy";
            break;
        case 45:
            interpretation = "<i class='bi bi-cloud-fog'></i> Fog";
            break;
        case 48:
            interpretation = "<i class='bi bi-cloud-fog'></i> Depositing rime fog";
            break;
        case 51:
            interpretation = "<i class='bi bi-droplet'></i> Light drizzle";
            break;
        case 53:
            interpretation = "<i class='bi bi-droplet'></i> Moderate drizzle";
            break;
        case 55:
            interpretation = "<i class='bi bi-droplet'></i> Heavy drizzle";
            break;
        case 61:
            interpretation = "<i class='bi bi-cloud-rain'></i> Light rain";
            break;
        case 63:
            interpretation = "<i class='bi bi-cloud-rain'></i> Moderate rain";
            break;
        case 65:
            interpretation = "<i class='bi bi-cloud-rain'></i> Heavy rain";
            break;
        case 71:
            interpretation = "<i class='bi bi-snow'></i> Light snow";
            break;
        case 73:
            interpretation = "<i class='bi bi-snow'></i> Moderate snow";
            break;
        case 75:
            interpretation = "<i class='bi bi-snow'></i> Heavy snow";
            break;
        case 77:
            interpretation = "<i class='bi bi-snow'></i> Snow grains";
            break;
        case 80:
            interpretation = "<i class='bi bi-cloud-rain-heavy'></i> Light shower rain";
            break;
        case 81:
            interpretation = "<i class='bi bi-cloud-rain-heavy'></i> Moderate shower rain";
            break;
        case 82:
            interpretation = "<i class='bi bi-cloud-rain-heavy'></i> Heavy shower rain";
            break;
        case 85:
            interpretation = "<i class='bi bi-cloud-snow'></i> Light snow showers";
            break;
        case 86:
            interpretation = "<i class='bi bi-cloud-snow'></i> Heavy snow showers";
            break;
        case 95:
            interpretation = "<i class='bi bi-cloud-lightning'></i> Thunderstorm";
            break;
        case 96:
            interpretation = "<i class='bi bi-cloud-lightning-rain'></i> Thunderstorm with hail";
            break;
        case 99:
            interpretation = "<i class='bi bi-cloud-lightning-rain'></i> Thunderstorm with heavy hail";
            break;
        default:
            interpretation = "<i class='bi bi-question-circle'></i> Unknown weather code";
    }


    // Update the text content of the <p> tag with id="conditions"
    document.getElementById("Conditions").innerHTML = interpretation
        
    } catch(objError){
        console.log('Error fetching objData',objError)
        }
}
// If statement used to access service worker to allow for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}


// Function Call for queryWeather()
queryWeather()