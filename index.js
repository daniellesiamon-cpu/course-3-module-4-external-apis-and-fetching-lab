// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

document.addEventListener('DOMContentLoaded', () => {
    const stateInput = document.getElementById("state-input");
    const addButton = document.getElementById('fetch-alerts');
    const alertsDisplay = document.getElementById('alerts-display');
    const errorMessage = document.getElementById('error-message');

    addButton.addEventListener('click', () => {
        const STATE_ABBR = stateInput.value.trim().toUpperCase();

        // Clear previous error
        if (errorMessage) {
            errorMessage.textContent = '';
            errorMessage.classList.add('hidden');
        }

        if (!STATE_ABBR || STATE_ABBR.length !== 2) {
            console.log("Enter correct state Abbreviation");
            if (errorMessage) {
                errorMessage.textContent = "Please enter a valid two-letter state abbreviation.";
                errorMessage.classList.remove('hidden');
            }
            return;
        }

        // Clear previous display
        if (alertsDisplay) alertsDisplay.innerHTML = '';

        fetch(`${weatherApi}${STATE_ABBR}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayAlerts(data, STATE_ABBR);
                
                // Clear input after success
                stateInput.value = '';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                if (errorMessage) {
                    errorMessage.textContent = error.message || 'Failed to fetch weather alerts.';
                    errorMessage.classList.remove('hidden');
                }
            });
    });
});

function displayAlerts(data, state) {
    const alertsDisplay = document.getElementById('alerts-display');
    if (!alertsDisplay) return;

    const features = data.features || [];
    const title = data.title || `Current watches, warnings, and advisories for ${state}`;

    // Summary
    const summary = document.createElement('h2');
    summary.textContent = `${title}: ${features.length}`;
    alertsDisplay.appendChild(summary);

    if (features.length === 0) {
        const p = document.createElement('p');
        p.textContent = `No active alerts for ${state}`;
        alertsDisplay.appendChild(p);
        return;
    }

    // List of alerts
    const ul = document.createElement('ul');
    features.forEach(alert => {
        if (alert.properties && alert.properties.headline) {
            const li = document.createElement('li');
            li.textContent = alert.properties.headline;
            ul.appendChild(li);
        }
    });
    alertsDisplay.appendChild(ul);
}
