class campeonFavorito {
    constructor (id, name, title, blurb, idName) {
      this.id = id
      this.name = name
      this.title = title
      this.blurb = blurb
      this.idName
      this.imageCard = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${idName}_0.jpg`
    }
    
    toHTML() {
        return `
        <div class="tarjetaCampeon" onclick="selectChampiom('${this.id}')">
            <div class="imgCampeon">
                <img src="${this.imageCard}" alt="">
            </div>
            <div class="infoCampeon">
                <h2>${this.name}</h2>
                <h3>${this.title}</h3>
                <p>${this.blurb}</p>
                <img src="../Recursos/RecursosJuanDavid/Iconos/active_star.png" alt="" class="icon" onclick="event.stopPropagation(); deleteFavorite('${this.id}')" >
                <img src="../Recursos/RecursosJuanDavid/Iconos/menu_points.png" alt="" class="icon">
            </div>
        </div>
        `
    } 

  }