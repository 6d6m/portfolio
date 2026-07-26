
/**
 * Script pour générer les cartes des langages de programmation
 * Page Experience - Portfolio Adam
 */

const langages = [
    { nom: "HTML", categorie: "Langages", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/html5.svg", color: "#E34F26" },
    { nom: "CSS", categorie: "Langages", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/css3.svg", color: "#663399" },
    { nom: "JavaScript", categorie: "Langages", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/javascript.svg", color: "#F7DF1E" },
    { nom: "TypeScript", categorie: "Langages", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/typescript.svg", color: "#3178C6" },
    { nom: "Node.js", categorie: "Langages", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/nodedotjs.svg", color: "#339933" },
    { nom: "Python", categorie: "Langages", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/python.svg", color: "#3776AB" },
    { nom: "PHP", categorie: "Langages", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/php.svg", color: "#777BB4" },
    { nom: "Symfony", categorie: "Frameworks & CMS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/symfony.svg", color: "#000000" },
    { nom: "WordPress", categorie: "Frameworks & CMS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/wordpress.svg", color: "#21759B" },
    { nom: "Shopify", categorie: "Frameworks & CMS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/shopify.svg", color: "#96BF48" },
    { nom: "Bootstrap", categorie: "Frameworks & CMS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/bootstrap.svg", color: "#7952B3" },
    { nom: "Tailwind", categorie: "Frameworks & CMS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/tailwindcss.svg", color: "#06B6D4" },
    { nom: "MySQL", categorie: "Bases de données", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/mysql.svg", color: "#4479A1" },
    { nom: "NoSQL", categorie: "Bases de données", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/sqlite.svg", color: "#003B57" },
    { nom: "Git", categorie: "Outils", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/git.svg", color: "#F05032" },
    { nom: "Figma", categorie: "Outils", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/figma.svg", color: "#F24E1E" },
    { nom: "Canva", categorie: "Outils", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/canva.svg", color: "#00C4CC" },
    { nom: "Photoshop", categorie: "Outils", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/adobephotoshop.svg", color: "#31A8FF" },
    { nom: "Illustrator", categorie: "Outils", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/adobeillustrator.svg", color: "#FF9A00" },
    { nom: "Docker", categorie: "Outils", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/docker.svg", color: "#2496ED" }
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

// Regroupe les langages par catégorie en conservant l'ordre d'apparition
function groupByCategorie(items) {
    const groups = new Map();
    for (const item of items) {
        if (!groups.has(item.categorie)) groups.set(item.categorie, []);
        groups.get(item.categorie).push(item);
    }
    return groups;
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("cards-container");

    if (!container) {
        console.error("Conteneur 'cards-container' non trouvé");
        return;
    }

    try {
        const groups = groupByCategorie(langages);

        for (const [categorie, items] of groups) {
            const section = document.createElement("section");
            section.className = "skills-section";

            const title = document.createElement("h3");
            title.className = "skills-category";
            title.textContent = categorie;

            const grid = document.createElement("div");
            grid.className = "skills-grid";

            const cards = await Promise.all(items.map(createLanguageCard));
            cards.forEach(card => grid.appendChild(card));

            section.appendChild(title);
            section.appendChild(grid);
            container.appendChild(section);
        }

        console.log(`${langages.length} cartes de langages créées avec succès`);
    } catch (error) {
        console.error("Erreur lors de la création des cartes:", error);
    }
});
