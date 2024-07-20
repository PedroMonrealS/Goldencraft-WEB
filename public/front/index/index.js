

let datos = [];
let preguntasFrecuentesData = [];

let noticiaActual = 0;

function formatearFecha(isoFecha) {
  const fecha = new Date(isoFecha);
  const dia = String(fecha.getUTCDate()).padStart(2, '0');
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
  const año = fecha.getUTCFullYear();
  return `${dia}/${mes}/${año}`;
}

fetch('/api/noticias')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    datos = data;
    noticiaInicial();
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  //Recibir preguntas
  fetch('/api/preguntasfrecuentes')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    preguntasFrecuentesData = data;
    preguntasFrecuentes();
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

function extenderNoticias() {
    var divNoticias = document.getElementById("divNoticias");
    divNoticias.style.height = "700px";
    var flechaSubir = document.getElementById("flechaNoticiasBajar");
    flechaSubir.style.display = "none";
    var noticiasOculto = document.getElementById("noticiasOculto");
    noticiasOculto.style.display = "block";
    var NoticiasContenido = document.getElementById("NoticiasContenido");
    setTimeout(function() {
        noticiasOculto.style.opacity = "100%";
        NoticiasContenido.scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

function colapsarNoticias() {
    var divNoticias = document.getElementById("divNoticias");
    divNoticias.style.height = "100px";
    var noticiasOculto = document.getElementById("noticiasOculto");
    noticiasOculto.style.display = "none";
    var flechaBajar = document.getElementById("flechaNoticiasBajar");
    flechaBajar.style.display = "block";
    setTimeout(function() {
        noticiasOculto.style.opacity = "0%";
    }, 300);
}

function mostrarNoticias(num) {
    var NoticiasContenido = document.getElementById("NoticiasContenido");
    NoticiasContenido.innerHTML = ""; // Limpiar contenido previo
    var datosNoticia = document.createElement("div");
    datosNoticia.classList.add("datosNoticia");

    var autor = document.createElement("h1");
    autor.textContent = datos[num].Autor;
    autor.classList.add("autorNoticia");


    var fecha = document.createElement("h1");
    fecha.textContent = formatearFecha(datos[num].fecha);
    fecha.classList.add("fecha");


    var titular = document.createElement("h1");
    titular.textContent = datos[num].Titular;
    titular.classList.add("titular");

    var contenido = document.createElement("p");
    contenido.textContent = datos[num].Contenido;
    contenido.classList.add("contenidoNoticia");

    var fotoNoticiasDIV = document.createElement("div");
    fotoNoticiasDIV.classList.add("fotoNoticias");

    var fotoNoticia = document.createElement("img");
    fotoNoticia.src = datos[num].foto;  
    fotoNoticiasDIV.appendChild(fotoNoticia);

    datosNoticia.appendChild(titular);
    datosNoticia.appendChild(contenido);
    datosNoticia.appendChild(autor);
    datosNoticia.appendChild(fecha);

    NoticiasContenido.appendChild(datosNoticia);
    NoticiasContenido.appendChild(fotoNoticiasDIV);

    noticiaActual = num; 
}

function noticiaInicial() {
  if (datos.length > 0) {
    mostrarNoticias(0);
    noticiaActual = 0;
  }
}

function siguienteNoticia() {
  if (noticiaActual < datos.length - 1) {
    mostrarNoticias(noticiaActual + 1);
  }
}

function noticiaAnterior() {
  if (noticiaActual > 0) {
    mostrarNoticias(noticiaActual - 1);
  }
}


function copiarIP() {
  var ip = "goldencraft.ddns.net";

  var areaTemporal = document.createElement("textarea");
  areaTemporal.value = ip;

  document.body.appendChild(areaTemporal);

  areaTemporal.select();
  areaTemporal.setSelectionRange(0, 99999);

  // Copia el texto al portapapeles
  document.execCommand("copy");

  // Elimina el área de texto temporal
  document.body.removeChild(areaTemporal);

  var hoverEntra = document.getElementById("hoverEntra");
  hoverEntra.style.display = "none";
  
  var hoverIP = document.getElementById("hoverIP");
  hoverIP.style.display = "none";

  var hoverclick = document.getElementById("hoverClick");
  hoverclick.style.display = "block";
  
}

function preguntasFrecuentes() {
  var preguntasOpciones = document.getElementById("preguntasOpciones");

  for (var pregunta = 0; pregunta < preguntasFrecuentesData.length; pregunta++) {
    var CajaOpcion = document.createElement("div");
    CajaOpcion.classList.add("cajaOpcion");

    var nombre = document.createElement("h1");
    nombre.classList.add("nombre");
    nombre.textContent = preguntasFrecuentesData[pregunta].nombre;

    var descripcion = document.createElement("h1");
    descripcion.classList.add("descripcion");
    descripcion.textContent = preguntasFrecuentesData[pregunta].descripcion;
    CajaOpcion.style.backgroundImage = "url('" + preguntasFrecuentesData[pregunta].fondo + "')";

    var divDatos = document.createElement("div");
    divDatos.classList.add("divDatos");
    divDatos.appendChild(nombre);
    divDatos.appendChild(descripcion);
    CajaOpcion.appendChild(divDatos);
    preguntasOpciones.appendChild(CajaOpcion);
  }
}    

