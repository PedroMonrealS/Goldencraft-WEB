let datos = [];
let noticiaActual = 0;

fetch('/api/noticias')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); 
    datos = data;
    noticiaInicial();
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
    NoticiasContenido.appendChild(datosNoticia);
    NoticiasContenido.appendChild(fotoNoticiasDIV);

    noticiaActual = num; // Asignar el número de noticia actual
    console.log("noticia actual = " + noticiaActual);
}

function noticiaInicial() {
  if (datos.length > 0) {
    mostrarNoticias(0);
    noticiaActual = 0; // Ajustar noticiaActual
  }
}

function siguienteNoticia() {
  if (noticiaActual < datos.length - 1) {
    mostrarNoticias(noticiaActual + 1);
  } else {
    console.log("No hay más noticias.");
  }
  if (noticiaActual === datos.length - 1) {
    
    console.log("Estás en la última noticia.");
  }
}

function noticiaAnterior() {
  if (noticiaActual > 0) {
    mostrarNoticias(noticiaActual - 1);
  } else {
    console.log("Ya estás en la primera noticia.");
  }
  if (noticiaActual === 0) {
    console.log("Estás en la primera noticia.");
  }
}
