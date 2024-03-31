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