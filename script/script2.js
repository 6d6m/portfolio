
/**
 * Script pour générer les cartes de contact
 * Page Contact - Portfolio Adam
 */

const contacts = [
    { 
        nom: "LinkedIn", 
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/linkedin.svg", 
        lien: "https://www.linkedin.com/in/adam-abbari-3b944a253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", 
        color: "#0e76a8" 
    },
    {
        nom: "GitHub",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/github.svg",
        lien: "https://github.com/6d6m",
        color: "#ffffff"
    },
    { 
        nom: "Discord", 
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/discord.svg", 
        lien: "https://discordapp.com/users/1295383664351514626", 
        color: "#5865F2" 
    },
    { 
        nom: "Email", 
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/gmail.svg", 
        lien: "mailto:adamabbari@gmail.com", 
        color: "#EA4335" 
    }
];

// Fonction utilitaire pour traiter les SVG
async function processSVG(logoUrl, color, fallbackAlt) {
    if (!logoUrl || !logoUrl.endsWith(".svg")) {
        return `<img src="${logoUrl}" alt="${fallbackAlt}" width="80" height="80" loading="lazy">`;
    }

    try {
        const response = await fetch(logoUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        let svgText = await response.text();
        
        // Optimisation du SVG
        svgText = svgText.replace(/<svg[^>]+/, match => {
            return match
                .replace(/(width|height|fill|style)="[^"]*"/g, "")
                .replace("<svg", `<svg style="width:200px;height:200px;fill:${color || '#000'};"`);
        });

        return `<div class="svgIcon">${svgText}</div>`;
    } catch (error) {
        console.warn(`Erreur SVG pour ${fallbackAlt}:`, error.message);
        return `<div class="svgIcon error-icon">⚠️</div>`;
    }
}

// Fonction pour créer une carte de contact
async function createContactCard(contact) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-contact", contact.nom.toLowerCase());

    const logoHTML = await processSVG(contact.logo, contact.color, contact.nom);

    // Validation du lien
    const isValidLink = contact.lien && contact.lien.trim() !== "";
    const linkHTML = isValidLink 
        ? `<a href="${contact.lien}" target="_blank" rel="noopener noreferrer" class="btnLien">Contacter</a>`
        : `<span class="btnLien disabled">Bientôt disponible</span>`;

    card.innerHTML = `
        <div class="imgC">
            ${logoHTML}
        </div>
        <h3>${contact.nom}</h3>
        ${linkHTML}
    `;

    return card;
}

// Initialisation
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("cards-container");
    
    if (!container) {
        console.error("Conteneur 'cards-container' non trouvé");
        return;
    }

    try {
        // Créer toutes les cartes en parallèle pour de meilleures performances
        const cardPromises = contacts.map(createContactCard);
        const cards = await Promise.all(cardPromises);
        
        // Ajouter toutes les cartes au DOM en une fois
        cards.forEach(card => container.appendChild(card));
        
        console.log(`${contacts.length} cartes de contact créées avec succès`);
    } catch (error) {
        console.error("Erreur lors de la création des cartes:", error);
    }
});


