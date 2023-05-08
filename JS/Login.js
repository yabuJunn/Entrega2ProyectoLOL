// Obtener el formulario de inicio de sesión
const loginForm = document.querySelector('form');

// Agregar un evento de envío para el formulario
loginForm.addEventListener('submit', (event) => {
	event.preventDefault(); // Prevenir el envío del formulario
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	// Obtener los datos de registro almacenados en el almacenamiento local
	const storedUsername = localStorage.getItem('username');
	const storedPassword = localStorage.getItem('password');

	// Comprobar si las credenciales de inicio de sesión son válidas
	if (username === "juancho04reyes@gmail.com" && password === "123456") {
		alert('Inicio de sesión exitoso!');
		loginForm.reset(); // Limpiar el formulario
		// Redirigir al usuario a la página deseada
		window.location.href = '../HTML/mainPage.html';
	} else {
		alert('Nombre de usuario o contraseña incorrectos.');
	}
});
