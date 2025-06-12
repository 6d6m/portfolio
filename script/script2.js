
const contacts = [
    {nom : "Linkedin", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/linkedin.svg", lien  : "https://www.linkedin.com/in/adam-abbari-3b944a253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", color : "#0e76a8"},
    {nom : "Github", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/github.svg", lien  : "https://github.com/6d6m", color : "#181717"},
    {nom : "Discord", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/discord.svg", lien : "https://discordapp.com/users/1295383664351514626", color : "#5865F2"},
    {nom : "Formulaire", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/mail.svg", lien : "/form.html", color : "#000000"},
]


const container = document.getElementById("cards-container");

(async () => {
    for (const contact of contacts) {
        const card = document.createElement("div");
        card.className = "card";

        let logoHTML = `<img src="${contact.logo}" alt="${contact.nom}" width="80" height="80">`;

        if (contact.logo.endsWith(".svg")) {
            try {
                const res = await fetch(contact.logo);
                let svgText = await res.text();

                svgText = svgText.replace(/<svg[^>]+/, match => {
                    return match
                        .replace(/(width|height|fill|style)="[^"]*"/g, "")
                        .replace("<svg", `<svg style="width:200px;height:200px;fill:${contact.color || '#000'};"`);
                });

                logoHTML = `<div class="svgIcon">${svgText}</div>`;
            } catch (err) {
                console.error(`Erreur SVG pour ${contact.nom} :`, err);
            }
        }

        card.innerHTML = `
            <div class="imgC">
                ${logoHTML}
            </div>
            <h3>${contact.nom}</h3>
            <a href="${contact.lien}" target="_blank" rel="noopener noreferrer" class="btnLien">Contacter</a>
        `;

        container.appendChild(card);
    }
})();


