let miembrosEquipoItem = document.getElementById("equipo-miembros");
let proyectosItem = document.getElementById("proyectos-item");
let testimoniosItem = document.getElementById("testimonios-item");

/* Inserta datos generales como e-mail, web url, etc */
function insertarDatos(datos){
  let emailElement = document.getElementById("lyhemail");
  let ubicacionElement = document.getElementById("lyhlocation");

  $("#mailto").attr("href", `mailto:${datos.email}`);
  emailElement.append(datos.email);
  ubicacionElement.append(datos.ubicacion);
}

/* Corta el texto a una determinada cantidad de caracteres */
function truncate(str, n, useWordBoundary) {
  if (str.length <= n) { return str; }
  const subString = str.substr(0, n-1);

  return (useWordBoundary 
    ? subString.substr(0, subString.lastIndexOf(" ")) 
    : subString) + "&hellip;";
};

/* Crea la "tarjeta" y modal por cada proyecto */
function crearProyecto(proyectos){
  console.log(proyectos);
  proyectos.forEach(proy => {
    /* Modal */
    let proyModalItem = document.createElement("div");
    proyModalItem.innerHTML = `
      <div class="modal fade bd-example-modal-lg" id="modalPry${proy.key}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h5 class="modal-title" id="exampleModalLongTitle">${proy.nombre}</h5>
                <p class="card-text"><small class="text-muted">${proy.tipo}</small></p>
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-sm-12 col-md-7">
                  <img class="card-img-top" src="${proy.imgUrl}" alt="">
                </div>
                <div class="col-sm-12 col-md-5 proy-desc">
                  <p class="card-text">${proy.descripcion}</p>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Genial!</button>
              <a href="${proy.url}" target="_blanl" type="button" class="btn-pink">Visitar sitio</a>
            </div>
          </div>
        </div>
      </div>
    `;

    proyectosItem.appendChild(proyModalItem);

    /* Tarjeta */
    let proyItem = document.createElement("div");
    proyItem.classList.add("card");

    proyItem.innerHTML = `
      <img class="card-img-top" src="${proy.imgUrl}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${proy.nombre}</h5>
        <p class="card-text"><small class="text-muted">${proy.tipo}</small></p>
        <p class="card-text">${truncate(proy.descripcion, 84, true)} 
          <button type="button" class="btn-masinfo" data-toggle="modal" data-target="#modalPry${proy.key}">
            Ver más 
          </button>
        </p>
      </div>
    `;

    proyectosItem.appendChild(proyItem);
  });
}

/* Crea la "tarjeta" por cada miembro de equipo */
function crearEquipo(equipo){
  equipo.forEach(miembro => {
    let miembroItem = document.createElement("div");
    miembroItem.classList.add("col-lg-6", "col-md-12", "col-sm-12", "col-12", "miembro");
    miembroItem.innerHTML = `
      <div class="row">
        <div class="col-lg-5 col-md-6 col-sm-6 col-6">
          <img src="${miembro.imgUrl}" class="img-fluid" alt="">
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

function rating(rate, id){
  let filled = Math.floor(rate);
  let half = (rate - filled)/0.5;
  let rest = Math.floor(5 - rate);

  let ratingItem = document.createElement("div");
  ratingItem.classList.add("rating"); 
  
  for(let i = 0; i < filled; i++) {
    ratingItem.innerHTML += "<ion-icon name=\"star\"></ion-icon>";
  }

  for(let i = 0; i < half; i++) {
    ratingItem.innerHTML += "<ion-icon name=\"star-half-outline\"></ion-icon>";
  }
  
  for(let i = 0; i < rest; i++) {
    ratingItem.innerHTML += "<ion-icon name=\"star-outline\"></ion-icon>"
  }

 return ratingItem;
}


/* Crea la "tarjeta" por cada testimonio */
function crearTestimonios(testimonios){
  testimonios.forEach(testimonio => {
    let testimonioItem = document.createElement("div");
    let ratingItem = rating(testimonio.calificacion, testimonio.key).outerHTML;

    testimonioItem.classList.add("testimonios_caja");
    testimonioItem.innerHTML = `
      <div class="caja-top">
        <div class="perfil">
          <!-- img -->
          <img class="perfil-img" src="${testimonio.imgUrl}" alt="">
          
          <!-- nombre y usuario-->
          <div class="name-user">
            <strong>${testimonio.cliente}</strong>
            <span>@${testimonio.usuario}</span>
          </div>
        </div>
        
        <!-- rating -->
        ${ratingItem}
      </div>
      
      <!-- comentarios-->
      <div class="comentarios_clientes">
        <p>${testimonio.testimonio}</p>
      </div>
    `;
    
    testimoniosItem.appendChild(testimonioItem); 
  });
}

fetch("https://lyhdevs.github.io/lhdevs/data/data.json").then(response => response.json()).then(data => {
  insertarDatos(data.datos)
  crearProyecto(data.proyectos);
  crearEquipo(data.equipo);
  crearTestimonios(data.testimonios);
});