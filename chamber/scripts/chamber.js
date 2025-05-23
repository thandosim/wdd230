const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("meet-and-greet-banner");
    const closeButton = document.getElementById("close-banner");

    // Determine the current day of the week
    const currentDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Show banner only on Monday, Tuesday, or Wednesday
    if (currentDay >= 1 && currentDay <= 3) {
        if (banner) {
            banner.style.display = "block"; // Display banner
        }
    }

    // Add event listener to close the banner
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            banner.style.display = "none"; // Hide banner
        })
    };
});


var date = new Date();
var year = date.getFullYear();
document.getElementById("currentyear").innerHTML = year;

document.getElementById("lastModified").textContent = document.lastModified;

const currentTemp = document.querySelector('#weather-info');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.getElementById('forecastContainer');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-26.317&lon=31.133&units=metric&appid=9ff9d7b1bf21bb9e41447a69abf491e6';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data)
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
    
apiFetch();

function displayResults(data) { 

    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}


const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=-26.317&lon=31.133&units=metric&appid=9ff9d7b1bf21bb9e41447a69abf491e6';

async function apiFetch2() {
    try {
        const response = await fetch(url2);
        if (response.ok) {
            const data = await response.json();
            displayResults2(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayResults2(data) {
    // const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; // Clear previous content

    const dailyForecast = {};

    // Organize data into days
    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // Extract date (YYYY-MM-DD)
        if (!dailyForecast[date]) {
            dailyForecast[date] = [];
        }
        dailyForecast[date].push(item);
    });

    // Iterate through the first 3 days
    Object.keys(dailyForecast).slice(1, 4).forEach(date => {
        const dayData = dailyForecast[date];
        const avgTemp = (
            dayData.reduce((total, entry) => total + entry.main.temp, 0) / dayData.length
        ).toFixed(1); // Calculate average temp

        const iconsrc = `https://openweathermap.org/img/w/${dayData[0].weather[0].icon}.png`;
        const desc = dayData[0].weather[0].description;

        // Create forecast card
        const dayElement = document.createElement('div');
        dayElement.innerHTML = `
            <h3>${new Date(date).toLocaleDateString()}</h3>
            <img src="${iconsrc}" alt="${desc}">
            <p>${desc}</p>
            <p>Avg Temp: ${avgTemp}&deg;C</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}
if (document.getElementById("weather-info")) {
    apiFetch2();
}



const visitsDisplay = document.querySelector("#visit-count");
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

if (visitsDisplay) {
    if (numVisits !== 0) {
        visitsDisplay.textContent = numVisits;
    } else {
        visitsDisplay.textContent = `This is your first visit.`;
    }
} else {
    console.warn('Element not found on this page');
}

numVisits++;
localStorage.setItem("numVisits-ls", numVisits);

async function fetchAndPopulateSpotlight() {
    try {
        const response = await fetch('data/members.json'); // Fetch data from the JSON file
        if (response.ok) {
            const data = await response.json();
            populateSpotlight(data.members);
        } else {
            throw new Error("Failed to fetch members data.");
        }
    } catch (error) {
        console.error("Error fetching members data:", error);
    }
}

function populateSpotlight(members) {
    const spotlightContainer = document.querySelector('.spotlight');
    spotlightContainer.innerHTML = `<h2>Business Spotlight</h2>`; // Clear and reset header

    // Randomly select 3 businesses
    const shuffledMembers = members.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, 3); // Select 3 random members

    // Generate business cards
    selectedMembers.forEach(member => {
        const businessCard = `
            <div class="spot">
                <h3>${member.name}</h3>
                <img src="${member.image_url}" alt="Image of ${member.name}" width="300"  loading="lazy">
                <p>${member.address}</p>
                <p>${member.business_description}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            </div>
        `;
        spotlightContainer.innerHTML += businessCard;
    });
}

// Fetch and populate the spotlight section
if (document.querySelector('.spotlight')) {
    fetchAndPopulateSpotlight();
}