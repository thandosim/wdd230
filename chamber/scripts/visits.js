var message = document.querySelector('#welcome-message')
let numVisitations = Number(window.localStorage.getItem("numVisits-ls")) || 0;
let lastVisit = new Date(window.localStorage.getItem("lastVisit-ls")) || 0;
const theDateToday = new Date();
const msToDays = 86400000; 
const differenceInDays = (theDateToday - lastVisit) / msToDays;

if (numVisitations !== 0) {
	if (differenceInDays>1) {
		message.textContent = `You last visited ${Math.ceil(differenceInDays)} days ago.`;
	}
	else{
		message.textContent = `Back so soon! Awesome!`
	}
} else {
	message.textContent = `Welcome! Let us know if you have any questions.`;
}

numVisitations++;
localStorage.setItem("numVisits-ls", numVisitations);
localStorage.setItem("lastVisit-ls",theDateToday);

const stamp = document.getElementById("timestamp");
if (stamp) {
	stamp.value = new Date().toISOString();
}