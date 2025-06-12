
const langages = [
    {nom : "HTML", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/html5.svg", color : "#E34F26"},
    {nom : "CSS", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/css3.svg", color : "#663399"},
    {nom : "Python", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/python.svg", color : "#3776AB"},
    {nom : "JavaScript", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/javascript.svg", color : "#F7DF1E"},
    {nom : "PHP", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/php.svg", color : "#777BB4"},
    {nom : "MySQL", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/mysql.svg", color : "#4479A1"},
    {nom : "NoSQL", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/sqlite.svg", color : "#003B57"},
    {nom : "WordPress", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/wordpress.svg", color : "#21759B"},
    {nom : "Symfony", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/symfony.svg", color : "#000000"},
];


const container = document.getElementById("cards-container");

langages.forEach(async langage => {
    const card = document.createElement("div");
    card.className = "card";

    let logoHTML = `<img src="${langage.logo}" alt="${langage.nom}" width="80" height="80">`;

    if (langage.logo.endsWith(".svg")) {
        try {
            const res = await fetch(langage.logo);
            let svgText = await res.text();

            svgText = svgText.replace(/<svg[^>]+/, match => {
                return match
                    .replace(/(width|height|fill)="[^"]*"/g, "")
                    .replace("<svg", `<svg width="200" height="190" fill="${langage.color || '#000'}"`);
            });

            logoHTML = `<div class="svgIcon">${svgText}</div>`;
        } catch (err) {
            console.error(`Erreur lors du chargement du SVG pour ${langage.nom} :`, err);
        }
    }

    card.innerHTML = `
        <div class="imgC">
            ${logoHTML}
        </div>
        <h3>${langage.nom}</h3>
    `;

    container.appendChild(card);
});
