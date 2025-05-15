
const contacts = [
    {nom : "Linkedin", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/linkedin.svg", lien  : "https://www.linkedin.com/in/adam-abbari-3b944a253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"},
    {nom : "Github", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/github.svg", lien  : "https://github.com/6d6m"},
    {nom : "Discord", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/discord.svg", lien : "https://discordapp.com/users/1295383664351514626"},
    {nom : "Formulaire", logo : "https://cdn-icons-png.flaticon.com/512/732/732200.png", lien : ""},
]


const container = document.getElementById("cards-container");

contacts.forEach(contact => {
    const card = document.createElement("div");
    card.className = "card";

card.innerHTML = `
    <div class="imgC">
    <img src="${contact.logo}" alt="${contact.nom}" width="80">
    </div>
    <h3>${contact.nom}</h3>
    <a href="${contact.lien}" target="_blank" rel="noopener noreferrer" class="btnLien">Contacter</a>
`;

container.appendChild(card);
});