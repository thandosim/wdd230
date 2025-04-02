const baseURL = "https://thandosim.github.io/wdd230/";
const linksURL = "https://thandosim.github.io/wdd230/data/links.json";

const weeks = document.querySelector("#weeks");

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (response.ok) {
            const data = await response.json();
            displayLinks(data.weeks); // Pass the 'weeks' array into the displayLinks function
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching links:", error);
    }
}

getLinks();

const displayLinks = (weeksData) => {
    weeksData.forEach((week) => {
        // Create a list item for the week
        let weekItem = document.createElement("li");
        weekItem.textContent = `${week.week}: `;

        // Create a nested unordered list for the links
        let linksList = document.createElement("ul");
        week.links.forEach((link) => {
            let listItem = document.createElement("li");
            let url = document.createElement("a");
            url.setAttribute('href', link.url);
            url.textContent = link.title;

            listItem.appendChild(url);
            linksList.appendChild(listItem);
        });

        weekItem.appendChild(linksList);
        weeks.appendChild(weekItem);
    });
};
