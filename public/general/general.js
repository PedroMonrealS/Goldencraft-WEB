
function checkAuthentication() {
    fetch('/api/check-auth', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const derecha = document.getElementById("derecha");
        const registro = document.getElementById("registro");

        if (data.authenticated) {
            console.log('Usuario autenticado:', data.user);
            registro.classList.add("fa-gear");
            var cajaderecha = document.createElement("div");
            derecha.appendChild(cajaderecha);
            cajaderecha.style.display ="inline-block";
            const logout = document.createElement("i");
            logout.classList.add("fa-arrow-right-from-bracket", "fa-solid");
            derecha.appendChild(logout);

            registro.addEventListener("click", () => {
                window.location.href = '/dashboard';
            });

            logout.addEventListener("click", () => {
                window.location.href = '/logout';
            });

            // Lógica para mostrar opción adicional si es admin
            if (data.role === 'admin') {
                const adminOption = document.createElement('i');
                adminOption.classList.add("fa-solid");
                adminOption.classList.add("fa-screwdriver-wrench");
                adminOption.addEventListener('click', () => {
                window.location.href = '/backend';
                });
                cajaderecha.appendChild(adminOption);
            }
        } else {
            console.log('Usuario no autenticado');
            registro.classList.add("fa-user");
            registro.addEventListener("click", () => {
                window.location.href = '/login';
            });
        }
    })
    .catch(error => {
        console.error('Error al verificar la autenticación:', error);
    });
}

// Cargar recursos externos
function loadExternalResources() {
    // Crear y añadir el enlace al CSS general
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '../../general/general.css';
    document.head.appendChild(link);

    // Cargar Fontawesome
    const fontawesome = document.createElement('script');
    fontawesome.src = 'https://kit.fontawesome.com/ed128d191c.js';
    fontawesome.crossOrigin = 'anonymous';
    document.body.appendChild(fontawesome);

    // Cargar Minecraft API
    const mcAPI = document.createElement('script');
    mcAPI.src = 'https://mcapi.us/scripts/minecraft.min.js';
    mcAPI.crossOrigin = 'anonymous';
    mcAPI.onload = numeroJugadores; // Llamar a numeroJugadores al cargar el script
    document.body.appendChild(mcAPI);

    // Preconnect a Google Fonts
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'true'; // Usamos 'true' para crossorigin
    document.head.appendChild(preconnect2);

    // Cargar Google Fonts CSS
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Añadir favicon
    const iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.type = 'image/x-icon';
    iconLink.href = '../../general/media/favicon.ico';
    document.head.appendChild(iconLink);
}

// Función para obtener el número de jugadores conectados
function numeroJugadores() {
    if (typeof MinecraftAPI !== 'undefined') {
        MinecraftAPI.getServerStatus('goldencraftbeta.aternos.me', {
            port: 25565
        }, (err, status) => {
            if (err) {
                return console.error('Error cargando el estado:', err);
            }
            const PlayersOnline = document.getElementById("PlayersOnline");
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
    const navbar = document.createElement("div");
    navbar.classList.add("navbar");

    const izquierda = document.createElement("div");
    izquierda.classList.add("izquierda");

    const fotoLogo = document.createElement("img");
    fotoLogo.src = "../../general/media/LogoSencillo.png";
    fotoLogo.addEventListener("click", () => {
        window.location.href = '/';
    });
    izquierda.appendChild(fotoLogo);

    const contadorJugadores = document.createElement("h1");
    contadorJugadores.id = "PlayersOnline";
    contadorJugadores.classList.add("fa-solid", "fa-plug");

    const derecha = document.createElement("div");
    derecha.id = "derecha";
    derecha.classList.add("derecha");

    const registro = document.createElement("i");
    registro.id = "registro";
    registro.classList.add("fa-solid");

    checkAuthentication(); // Llama a checkAuthentication para configurar el ícono y los eventos

    navbar.appendChild(izquierda);
    navbar.appendChild(contadorJugadores);
    derecha.appendChild(registro);
    navbar.appendChild(derecha);

    if (window.innerWidth < 600) {
        contadorJugadores.style.display = "none";
    }

    document.body.insertBefore(navbar, document.body.firstChild);
}

// Cargar recursos externos y crear la barra de navegación
loadExternalResources();
crearNavbar();


