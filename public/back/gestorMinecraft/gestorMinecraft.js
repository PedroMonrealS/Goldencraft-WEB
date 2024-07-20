document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el campo de entrada y el formulario
    var input = document.getElementById("input");
    var form = document.getElementById("form");

    // Añade un listener para el evento 'input' en el campo de entrada
    input.addEventListener('input', function() {
        // Obtén el valor del campo de entrada
        var mensaje = input.value;
        
        // Actualiza la acción del formulario con el nuevo valor
        form.action = "/mcBOTmessage?message=" + encodeURIComponent(mensaje);

        // Para depuración, muestra la nueva acción en la consola
        console.log("Nueva acción del formulario:", form.action);
    });
});
