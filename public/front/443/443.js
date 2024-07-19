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

var iconLink = document.createElement('link');
iconLink.rel = 'icon';
iconLink.type = 'image/x-icon';
iconLink.href = '../../general/media/favicon.ico';
document.head.appendChild(iconLink);