const navbar = document.querySelector("nav")
const watcher = document.createElement("div");

watcher.setAttribute("data-watcher", "");
watcher.setAttribute("style", "margin: 0;")
navbar.before(watcher);

const navObserver = new IntersectionObserver((entries) => {navbar.classList.toggle("sticking", !entries[0].isIntersecting)});
navObserver.observe(watcher);


document.querySelector('.current').addEventListener('click', (event) => {
    event.preventDefault();
    window.scroll({top: 0, behavior: 'smooth'});
});