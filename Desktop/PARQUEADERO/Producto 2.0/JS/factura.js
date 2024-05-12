// Función para obtener la fecha actual en formato YYYY-MM-DD
function obtenerFechaActual() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const dia = ahora.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}

// Función para obtener la hora actual en formato HH:mm
function obtenerHoraActual() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
}

// Función para llenar la factura con los datos y guardarla
function llenarYGuardarFactura() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreCliente = urlParams.get('nombreCliente');
    const nombreAdministrador = urlParams.get('nombreAdministrador');
    const placaVehiculo = urlParams.get('placaVehiculo');

    // Llenar campos de la factura en el HTML
    document.getElementById('nombreCliente').textContent = nombreCliente;
    document.getElementById('nombreAdministrador').textContent = nombreAdministrador;
    document.getElementById('placaVehiculo').textContent = placaVehiculo;
    document.getElementById('fechaIngreso').textContent = obtenerFechaActual();
    document.getElementById('horaIngreso').textContent = obtenerHoraActual();

    // Crear la factura
    const factura = {
        nombreCliente: nombreCliente,
        nombreAdministrador: nombreAdministrador,
        placaVehiculo: placaVehiculo,
        fechaIngreso: obtenerFechaActual(),
        horaIngreso: obtenerHoraActual()
    };
}

// Llama a la función para llenar y guardar la factura
llenarYGuardarFactura();