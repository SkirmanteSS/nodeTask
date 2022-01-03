const fullName = document.querySelector("full-name");
const email = document.querySelector("email");
const password = document.querySelector("password");
const repeatPassword = document.querySelector("repeat-password");
const data = { fullName, email, password };
const register = async (full_name, email, password) => {
 try {
   const req = await
   fetch("http://localhost:5503/register",
 {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
      },

    body: JSON.stringify(data),
    })
    return data
  } catch (err) {
    console.error({eror: `incorect your password`})
  }};
    
document.getElementById("add-new-user").addEventListener("submit", (e) => {
    e.preventDefault()});