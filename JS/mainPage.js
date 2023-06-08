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

    function newCampeon(){
        for (let i = 0; i < listaCampeones.length; i++) {
            var campeon = listaCampeones[i]
            nuevosCampeones.push( new CampeonGeneral (campeon.id, campeon.name, campeon.title, campeon.blurb, campeon.id) )
        }
        window.nuevosCampeonesGlobal = nuevosCampeones;
        
    }

    newCampeon()

    console.log(nuevosCampeonesGlobal)

    //Se crea la funcion de crear las tarjetas dinamicas de personaje, llamando los elementos de la lista de nuevosCampeones y llamo a la funcion de toMainPage que esta dentro de la clase de CampeonGeneral

    

    crearTarjetasMainPage()
    
    }

pedirData()

//Esta es la funcion selectChampiom que se crea en el div de las tarjetas dinamicas de personaje, se le quema el id del personaje

function selectChampiom(id) {
    window.location.href = `../HTML/characterDetail.html?id=${id}`  //Esto nos quiere decir que cuando se active la funcion nos redireccione a este link, que en este caso le estoy poniendo un params con el id.
}

function buscarPersonaje(textoABuscar) {
    var logedUser = localStorage.getItem("logedUser")
    var logedUserJSON = JSON.parse(logedUser)

    contenedorPrincipal.innerHTML = ""
    var textoABuscarLowerCase = textoABuscar.toLowerCase()
    for (let i = 0; i < nuevosCampeonesGlobal.length; i++) {
        var isFavorite = 0
        const element = nuevosCampeonesGlobal[i];
        if (element.id.toLowerCase().includes(textoABuscarLowerCase)) {
            var listaFavoritos = logedUserJSON.favorites
            for (let i = 0; i < listaFavoritos.length; i++) {
                var campeonFavorito = listaFavoritos[i];
                if (campeonFavorito === element.id) {
                    contenedorPrincipal.innerHTML += element.toMainPageFavorite()
                    var isFavorite = 1
                }               
            }
            if (isFavorite === 0) {
                contenedorPrincipal.innerHTML += element.toMainPage()  
            }
        }
    }
    
}

//Esta es la funcion para crear las tarjetas

function crearTarjetasMainPage() {
    var logedUser = localStorage.getItem("logedUser")
    var logedUserJSON = JSON.parse(logedUser)
    console.log(logedUserJSON.favorites)

    contenedorPrincipal.innerHTML = ""
 

    for (let i = 0; i < nuevosCampeonesGlobal.length; i++) {
        var isFavorite = 0
        element = nuevosCampeonesGlobal[i]
        var listaFavoritos = logedUserJSON.favorites
        for (let i = 0; i < listaFavoritos.length; i++) {
            var campeonFavorito = listaFavoritos[i];
            if (campeonFavorito === element.id) {
                contenedorPrincipal.innerHTML += element.toMainPageFavorite()
                var isFavorite = 1
            }
        }
        if (isFavorite === 0) {
            contenedorPrincipal.innerHTML += element.toMainPage()  
        }

    }

    searchCampeonTxt.value = ""
}

function addFavorite(id) {
    listaFavoritos = logedUserJSON.favorites
    listaFavoritos.push(id)
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

    crearTarjetasMainPage()
}

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

    crearTarjetasMainPage()
}