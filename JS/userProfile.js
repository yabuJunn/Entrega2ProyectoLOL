//Llamo a los datos del usuario y la condicion de que si no esta registrado lo mande a la landing page

var logedUser = localStorage.getItem("logedUser")
if (logedUser === null) {
    alert("No hay un usuario registrado")
    window.location.href = '../HTML/index.html'
}

const logedUserJSON = JSON.parse(logedUser) //Convierto en JSON los datos del usuario, ya que a local storage solo se pueden almacenar strings
console.log(logedUserJSON)

//Llamo los textos donde voy a mostrar los datos del usuario

const userName = document.getElementById("userName")
const userNickname = document.getElementById("userNickname")
const userEmail = document.getElementById("userEmail")
const userPhone = document.getElementById("userPhone")
const userPassword = document.getElementById("userPassword")

//Modifico los valores de los textos

userName.innerHTML = logedUserJSON.name
userNickname.innerHTML = `@${logedUserJSON.username}`
userEmail.innerHTML = logedUserJSON.email
userPhone.innerHTML = logedUserJSON.phone
userPassword.innerHTML = logedUserJSON.password

function logOut() {
    localStorage.removeItem("logedUser")
    window.location.href = '../HTML/index.html'
}