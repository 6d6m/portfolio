
/**
 * Script pour générer les cartes des langages de programmation
 * Page Experience - Portfolio Adam
 */

const langages = [
    { nom: "HTML", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/html5.svg", color: "#E34F26" },
    { nom: "CSS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/css3.svg", color: "#663399" },
    { nom: "Python", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/python.svg", color: "#3776AB" },
    { nom: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/javascript.svg", color: "#F7DF1E" },
    { nom: "PHP", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/php.svg", color: "#777BB4" },
    { nom: "MySQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/mysql.svg", color: "#4479A1" },
    { nom: "NoSQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/sqlite.svg", color: "#003B57" },
    { nom: "WordPress", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/wordpress.svg", color: "#21759B" },
];

async function processSVG(logoUrl, color, fallbackAlt) {
    if (!logoUrl || !logoUrl.endsWith(".svg")) {
        return `<img src="${logoUrl}" alt="${fallbackAlt}" width="80" height="80" loading="lazy">`;
    }

    try {
        const response = await fetch(logoUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        let svgText = await response.text();
        
        svgText = svgText.replace(/<svg[^>]+/, match => {
            return match
                .replace(/(width|height|fill)="[^"]*"/g, "")
                .replace("<svg", `<svg width="200" height="190" fill="${color || '#000'}"`);
        });

        return `<div class="svgIcon">${svgText}</div>`;
    } catch (error) {
        console.warn(`Erreur SVG pour ${fallbackAlt}:`, error.message);
        return `<div class="svgIcon error-icon">⚠️</div>`;
    }
}

async function createLanguageCard(langage) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-langage", langage.nom.toLowerCase());

    const logoHTML = await processSVG(langage.logo, langage.color, langage.nom);

    card.innerHTML = `
        <div class="imgC">
            ${logoHTML}
        </div>
        <h3>${langage.nom}</h3>
    `;

    return card;
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("cards-container");
    
    if (!container) {
        console.error("Conteneur 'cards-container' non trouvé");
        return;
    }

    try {
        const cardPromises = langages.map(createLanguageCard);
        const cards = await Promise.all(cardPromises);
        
        cards.forEach(card => container.appendChild(card));
        
        console.log(`${langages.length} cartes de langages créées avec succès`);
    } catch (error) {
        console.error("Erreur lors de la création des cartes:", error);
    }
});
