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
		showErrorModal("Las contraseñas no coinciden");
		
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

			showSuccessModal('Registro exitoso!');
			registerForm.reset(); // Limpiar el formulario

			// Redirigir al formulario de inicio de sesión
			

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

			showSuccessModal('Registro exitoso!');
			registerForm.reset(); // Limpiar el formulario

			// Redirigir al formulario de inicio de sesión
			
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
  window.location.href = '../HTML/Login.html';
}
