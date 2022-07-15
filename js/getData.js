let miembrosEquipoItem = document.getElementById("equipo-miembros");
let proyectosItem = document.getElementById("proyectos-item");

/* Crea la "tarjeta" por cada miembro de equipo */
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
      miembrosEquipoItem.appendChild(miembroItem);
  });
}

function truncate(str, n, useWordBoundary) {
  if (str.length <= n) { return str; }
  const subString = str.substr(0, n-1);

  return (useWordBoundary 
    ? subString.substr(0, subString.lastIndexOf(" ")) 
    : subString) + "&hellip;";
};


/* Crea la "tarjeta" por cada proyecto */
function crearProyecto(proyectos){
  proyectos.forEach(proy => {
    let proyItem = document.createElement("div");
    proyItem.classList.add("card");


    proyItem.innerHTML = `
      <img class="card-img-top" src="${proy.imgUrl}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${proy.nombre}</h5>
        <p class="card-text"><small class="text-muted">${proy.tipo}</small></p>
        <p class="card-text">${truncate(proy.descripcion, 84, true)} <a> Ver más</a></p>
      </div>
    `;

    proyectosItem.appendChild(proyItem);
  });
}

fetch("https://lyhdevs.github.io/lhdevs/data/data.json").then(response => response.json()).then(data => {
  crearEquipo(data.equipo);
  crearProyecto(data.proyectos);
});