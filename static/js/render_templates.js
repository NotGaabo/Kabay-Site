const loader = document.getElementById("loader");

const fetchTemplate = (url, targetId) => {
    return fetch(url)
        .then(res => res.text())
        .then(html => document.getElementById(targetId).innerHTML = html);
};

// Espera que se carguen todos los templates
Promise.all([
    fetchTemplate("/templates/benefits.html", "benefits"),
    fetchTemplate("/templates/footer.html", "footer"),
    fetchTemplate("/templates/nav.html", "nav")
]).finally(() => {
    // Oculta el loader cuando todo esté listo
    loader.style.display = "none";
});
