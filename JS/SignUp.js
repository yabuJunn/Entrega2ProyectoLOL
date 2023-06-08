// Obtener el formulario de registro
const registerForm = document.querySelector('form');
const password = document.getElementById("password")
const Email = document.getElementById("Email")
const phone = document.getElementById("phone")
const username = document.getElementById("username")
const nameName = document.getElementById("name")
const confirmPassword = document.getElementById("confirmPassword")
const error = document.getElementById("error")

//Llamo a los datos del usuario y la condicion de que si ya esta registrado lo mande a la mainPage

var logedUser = localStorage.getItem("logedUser")
if (logedUser !== null) {
    window.location.href = '../HTML/mainPage.html';
}

var usersData = localStorage.getItem("usersData")
var usersDataJSON = JSON.parse(usersData)
console.log(usersDataJSON)

//Agregar un evento de envío para el formulario

console.log(usersData)

registerForm.addEventListener('submit', (event) => {
	event.preventDefault()

	var usersData = localStorage.getItem("usersData")
	var usersDataJSON = JSON.parse(usersData)
	console.log(usersDataJSON)

	if (usersData !== null) {
		console.log(usersDataJSON)
		if (buscarCorreo(Email.value, usersDataJSON)) {
			error.innerHTML = "Este correo ya esta en uso"
			return ""
		} 
	} 
	
	if (password.value !== confirmPassword.value) {
		error.innerHTML = "Las contraseñas no coinciden"
	} else {
		event.preventDefault(); // Prevenir el envío del formulario

		if (usersData === null) {
			console.log("Entro a la condicion usersData null")
			var usersDataJSON = []
			var newUser = {
				email: Email.value,
				password: password.value,
				name: nameName.value,
				username: username.value,
				phone: phone.value,
				favorites: [
				]
			}

			usersDataJSON.push(newUser)

			usersDataString = JSON.stringify(usersDataJSON)

			localStorage.setItem("usersData", usersDataString)

			alert('Registro exitoso!');
			registerForm.reset(); // Limpiar el formulario

			// Redirigir al formulario de inicio de sesión
			window.location.href = '../HTML/Login.html';

		} else {
			console.log("Entro a la condicion usersData existe")
			var newUser = {
				email: Email.value,
				password: password.value,
				name: nameName.value,
				username: username.value,
				phone: phone.value,
				favorites: [
				]
			}

			usersDataJSON.push(newUser)

			usersDataString = JSON.stringify(usersDataJSON)

			localStorage.setItem("usersData", usersDataString)

			alert('Registro exitoso!');
			registerForm.reset(); // Limpiar el formulario

			// Redirigir al formulario de inicio de sesión
			window.location.href = '../HTML/Login.html';
		}
	}
});

function buscarCorreo(email, usersdata) {
	console.log(usersdata)
	if (usersdata === null) {
		return false
	} else {
		console.log("Entro a la funcion buscaarcorreo")
	for (let i = 0; i < usersdata.length; i++) {
		var user = usersdata[i];
		console.log(user)
		if (user.email === email) {
			console.log(user.email)
			console.log("El correo ya esta registrado")
			return true
		}

	}

	return false
	}
	
}