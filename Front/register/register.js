const data = { fullName, email, password };


fetch("http://localhost:5052/register",
 {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },

    body: JSON.stringify(data),
    })
    
document.getElementById('add-new-user').addEventListener('submit', (e) => {
    e.preventDefault()});