const information1 = document.getElementById("information1")
const information2 = document.getElementById("information2")
const information3 = document.getElementById("information3")

const linea1 = document.getElementById("Línea_1")
const linea2 = document.getElementById("Línea_2")
const linea3 = document.getElementById("Línea_3")

mostrarInformation1()

function mostrarInformation1() {
    information1.classList.remove("informationHidden")
    information1.classList.add("informationShow")
    information2.classList.remove("informationShow")
    information3.classList.remove("informationShow")
    information2.classList.add("informationHidden")
    information3.classList.add("informationHidden")
    linea1.classList.remove("informationHidden")
    linea2.classList.add("informationHidden")
    linea3.classList.add("informationHidden")
}

function mostrarInformation2() {
    information2.classList.remove("informationHidden")
    information2.classList.add("informationShow")
    information1.classList.remove("informationShow")
    information3.classList.remove("informationShow")
    information1.classList.add("informationHidden")
    information3.classList.add("informationHidden")
    linea2.classList.remove("informationHidden")
    linea1.classList.add("informationHidden")
    linea3.classList.add("informationHidden")
}

function mostrarInformation3() {
    information3.classList.remove("informationHidden")
    information3.classList.add("informationShow")
    information1.classList.remove("informationShow")
    information2.classList.remove("informationShow")
    information1.classList.add("informationHidden")
    information2.classList.add("informationHidden")
    linea3.classList.remove("informationHidden")
    linea2.classList.add("informationHidden")
    linea1.classList.add("informationHidden")
}

const params = new URLSearchParams(window.location.search)  //Se recoje la barra de busqueda que contiene el ID del personaje
var idCampeon = params.get("id")    //Se pide que recoja la propiedad id del params

const campeonName = document.getElementById("campeonName")
const campeonTittle = document.getElementById("campeonTittle")
const campeonResume = document.getElementById("campeonResume")
const background = document.getElementById("Background")

const sliderCard = document.getElementById("sliderCard")
const spriteImg = document.getElementById("spriteImg")
const passiveImg = document.getElementById("passive")
const skill1Img = document.getElementById("skill1") 
const skill2Img = document.getElementById("skill2")
const skill3Img = document.getElementById("skill3")
const skill4Img = document.getElementById("skill4")
const skillTitle = document.getElementById("skillTitle")
const skillText = document.getElementById("ResumeAbility")
const skillType = document.getElementById("skillType")

passiveImg.classList.add("SkillsSelected")
skill1Img.classList.add("SkillsUnSelected")
skill2Img.classList.add("SkillsUnSelected")
skill3Img.classList.add("SkillsUnSelected")
skill4Img.classList.add("SkillsUnSelected")

//Se hace la funcion para pedir la data especifica del personaje, es una funcion asincronica porque hay que esperar la data

