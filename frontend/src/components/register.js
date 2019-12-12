(function () {
  let html = `
     <div className="login-wrapper">
        <form id="register">
          <div>Register</div>
          <div className="login-input">
            <input
              value=''
              type="text"
              name="email"
              placeholder="Email"
              autoComplete="email"
              id="email"
            />
            <input
              value={password}
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              id="password"
            />
            <button type="submit">Register</button>
          </div>
        </form>
      </div>`;

  const register = async (e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;


    const result = await (await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })).json();
    if (!result.error) {
      console.log(result.message);
      //navigate('/');
    } else {
      console.log(result.error);
    }
  }

  window.register = function (parent) {
    parent.innerHTML = html;
    const form = document.getElementById('register');
    form.addEventListener('submit', register);
  };
}())