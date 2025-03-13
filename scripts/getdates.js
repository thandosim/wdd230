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