async function pedirPersonaje(idCampeon) { 
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion/${idCampeon}.json`) //Se pide la data, que aprovechando que es un link fijo y solo se cambia el nombre del personaje que estamos pidiendo, esta nos devuelve todo el json asociado al personaje
    const json = await response.json()  //Aqui se espera la respuesta del API
    const dataCampeon = json.data   //Como el json me trae informacion inncesesaria la depuro para que solo me traiga el data
    console.log(dataCampeon)

    //IMPORTANTE: Como el API me arroja la data es un objeto con los datos pero esta dentro de otro objeto con el nombre del personaje, asi que usamos dataCampeon[id] para acceder dentro del objeto y llegar a la data que necesitamos, importante que las [] se usen, de lo contrario estaria buscando una key string que no existe en este caso, porque estamos usando la id que tiene el nombre del personaje como una variable, los [] pueden recibir variables
    
    //Aqui ya se crea el objeto con la clase 
    var personajeEspecifico = new CampeonEspecifico(dataCampeon[idCampeon].id, dataCampeon[idCampeon].name, dataCampeon[idCampeon].title, dataCampeon[idCampeon].lore, dataCampeon[idCampeon].blurb, dataCampeon[idCampeon].spells[0].description, dataCampeon[idCampeon].spells[1].description, dataCampeon[idCampeon].spells[2].description, dataCampeon[idCampeon].spells[3].description, dataCampeon[idCampeon].passive.description, dataCampeon[idCampeon].spells[0].name, dataCampeon[idCampeon].spells[1].name, dataCampeon[idCampeon].spells[2].name, dataCampeon[idCampeon].spells[3].name, dataCampeon[idCampeon].passive.name, dataCampeon[idCampeon].spells[0].image.full, dataCampeon[idCampeon].spells[1].image.full, dataCampeon[idCampeon].spells[2].image.full, dataCampeon[idCampeon].spells[3].image.full, dataCampeon[idCampeon].passive.image.full, dataCampeon[idCampeon].skins.length)
    console.log(personajeEspecifico)

    personajeEspecifico.changeInformation()

    window.personajeEspecificoGlobal = personajeEspecifico

    crearSkins(dataCampeon[idCampeon])

    callSlider()

}

pedirPersonaje(idCampeon)

function passive() {
    skillTitle.innerHTML = `${personajeEspecificoGlobal.passive_name}`
    skillType.innerHTML = `Passive`
    skillText.innerHTML = `${personajeEspecificoGlobal.passive_description}`
    passiveImg.classList.add("SkillsSelected")
    passiveImg.classList.remove("SkillsUnSelected")
    skill1Img.classList.add("SkillsUnSelected")
    skill2Img.classList.add("SkillsUnSelected")
    skill3Img.classList.add("SkillsUnSelected")
    skill4Img.classList.add("SkillsUnSelected")
    skill1Img.classList.add("SkillsSelected")
    skill2Img.classList.add("SkillsSelected")
    skill3Img.classList.add("SkillsSelected")
    skill4Img.classList.add("SkillsSelected")
}

function spell1() {
    skillTitle.innerHTML = `${personajeEspecificoGlobal.spell1_name}`
    skillType.innerHTML = `Spell 1`
    skillText.innerHTML = `${personajeEspecificoGlobal.spell1_description}`
    skill1Img.classList.add("SkillsSelected")
    skill1Img.classList.remove("SkillsUnSelected")
    passiveImg.classList.add("SkillsUnSelected")
    skill2Img.classList.add("SkillsUnSelected")
    skill3Img.classList.add("SkillsUnSelected")
    skill4Img.classList.add("SkillsUnSelected")
    passiveImg.classList.add("SkillsSelected")
    skill2Img.classList.add("SkillsSelected")
    skill3Img.classList.add("SkillsSelected")
    skill4Img.classList.add("SkillsSelected")
}

function spell2() {
    skillTitle.innerHTML = `${personajeEspecificoGlobal.spell2_name}`
    skillType.innerHTML = `Spell 2`
    skillText.innerHTML = `${personajeEspecificoGlobal.spell2_description}`
    skill2Img.classList.add("SkillsSelected")
    skill2Img.classList.remove("SkillsUnSelected")
    passiveImg.classList.add("SkillsUnSelected")
    skill1Img.classList.add("SkillsUnSelected")
    skill3Img.classList.add("SkillsUnSelected")
    skill4Img.classList.add("SkillsUnSelected")
    passiveImg.classList.add("SkillsSelected")
    skill1Img.classList.add("SkillsSelected")
    skill3Img.classList.add("SkillsSelected")
    skill4Img.classList.add("SkillsSelected")
}

function spell3() {
    skillTitle.innerHTML = `${personajeEspecificoGlobal.spell3_name}`
    skillType.innerHTML = `Spell 3`
    skillText.innerHTML = `${personajeEspecificoGlobal.spell3_description}`
    skill3Img.classList.add("SkillsSelected")
    skill3Img.classList.remove("SkillsUnSelected")
    passiveImg.classList.add("SkillsUnSelected")
    skill1Img.classList.add("SkillsUnSelected")
    skill2Img.classList.add("SkillsUnSelected")
    skill4Img.classList.add("SkillsUnSelected")
    passiveImg.classList.add("SkillsSelected")
    skill1Img.classList.add("SkillsSelected")
    skill2Img.classList.add("SkillsSelected")
    skill4Img.classList.add("SkillsSelected")
}

function spell4() {
    skillTitle.innerHTML = `${personajeEspecificoGlobal.spell4_name}`
    skillType.innerHTML = `Spell 4`
    skillText.innerHTML = `${personajeEspecificoGlobal.spell4_description}`
    skill4Img.classList.add("SkillsSelected")
    skill4Img.classList.remove("SkillsUnSelected")
    passiveImg.classList.add("SkillsUnSelected")
    skill1Img.classList.add("SkillsUnSelected")
    skill2Img.classList.add("SkillsUnSelected")
    skill3Img.classList.add("SkillsUnSelected")
    passiveImg.classList.add("SkillsSelected")
    skill1Img.classList.add("SkillsSelected")
    skill2Img.classList.add("SkillsSelected")
    skill3Img.classList.add("SkillsSelected")
}

function crearSkins(dataCampeon) {
    slider.innerHTML = ""
    for (let i = 0; i < dataCampeon.skins.length; i++) {
        slider.innerHTML += `
        <div class="sliderElement">
            <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${dataCampeon.id}_${dataCampeon.skins[i].num}.jpg" alt="" class="skin">
            <h1>${i}. ${dataCampeon.skins[i].name}</h1>
        </div>
        `
        }
}

//PROGRAMACION DEL SLIDER

function callSlider() {

const sliderContainer = document.getElementById("sliderContainer")
const slider = document.getElementById("slider")
const buttonLeft = document.getElementById("buttonLeft")
const buttonRight = document.getElementById("buttonRight")

const sliderElements = document.querySelectorAll('.sliderElement')

const rootStyles = document.documentElement.style;

let slideCounter = 0
let isInTransition = false

const DIRECTION = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
}

const getTransformValue = () => 
Number(rootStyles.getPropertyValue('--slide-transform').replace('px', ''))

const reorderSlide = () => {
    const transformValue = getTransformValue()
    rootStyles.setProperty('--transition', 'none')
    if (slideCounter === sliderElements.length-1) {
        slider.appendChild(slider.firstElementChild)
        rootStyles.setProperty('--slide-transform', `${transformValue + sliderElements[slideCounter].scrollWidth}px`)
        slideCounter--
    } else if (slideCounter === 0) {
        slider.prepend(slider.lastElementChild)
        rootStyles.setProperty('--slide-transform', `${transformValue - sliderElements[slideCounter].scrollWidth}px`)
        console.log("derecha")
        slideCounter++
    }

    isInTransition = false
}

const moveSlide =  (direction) => {
    if (isInTransition) return
    const transformValue = getTransformValue()
    rootStyles.setProperty('--transition', 'transform 1s')
    isInTransition = true
    if (direction === DIRECTION.LEFT) {
        console.log("izquierda")
        rootStyles.setProperty('--slide-transform', `${transformValue + sliderElements[slideCounter].scrollWidth}px`)
        slideCounter--
    } else if(direction === DIRECTION.RIGHT) {
        rootStyles.setProperty('--slide-transform', `${transformValue - sliderElements[slideCounter].scrollWidth}px`)
        console.log("derecha")
        slideCounter++
    }
}

buttonRight.addEventListener('click', ()=>moveSlide(DIRECTION.RIGHT))
buttonLeft.addEventListener('click', ()=>moveSlide(DIRECTION.LEFT))

slider.addEventListener('transitionend', reorderSlide)

reorderSlide()

}