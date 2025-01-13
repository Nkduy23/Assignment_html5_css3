async function includeHTML(file, elementId) {
    const response = await fetch(file);
    const content = await response.text();
    document.getElementById(elementId).innerHTML = content;
}

includeHTML("view/partials/header.html", "header-placeholder");
includeHTML("view/partials/footer.html", "footer-placeholder");