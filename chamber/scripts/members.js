const baseURL = "https://thandosim.github.io/wdd230/";

const url = 'https://thandosim.github.io/wdd230/chamber/data/members.json';
const cards = document.querySelector('#cards');

async function getMemberData() {
   const response = await fetch(url);
   const data = await response.json();
//    console.table(data.members);
displayMembers(data.members);
}

getMemberData();

const displayMembers = (members) => {
    members.forEach((member) => {
        // Create a card for each member
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let membershipLevel = document.createElement("p");

        // Fill member details
        name.textContent = member.name;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        membershipLevel.textContent = `Membership Level: ${member.membership_level}`;
        website.textContent = "Visit Website";
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');

        // Append member details to the card
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membershipLevel);
        card.appendChild(website);

        // Add card to the DOM (assumes there is a container with ID "cards")
        document.querySelector("#cards").appendChild(card);
    });
};
