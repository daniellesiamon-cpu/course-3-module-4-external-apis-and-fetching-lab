// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code he// Function to fetch weather alerts
async function fetchWeatherAlerts(state) {
    const errorDiv = document.getElementById('error-message');
    const displayDiv = document.getElementById('weather-display'); // Assuming this ID exists

    // Clear previous data and hide error before starting
    errorDiv.innerText = '';
    errorDiv.style.display = 'none';
    displayDiv.innerHTML = ''; 

    try {
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
        
        if (!response.ok) {
            throw new Error("Could not fetch alerts. Please check the state code.");
        }

        const data = await response.json();
        console.log(data); // Log for testing
        displayAlerts(data, state);
    } catch (error) {
        // Step 4: Handle errors
        errorDiv.innerText = error.message;
        errorDiv.style.display = 'block';
        console.log(error.message);
    }
}

// Function to display alerts
function displayAlerts(data, state) {
    const displayDiv = document.getElementById('weather-display');
    const alerts = data.features;

    // Show summary message
    const summary = document.createElement('h3');
    summary.innerText = `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
    displayDiv.appendChild(summary);

    // List alert headlines
    const list = document.createElement('ul');
    alerts.forEach(alert => {
        const item = document.createElement('li');
        item.innerText = alert.properties.headline;
        list.appendChild(item);
    });
    displayDiv.appendChild(list);
}re!
