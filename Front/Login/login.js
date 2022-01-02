const formLogin = document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault();
  
    fetch("http://localhost:5502/login", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email, password
      }),
    });
      const data = await req.json();
     
        if (data.token) {
          sessionStorage.setItem("token", data.token);
          location.assign = './groups.html';
          return;
        } else {
          logMessage.innerHTML = 'Mistake';
      } catch (err) {
      console.log(err)
    }

  /*gauti vertes*/;