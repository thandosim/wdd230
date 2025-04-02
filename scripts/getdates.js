const modeButton = document.querySelector("#mode");
const main = document.querySelector("body");
const cards = document.querySelectorAll(".card");


modeButton.addEventListener("click", () => {
	if (modeButton.textContent.includes("🕶️")) {
		main.style.background = "#000";
		main.style.color = "#fff";
		modeButton.textContent = "🔆";
        cards.forEach(card => {
            card.style.background = "#222";
        });

	} else {
		main.style.background = "#eee";
		main.style.color = "#000";
		modeButton.textContent = "🕶️";
        cards.forEach(card => {
            card.style.background = "#f4f4f4";
        });
	}
});

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});



var date = new Date();
var year = date.getFullYear();
document.getElementById("currentyear").innerHTML = year;

document.getElementById("lastModified").textContent = document.lastModified;

function validatePasswords() {
	const password = document.getElementById('password');
	const confirmPassword = document.getElementById('confirmPassword');

	// Compare passwords only when the second input is filled
	if (confirmPassword.value !== "" && password.value !== confirmPassword.value) {
		confirmPassword.setCustomValidity("Passwords do not match!"); // Show custom message
	} else {
		confirmPassword.setCustomValidity(""); // Clear message if valid
	}
}


const currentTemp = document.querySelector('#weather-info');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

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


const visitsDisplay = document.querySelector("#visit-count");
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

if (numVisits !== 0) {
	visitsDisplay.textContent = numVisits;
} else {
	visitsDisplay.textContent = `This is your first visit.`;
}

numVisits++;
localStorage.setItem("numVisits-ls", numVisits);