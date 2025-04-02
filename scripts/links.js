const baseURL = "https://thandosim.github.io/wdd230/";
const linksURL = "https://thandosim.github.io/wdd230/data/links.json";

const weeks = document.querySelector("#weeks");

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayLinks(data)
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

getLinks();

const displayLinks = (data) => {
    data.forEach((week) => {
        let weekItem = document.createElement("li");
        weekItem.textContent = `${week.week} :`;
        week.forEach((link) => {
            let url = document.createElement("a");
            url.setAttribute('href', link.url);
            url.textContent = `${link.title}`;

            weekItem.appendChild(url);        
        });

        weeks.appendChild(weekItem);

    });
}