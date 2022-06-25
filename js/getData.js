let miembrosEquipoItem = document.getElementById("equipo-miembros");

function crearEquipo(equipo){
  equipo.forEach(miembro => {
    let miembroItem = document.createElement("div");
    miembroItem.classList.add("col-lg-6", "col-md-12", "col-sm-12", "col-12", "miembro");
    //TODO: Reemplazar img
    miembroItem.innerHTML = `
      <div class="row">
        <div class="col-lg-5 col-md-6 col-sm-6 col-6">
          <img src="./img/developer.jpg" class="img-fluid" alt="">
        </div>
        <div class="col-lg-7 col-md-6 col-sm-6 col-6">
          <h4 class="miembro-nombre">${miembro.nombre}</h4>
          <small class="miembro-posicion">${miembro.posicion.toUpperCase()}</small>
          <p class="miembro-descripcion">${miembro.descripcion}</p>
          <span> <a href="${miembro.portfolioUrl}" target="_blank"><i class="fa-solid fa-laptop-code"></i></a></span>
          <span> <a href="${miembro.linkedinUrl}" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a></span>
          <span> <a href="${miembro.instagramUrl}" target="_blank"><i class="fa-brands fa-instagram"></i></a></span>
        </div>
      </div>
      `;
    document.getElementById("equipo-miembros").appendChild(miembroItem);
  });
}

fetch("/data/data.json").then(response => response.json()).then(data => {
  crearEquipo(data.equipo);
});