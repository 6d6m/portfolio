
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("menu-toggle");
    const navigationMenu = document.getElementById("navbar");

    if (!toggleButton || !navigationMenu) {
        return;
    }

    toggleButton.setAttribute("role", "button");
    toggleButton.setAttribute("tabindex", "0");
    toggleButton.setAttribute("aria-controls", "navbar");
    toggleButton.setAttribute("aria-expanded", "false");
    if (!toggleButton.getAttribute("aria-label")) {
        toggleButton.setAttribute("aria-label", "Ouvrir le menu");
    }

    const setMenuOpen = (shouldOpen) => {
        const willOpen = Boolean(shouldOpen);
        
        if (willOpen) {
            navigationMenu.classList.add("active");
            toggleButton.classList.add("active");
            toggleButton.setAttribute("aria-expanded", "true");
            document.body.classList.add("no-scroll");
        } else {
            navigationMenu.classList.add("closing");
            navigationMenu.classList.remove("active");
            toggleButton.classList.remove("active");
            toggleButton.setAttribute("aria-expanded", "false");
            document.body.classList.remove("no-scroll");
            
            setTimeout(() => {
                navigationMenu.classList.remove("closing");
            }, 300);
            
            toggleButton.focus();
        }
    };

    const isMenuOpen = () => navigationMenu.classList.contains("active");

    toggleButton.addEventListener("click", () => {
        setMenuOpen(!isMenuOpen());
    });

    toggleButton.addEventListener("keydown", (event) => {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            setMenuOpen(!isMenuOpen());
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isMenuOpen()) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("click", (event) => {
        if (!isMenuOpen()) return;
        const target = event.target;
        if (!navigationMenu.contains(target) && !toggleButton.contains(target)) {
            setMenuOpen(false);
        }
    });

    navigationMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });
});
