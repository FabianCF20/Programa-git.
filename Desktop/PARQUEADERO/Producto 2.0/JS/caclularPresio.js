function calcularPrecio() {
    // Obtener los valores del formulario
    const fechaIngreso = document.getElementById('fecha-ingreso').value;
    const horaIngreso = document.getElementById('hora-ingreso').value;
    const minutosIngreso = document.getElementById('minutos-ingreso').value;
    const tipoVehiculo = document.getElementById('tipo-vehiculo').value;

    // Crear objetos Date con la fecha y hora de ingreso
    const fechaHoraIngreso = new Date(`${fechaIngreso}T${horaIngreso}:${minutosIngreso}:00`);

    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date();

    // Calcular el tiempo transcurrido en minutos
    const tiempoTranscurridoMs = fechaHoraActual - fechaHoraIngreso;
    const tiempoTranscurridoMinutos = Math.floor(tiempoTranscurridoMs / (1000 * 60));

    // Definir el costo por minuto para carro y moto
    const tarifaCarro = 56;
    const tarifaMoto = 39;

    // Calcular el precio basado en el tipo de vehículo
    let precio = 0;
    if (tipoVehiculo === 'carro') {
        precio = tiempoTranscurridoMinutos * tarifaCarro;
    } else if (tipoVehiculo === 'moto') {
        precio = tiempoTranscurridoMinutos * tarifaMoto;
    }

    // Mostrar el resultado
    document.getElementById('resultado').innerText = `El precio a pagar es: ${precio} pesos.`;
}