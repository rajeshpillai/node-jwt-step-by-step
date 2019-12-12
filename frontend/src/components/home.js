(function () {
  var html = `
    <h2>Welcome to HOME</h2>
  `;
  window.home = async function (parent) {
    parent.innerHTML = html;
  }
}());