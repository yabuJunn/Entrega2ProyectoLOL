//Llamo a los contenedores

const contenedorPrincipal = document.getElementById("contenedorAllCampeones")
const searchCampeonTxt = document.getElementById("searchCampeonTxt")

//Llamo a los datos del usuario y la condicion de que si no esta registrado lo mande a la landing page

var logedUser = localStorage.getItem("logedUser")
if (logedUser === null) {
    alert("No hay un usuario registrado")
    window.location.href = '../HTML/index.html';
}
var logedUserJSON = JSON.parse(logedUser)
var listaFavoritos = logedUserJSON.favorites
console.log(listaFavoritos)

//Llamo los datos de la api con esta funcion

async function pedirData() { 
    const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion.json`) //Se pide la data, que aprovechando que es un link fijo y solo se cambia el nombre del personaje que estamos pidiendo, esta nos devuelve todo el json asociado al personaje
    const json = await response.json()  //Aqui se espera la respuesta del API
    const dataCampeon = json.data   //Como el json me trae informacion inncesesaria la depuro para que solo me traiga el data
    console.log(dataCampeon)
    //Llamo a las keys de la data

    const keys = Object.keys(dataCampeon)

    //Inicializo la variable listaCampeones donde se va a hacer la lista de los objects parseados.

    var listaCampeones = []

    //Convierte la data en una lista de objects por cada campeon, para asi luego llamar a esa lista

    for(let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const obj = dataCampeon[key]
    listaCampeones.push(obj)
    }

    //Es la funcion que crea las clases de cada nuevo campeon general, ya con la data convertida a lista solo llama cada objeto por orden y saca los datos para crear el nuevo campeon

    var nuevosCampeones = [] //Inicializo la lista de los nuevos campeones creados desde la clase aqui afuera porque la quiero usar globalmente.

    for (let i = 0; i < listaCampeones.length; i++) {
        var campeon = listaCampeones[i]
        nuevosCampeones.push( new campeonFavorito (campeon.id, campeon.name, campeon.title, campeon.blurb, campeon.id) )
    }
    window.nuevosCampeonesGlobal = nuevosCampeones;

    crearTarjetasCampeon()

}

//Esta es la funcion que me crea solamente las tarjetas si estan en favoritos

function crearTarjetasCampeon() {
    var logedUser = localStorage.getItem("logedUser")
    var logedUserJSON = JSON.parse(logedUser)
    console.log(logedUserJSON.favorites)

    contenedorPrincipal.innerHTML = ""
 

    for (let i = 0; i < nuevosCampeonesGlobal.length; i++) {
        element = nuevosCampeonesGlobal[i]
        var listaFavoritos = logedUserJSON.favorites
        for (let i = 0; i < listaFavoritos.length; i++) {
            var campeonFavorito = listaFavoritos[i];
            if (campeonFavorito === element.id) {
                contenedorPrincipal.innerHTML += element.toHTML()
            }
        }
    }

    if (contenedorPrincipal.innerHTML === "") {
        contenedorPrincipal.innerHTML = `<p class="noCampeones">You don't have favorites champions</p>`
    }
}

pedirData()

function deleteFavorite(id) {
    listaFavoritos = logedUserJSON.favorites
    for (let i = 0; i < listaFavoritos.length; i++) {
        var favoritesDelete = listaFavoritos[i];
        if (favoritesDelete === id) {
            var favoriteToDelete = i
        }
    }
    listaFavoritos.splice(favoriteToDelete, 1)
    logedUserJSON["favorites"] = listaFavoritos
    var logedUserString = JSON.stringify(logedUserJSON)
    localStorage.setItem("logedUser", logedUserString)
    var usersData = localStorage.getItem("usersData")
    var usersDataJSON = usersData
    for (let i = 0; i < usersDataJSON.length; i++) {
        const element = usersDataJSON[i];
        if (element.email === logedUserJSON.email) {
            usersDataJSON[i] = logedUserJSON
            var newUsersDataString = JSON.stringify(logedUserJSON)
            localStorage.setItem("usersData", newUsersDataString)
        }
    }

    crearTarjetasCampeon()
}

function selectChampiom(id) {
    console.log(id)
    window.location.href = `../HTML/characterDetail.html?id=${id}`  //Esto nos quiere decir que cuando se active la funcion nos redireccione a este link, que en este caso le estoy poniendo un params con el id.
}