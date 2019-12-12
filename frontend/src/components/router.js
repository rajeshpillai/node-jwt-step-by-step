function route(path) {
  alert(path);
}

let links = document.querySelectorAll('.nav-item');
let contentRoot = document.querySelector("#content");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function (e) {
    let link = e.target.parentNode.dataset.navLink;
    navigate(link);
  });
}

const navigate = (link) => {
  window[link](contentRoot);
}