const errorText = document.getElementById("error")

// Obtener el formulario de inicio de sesión
const loginForm = document.querySelector('form');

var usersData = localStorage.getItem("usersData")
var usersDataJSON = JSON.parse(usersData)
console.log(usersDataJSON)

//Llamo a los datos del usuario y la condicion de que si ya esta registrado lo mande a la mainPage

var logedUser = localStorage.getItem("logedUser")
if (logedUser !== null) {
    window.location.href = '../HTML/mainPage.html';
}

// Agregar un evento de envío para el formulario
loginForm.addEventListener('submit', (event) => {
	
	for (let i = 0; i < usersDataJSON.length; i++) {
		const element = usersDataJSON[i];
		console.log(element)
	}

	event.preventDefault(); // Prevenir el envío del formulario
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	for (let i = 0; i < usersDataJSON.length; i++) {
		var indicator = 0
		const user = usersDataJSON[i];
		console.log(user)
		console.log(username.value)
		if (user.email === username) {
			console.log("Usuario encontrado")
			userData = user
			indicator = 1
		}
		console.log(indicator)
	}

	if (indicator === 0) {
		errorText.innerHTML = 'El usuario no esta registrado'
			return
	}

	// Comprobar si las credenciales de inicio de sesión son válidas
	if (password === userData.password) {
		showSuccessModal('Inicio de sesión exitoso!');
		loginForm.reset(); // Limpiar el formulario
		// Redirigir al usuario a la página deseada
		var userString = JSON.stringify(userData)
		localStorage.setItem("logedUser", userString)
		
	} else {
		errorText.innerHTML = 'Nombre de usuario o contraseña incorrectos'
		return
	}
});

function showErrorModal(message) {
  const modalBackground = createModalBackground();
  const modal = createModal("Error", message);

  modal.appendChild(createCloseButton(closeModal));
  modalBackground.appendChild(modal);
  document.body.appendChild(modalBackground);
}

function showSuccessModal(message) {
  const modalBackground = createModalBackground();
  const modal = createModal("Éxito", message);

  const closeButton = createCloseButton(() => {
    closeModal();
    redirectToLogin();
  });
  closeButton.textContent = "Aceptar";

  modal.appendChild(closeButton);
  modalBackground.appendChild(modal);
  document.body.appendChild(modalBackground);
}

function createModalBackground() {
  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");
  return modalBackground;
}

function createModal(title, message) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = title;

  const modalMessage = document.createElement("p");
  modalMessage.textContent = message;

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalMessage);
  modal.appendChild(modalContent);

  return modal;
}

function createCloseButton(clickHandler) {
  const closeButton = document.createElement("button");
  closeButton.classList.add("modal-close");
  closeButton.textContent = "Cerrar";
  closeButton.addEventListener("click", clickHandler);
  return closeButton;
}

function closeModal() {
  const modalBackground = document.querySelector(".modal-background");
  modalBackground.parentNode.removeChild(modalBackground);
}

function redirectToLogin() {
  window.location.href = '../HTML/mainPage.html';
}