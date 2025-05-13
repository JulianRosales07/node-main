const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'interchange.proxy.rlwy.net',
    port:'39809',
    user: 'root', // Reemplaza con tu usuario
    password: 'klGJkEKVAWycQdDBYJZBQZtBPRTWgZNa', // Reemplaza con tu contraseña
    database: 'railway'
});

async function traerVehiculos() {
    const [result] = await connection.query('SELECT * FROM vehiculos');
    return result;
}

async function traerVehiculo(id) {
    const [result] = await connection.query('SELECT * FROM vehiculos WHERE id_vehiculo = ?', [id]);
    return result[0];
}

async function crearVehiculo(marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor) {
    const [result] = await connection.query(
        'INSERT INTO vehiculos (marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor]
    );
    return result;
}

async function modificarVehiculoId(id, marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor) {
    const [result] = await connection.query(
        'UPDATE vehiculos SET marca = ?, modelo = ?, anio = ?, placa = ?, color = ?, tipo = ?, id_cliente = ?, kilometraje = ?, transmision = ?, motor = ? WHERE id_vehiculo = ?',
        [marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor, id]
    );
    return result;
}

async function eliminarVehiculoId(id) {
    const [result] = await connection.query('DELETE FROM vehiculos WHERE id_vehiculo = ?', [id]);
    return result.affectedRows > 0;
}

async function buscarVehiculosPorParametros(campo1, valor1, campo2, valor2) {
    // Validar que los campos sean válidos para evitar inyección SQL
    const camposValidos = ['marca', 'modelo', 'anio', 'placa', 'color', 'tipo', 'id_cliente', 'kilometraje', 'transmision', 'motor'];
    
    if (!camposValidos.includes(campo1) || !camposValidos.includes(campo2)) {
        throw new Error('Campo de búsqueda no válido');
    }
    
    const [result] = await connection.query(
        `SELECT * FROM vehiculos WHERE ${campo1} LIKE ? AND ${campo2} LIKE ?`,
        [`%${valor1}%`, `%${valor2}%`]
    );
    return result;
}

module.exports = { traerVehiculos, traerVehiculo, crearVehiculo, modificarVehiculoId, eliminarVehiculoId, buscarVehiculosPorParametros };