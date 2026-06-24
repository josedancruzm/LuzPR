account = false
const loginForm = document.getElementById("login-form")
if (loginForm) loginForm.addEventListener("submit", signInChecker)

const registerForm = document.getElementById("register-form")
if (registerForm) registerForm.addEventListener("submit", registerChecker)
  
function togglePassword() {
      const passwordInput = document.getElementById("password")
      const eyeIcon = document.querySelector(".eye-icon")

      if (passwordInput.type == "password") {
        passwordInput.type = "text"
        eyeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>'
      } else {
        passwordInput.type = "password"
        eyeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>'
      }
    }

function openRegisterPage(){
    window.location.href = "register.html"
}

function openMainPage(){
    window.location.href = "main.html"
}

function openLogInPage(){
    window.location.href = "login.html"
}

function signInChecker(e){
  e.preventDefault()
  const login_username =  document.getElementById("login-username").value
  const login_password = document.getElementById("login-password").value


  // checks if the input boxes are empty
  if (login_username === "" || login_password === "") {
    alert("Please enter your account's credentials to sign in.")
    return
  }

  openMainPage()
}

function registerChecker(e){
  e.preventDefault()

  const register_fname = document.getElementById("register-fname").value
  const register_lname = document.getElementById("register-lname").value
  const register_luma = document.getElementById("register-luma-number").value
  const register_ssn = document.getElementById("register-ssn").value
  const register_username = document.getElementById("register-username").value
  const register_password = document.getElementById("register-password").value

  let details = [register_fname, register_lname, register_luma, register_ssn, register_username, register_password]

  for (const element of details){
    if (element === ""){
      alert("Please fill in all input fields.")
      return
    }
  }

  openLogInPage()
}