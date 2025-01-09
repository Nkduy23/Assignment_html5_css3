async function includeHTML(file, elementId) {
    const response = await fetch(file);
    const content = await response.text();
    document.getElementById(elementId).innerHTML = content;
}

includeHTML("project/view/partials/header.html", "header-placeholder");
includeHTML("project/view/partials/footer.html", "footer-placeholder");