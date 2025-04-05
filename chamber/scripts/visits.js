var message = document.querySelector('#welcome-message')
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
let lastVisit = new Date(window.localStorage.getItem("lastVisit-ls")) || 0;
const theDateToday = new Date();
const msToDays = 86400000; 
const differenceInDays = (theDateToday - lastVisit) / msToDays;

if (numVisits !== 0) {
	if (differenceInDays>1) {
		message.textContent = `You last visited ${Math.ceil(differenceInDays)} days ago.`;
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

document.getElementById("timestamp").value = new Date().toISOString();