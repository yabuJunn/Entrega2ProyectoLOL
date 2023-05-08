// Obtener el formulario de registro
const registerForm = document.querySelector('form');
const password = document.getElementById("password")
const Email = document.getElementById("Email")
const username = document.getElementById("username")
const confirmPassword = document.getElementById("confirmPassword")
const error = document.getElementById("error")

//Agregar un evento de envío para el formulario
registerForm.addEventListener('submit', (event) => {
	event.preventDefault()

	if (password.value !== confirmPassword.value) {
		error.innerHTML = "Las contraseñas no coinciden"
	} else {
		event.preventDefault(); // Prevenir el envío del formulario
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		// Guardar los datos de registro en el almacenamiento local
		localStorage.setItem('username', username);
		localStorage.setItem('password', password);
		alert('Registro exitoso!');
		registerForm.reset(); // Limpiar el formulario

		// Redirigir al formulario de inicio de sesión
		window.location.href = '../HTML/Login.html';
	}
});

// function button() {
// 	if ( Email.value === "" || username.value === "" || password.value === "" || confirmPassword.value === "") {
// 		alert("Hay campos vacios")
// 	} else if (password.value !== confirmPassword.value) {
// 		alert("Las contraseñas no coinciden")
// 	} else {
// 		event.preventDefault(); // Prevenir el envío del formulario
// 		const username = document.getElementById('username').value;
// 		const password = document.getElementById('password').value;

// 		// Guardar los datos de registro en el almacenamiento local
// 		localStorage.setItem('username', username);
// 		localStorage.setItem('password', password);
// 		alert('Registro exitoso!');
// 		registerForm.reset(); // Limpiar el formulario

// 		// Redirigir al formulario de inicio de sesión
// 		window.location.href = '../HTML/Login.html';
// 	}
// }
