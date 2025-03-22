const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

var message = document.querySelector('#welcome-message')
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
let lastVisit = new Date(window.localStorage.getItem("lastVisit-ls")) || 0;
const theDateToday = new Date();
const msToDays = 86400000; 
const differenceInDays = (theDateToday - lastVisit) / msToDays;

if (numVisits !== 0) {
	if (differenceInDays>1) {
		message.textContent = `You last visited ${differenceInDays} days ago.`;
	}
	else{
		message.textContent = `Back so soon! Awesome!`
	}
} else {
	message.textContent = `Welcome! Let us know if you have any questions.`;
}

numVisits++;
localStorage.setItem("numVisits-ls", numVisits);
localStorage.setItem("lastVisit-ls",theDateToday);

var date = new Date();
var year = date.getFullYear();
document.getElementById("currentyear").innerHTML = year;

document.getElementById("lastModified").textContent = document.lastModified;