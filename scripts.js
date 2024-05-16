const navbar = document.querySelector("nav")
const watcher = document.createElement("div");

watcher.setAttribute("data-watcher", "");
watcher.setAttribute("style", "margin: 0;")
navbar.before(watcher);

const navObserver = new IntersectionObserver((entries) => {navbar.classList.toggle("sticking", !entries[0].isIntersecting)});
navObserver.observe(watcher);

function myHide(class_name) {
    var projects = document.getElementById(class_name);
    var text = document.getElementById("visibility-text_" + class_name);
    var icon = document.getElementById("icon_"+class_name);

    if (projects.style.display === "none") {
        projects.style.display = "block";
        text.textContent = "[Hide]";
        icon.className = "fa-solid fa-eye";
    } else {
        projects.style.display = "none";
        text.textContent = "[Show]";
        icon.className = "fa-solid fa-eye-slash";
    }
}

function myColor() {
    var x = document.getElementById("test");
    if (x.style.color === "red") {
        x.style.color = "blue";
    } else {
        x.style.color = "red";
    }
}

function darkMode() {
    var x = document.body;
    x.classList.toggle("darkMode");
}

function invert() {
    var x = document.getElementById("logo-image");
    x.classList.toggle("invert");
    
    if (x.classList.contains("invert")) {
        x.style.filter="invert(0%)";
    } else {
        x.style.filter="invert(75%)";
    }
    
}