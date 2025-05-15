
const langages = [
    {nom : "HTML", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/html5.svg"},
    {nom : "CSS", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/css3.svg"},
    {nom : "Python", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/python.svg"},
    {nom : "JavaScript", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/javascript.svg"},
    {nom : "PHP", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/php.svg"},
    {nom : "MySQL", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/mysql.svg"},
    {nom : "WordPress", logo : "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/wordpress.svg"},
];


const container = document.getElementById("cards-container");

langages.forEach(langage => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <div class="imgC">
        <img src="${langage.logo}" alt="${langage.nom}">
    </div>
        <h3>${langage.nom}</h3>
        `;
    container.appendChild(card);
});