document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
  
    fetch("http://localhost:8080/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.elements[0].value,
        password: e.target.elements[1].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          document.location = 'groups.html';
          return;
        } else {
          alert(data.err || 'Ops something went wrong..');
        }
      })
      .catch((err) => alert(err.message));
  });