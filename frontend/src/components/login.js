(function () {
  let html = `
  <div className="login-wrapper">
  <form id="login">
    <div>Login</div>
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
        value=''
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Password"
        id="password"
      />
      <button type="submit">Login</button>
    </div>
  </form>
</div>
  `
  const onLogin = async (e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    const result = await (await fetch('http://localhost:4000/login', {
      method: 'POST',
      credentials: 'include', // Needed to include the cookie
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })).json();

    if (result.accesstoken) {
      window.accesstoken = result.accesstoken;
      // navigate to home
    } else {
      console.log(result.error);
    }
  };

  var logoutUI = `
    <a id="logout" href='#'>Logout</a>
  `

  window.login = async function (parent) {
    let h = this.window.accesstoken ? logoutUI : html;
    parent.innerHTML = h;
    const form = document.getElementById('login');
    if (form) {
      form.addEventListener('submit', onLogin);
    }
    const logout = document.querySelector("#logout");
    if (!logout) return;
    logout.addEventListener('click', async () => {
      await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
      });
      // Clear user from context
      this.window.accesstoken = null;
      // Navigate back to startpage
      this.window.navigate("home");
    });
  }

}())