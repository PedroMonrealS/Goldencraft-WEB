// Crear y añadir el enlace al CSS general
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = '../../general/general.css';
document.head.appendChild(link);

// Cargar Fontawesome
var fontawesome = document.createElement('script');
fontawesome.src = 'https://kit.fontawesome.com/ed128d191c.js';
fontawesome.crossOrigin = 'anonymous';
document.body.appendChild(fontawesome);

// Cargar Minecraft API
var mcAPI = document.createElement('script');
mcAPI.src = 'https://mcapi.us/scripts/minecraft.min.js';
mcAPI.crossOrigin = 'anonymous';
mcAPI.onload = function() {
    // Una vez cargado mcAPI, llamamos a numeroJugadores
    numeroJugadores();
};
document.body.appendChild(mcAPI);

// Preconnect a Google Fonts
var preconnect1 = document.createElement('link');
preconnect1.rel = 'preconnect';
preconnect1.href = 'https://fonts.googleapis.com';
document.head.appendChild(preconnect1);

// Preconnect a fonts.gstatic.com con crossorigin=true
var preconnect2 = document.createElement('link');
preconnect2.rel = 'preconnect';
preconnect2.href = 'https://fonts.gstatic.com';
preconnect2.crossOrigin = 'true';  // Usamos 'true' para crossorigin
document.head.appendChild(preconnect2);

// Cargar Google Fonts CSS
var fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Función para obtener el número de jugadores conectados
function numeroJugadores() {
    if (typeof MinecraftAPI !== 'undefined') {
        MinecraftAPI.getServerStatus('mc.universocraft.net', {
            port: 25565
        }, function (err, status) {
            if (err) {
                return console.error('Error cargando el estado:', err);
            }
            var PlayersOnline = document.getElementById("PlayersOnline");
            if (PlayersOnline) {
                PlayersOnline.textContent = " Online: " + status.players.now;
            } else {
                console.error('Elemento PlayersOnline no encontrado en el DOM.');
            }
        });
    } else {
        console.error('MinecraftAPI no está definido aún.');
    }
}

// Función para crear la barra de navegación
function crearNavbar() {
    var navbar = document.createElement("div");
    navbar.classList.add("navbar");
    
    var izquierda = document.createElement("div");
    izquierda.classList.add("izquierda");
    
    var fotoLogo = document.createElement("img");
    fotoLogo.src = "../../general/media/LogoSencillo.png";
    fotoLogo.addEventListener("click", function() {
        window.location.href = '/';
    });  
    izquierda.appendChild(fotoLogo);
    
    var width = window.innerWidth;

    var contadorJugadores = document.createElement("h1");
    contadorJugadores.id = "PlayersOnline";
    contadorJugadores.classList.add("fa-solid");
    contadorJugadores.classList.add("fa-plug");

    var derecha = document.createElement("div");
    derecha.classList.add("derecha");
    
    var Usuario = document.createElement("i");
    Usuario.textContent = "Usuario";
    
    var registro = document.createElement("i");
    registro.classList.add("fa-solid");
    registro.classList.add("fa-user");
    registro.addEventListener("click", function() {
        window.location.href = '/registro';
    });  
    
    navbar.appendChild(izquierda);
    navbar.appendChild(contadorJugadores);
    derecha.appendChild(Usuario);
    derecha.appendChild(registro);
    navbar.appendChild(derecha);
    if (width < 600) {
        contadorJugadores.style.display = "none";
        Usuario.style.display = "none";

    }
    document.body.insertBefore(navbar, document.body.firstChild);
}

// Llamar a la función para crear la barra de navegación
crearNavbar();

// Añadir favicon
var iconLink = document.createElement('link');
iconLink.rel = 'icon';
iconLink.type = 'image/x-icon';
iconLink.href = '../../general/media/favicon.ico';
document.head.appendChild(iconLink);
