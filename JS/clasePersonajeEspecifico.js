class CampeonEspecifico {
    constructor (id, name, title, lore, blurb, spell1, spell2, spell3, spell4, passive, spell1Name, spell2Name, spell3Name, spell4Name, passiveName, spell1Image, spell2Image, spell3Image, spell4Image, passiveImage, numberOfSkins ) {
       this.id = id
       this.name = name
       this.title = title
       this.lore = lore
       this.blurb = blurb
       this.imageCard = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`
       this.imageLoading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`
       this.spell1_name = spell1Name
       this.spell1_description = spell1
       this.spell1_image = `http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${spell1Image}`
       this.spell2_name = spell2Name
       this.spell2_description = spell2
       this.spell2_image = `http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${spell2Image}`
       this.spell3_name = spell3Name
       this.spell3_description = spell3
       this.spell3_image = `http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${spell3Image}`
       this.spell4_name = spell4Name
       this.spell4_description = spell4
       this.spell4_image = `http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${spell4Image}`
       this.passive_name = passiveName
       this.passive_description = passive
       this.passive_image = `http://ddragon.leagueoflegends.com/cdn/13.8.1/img/passive/${passiveImage}`
       this.spriteImg = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`
       this.numberOfSkins = numberOfSkins
    }

    changeInformation() {
        campeonName.innerHTML = this.name
        campeonTittle.innerHTML = this.title
        campeonResume.innerHTML = this.lore
        background.style.backgroundImage=`url(${this.imageCard})`
        spriteImg.src = `${this.spriteImg}`
        passiveImg.src = `${this.passive_image}`
        skill1Img.src = `${this.spell1_image}`
        skill2Img.src = `${this.spell2_image}`
        skill3Img.src = `${this.spell3_image}`
        skill4Img.src = `${this.spell4_image}`
        skillTitle.innerHTML = `${this.passive_name}`
        skillText.innerHTML = `${this.passive_description}`
    }

}


// const spriteImg = document.getElementById("spriteImg")
// const passiveImg = document.getElementById("passive")
// const skill1Img = document.getElementById("skill1") 
// const skill2Img = document.getElementById("skill2")
// const skill3Img = document.getElementById("skill3")
// const skill4Img = document.getElementById("skill4")
// const skillText = document.getElementById("ResumeAbility")