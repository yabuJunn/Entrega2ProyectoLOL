//Llamo a los datos del usuario y la condicion de que si ya esta registrado lo mande a la mainPage

var logedUser = localStorage.getItem("logedUser")
if (logedUser !== null) {
    window.location.href = '../HTML/mainPage.html';
}