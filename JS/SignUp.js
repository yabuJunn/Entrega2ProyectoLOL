// Obtener el formulario de registro
const registerForm = document.querySelector('form');

// Agregar un evento de envío para el formulario
registerForm.addEventListener('submit', (event) => {
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
});
