class CampeonGeneral {
  constructor (id, name, title, blurb, idName) {
    this.id = id
    this.name = name
    this.title = title
    this.blurb = blurb
    this.idName
    this.imageCard = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${idName}_0.jpg`
  }

  toMainPage() {
    return `
    <div class="tarjetaCampeon" onclick="selectChampiom('${this.id}')">
        <img src="${this.imageCard}" alt="" class="imgCampeon">
        <div class="infoCampeon">
            <h2>${this.name}</h2>
            <h3>${this.title}</h3>
            <p>${this.blurb}</p>
            <img src="../Recursos/RecursosJuanDavid/Iconos/inactive_star.png" alt="" class="icon" >
            <img src="../Recursos/RecursosJuanDavid/Iconos/menu_points.png" alt="" class="icon">
        </div>
    </div>
    `
  }

  toMainPage() {
    return `
    <div class="tarjetaCampeon">
        <img src="${this.imageCard}" alt="" class="imgCampeon">
        <div class="infoCampeon">
            <h2 onclick="selectChampiom('${this.id}')" >${this.name}</h2>
            <h3 onclick="selectChampiom('${this.id}')" >${this.title}</h3>
            <p onclick="selectChampiom('${this.id}')" >${this.blurb}</p>
            <img src="../Recursos/RecursosJuanDavid/Iconos/inactive_star.png" alt="" class="icon" onclick="addFavorite('${this.id}')">
            <img src="../Recursos/RecursosJuanDavid/Iconos/menu_points.png" alt="" class="icon">
        </div>
    </div>
    `
  } 

  toMainPageFavorite() {
    return `
    <div class="tarjetaCampeon">
        <img src="${this.imageCard}" alt="" class="imgCampeon">
        <div class="infoCampeon">
          <h2 onclick="selectChampiom('${this.id}')" >${this.name}</h2>
          <h3 onclick="selectChampiom('${this.id}')" >${this.title}</h3>
          <p onclick="selectChampiom('${this.id}')" >${this.blurb}</p>
            <img src="../Recursos/RecursosJuanDavid/Iconos/active_star.png" alt="" class="icon"  onclick="deleteFavorite('${this.id}')">
            <img src="../Recursos/RecursosJuanDavid/Iconos/menu_points.png" alt="" class="icon">
        </div>
    </div>
    `
  } 

}