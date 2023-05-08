//Llamo a los contenedores

const contenedorPrincipal = document.getElementById("contenedorAllCampeones")
const searchCampeonTxt = document.getElementById("searchCampeonTxt")

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

    function crearTarjetasMainPage() {
        for (let i = 0; i < nuevosCampeones.length; i++) {
            element = nuevosCampeones[i]
            contenedorPrincipal.innerHTML += element.toMainPage()  
        }
    }

    crearTarjetasMainPage()
    
    }

pedirData()

//Esta es la funcion selectChampiom que se crea en el div de las tarjetas dinamicas de personaje, se le quema el id del personaje

function selectChampiom(id) {
    window.location.href = `../HTML/characterDetail.html?id=${id}`  //Esto nos quiere decir que cuando se active la funcion nos redireccione a este link, que en este caso le estoy poniendo un params con el id.
}

function buscarPersonaje(textoABuscar) {
    contenedorPrincipal.innerHTML = ""
    var textoABuscarLowerCase = textoABuscar.toLowerCase()
    for (let i = 0; i < nuevosCampeonesGlobal.length; i++) {
        const element = nuevosCampeonesGlobal[i];
        if (element.id.toLowerCase().includes(textoABuscarLowerCase)) {
            console.log(element.id.toLowerCase())
            contenedorPrincipal.innerHTML += element.toMainPage()
        }
    }
    
}