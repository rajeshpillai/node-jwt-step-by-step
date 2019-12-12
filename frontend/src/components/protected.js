(function () {
  let html = '<h1>Protected data </h1>';

  window.protected = async function (parent) {
    const result = await (await fetch('http://localhost:4000/protected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${window.accesstoken}`,
      },
    })).json();
    if (result.data) {
      parent.innerHTML = result.data;
    } else {
      parent.innerHTML = "Not authorised!";
    }
  }
}())