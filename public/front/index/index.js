fetch('http://localhost/api/noticias')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); 
    mostrarNoticias(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });


function extenderNoticias(){
    var divNoticias = document.getElementById("divNoticias");
    divNoticias.style.height = "700px";
    var flechaSubir = document.getElementById("flechaNoticiasBajar");
    flechaSubir.style.display = "none";
    var noticiasOculto = document.getElementById("noticiasOculto");
    noticiasOculto.style.display ="block";
    var NoticiasContenido = document.getElementById("NoticiasContenido");
    setTimeout(function() {
        noticiasOculto.style.opacity ="100%";
        NoticiasContenido.scrollIntoView({ behavior: 'smooth' });

    }, 300);
}

function colapsarNoticias(){
    var divNoticias = document.getElementById("divNoticias");
    divNoticias.style.height = "100px";
    var noticiasOculto = document.getElementById("noticiasOculto");
    noticiasOculto.style.display ="none";
    var flechaBajar = document.getElementById("flechaNoticiasBajar");
    flechaBajar.style.display = "block";
    setTimeout(function() {
        noticiasOculto.style.opacity ="0%";
    }, 300);


}


function mostrarNoticias(data){
    var NoticiasContenido = document.getElementById("NoticiasContenido");
    var datos = document.createElement("div");
    datos.classList.add("datosNoticia")
    var autor = document.createElement("h1");
    autor.textContent = data[0].Autor;
    autor.classList.add("autorNoticia")
    var titular = document.createElement("h1");
    titular.textContent = data[0].Titular;
    titular.classList.add("titular");
    var contenido = document.createElement("p");
    contenido.textContent = data[0].Contenido;
    contenido.classList.add("contenidoNoticia")
    var fotoNoticiasDIV = document.createElement("div");
    fotoNoticiasDIV.classList.add("fotoNoticias")
    var fotoNoticia = document.createElement("img");
    fotoNoticia.src = data[0].foto;  
    fotoNoticiasDIV.appendChild(fotoNoticia);
    datos.appendChild(titular);
    datos.appendChild(contenido);
    datos.appendChild(autor);
    NoticiasContenido.appendChild(datos)
    NoticiasContenido.appendChild(fotoNoticiasDIV);



}