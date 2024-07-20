fetch('/api/usuario')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    Autor(data.nombre);
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud Fetch:', error);
  });

function Autor(nombre) {
  var input = document.getElementById("Autor");
  input.value = nombre;
}


    //Establecer fecha en formulario
  function establecerFechaHoy() {
    var hoy = new Date();
    var año = hoy.getFullYear();
    var mes = ('0' + (hoy.getMonth() + 1)).slice(-2); 
    var día = ('0' + hoy.getDate()).slice(-2); 
    
    var fechaFormato = año + '-' + mes + '-' + día;
    
    var inputFecha = document.getElementById("fecha");
    inputFecha.value = fechaFormato;
}

window.onload = establecerFechaHoy;