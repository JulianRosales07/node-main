const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1193051330',
    database: 'taller_mecanico'
});

async function traerReparaciones() {
    const [result] = await connection.query('SELECT * FROM reparaciones');
    return result;
}

async function traerReparacion(id) {
    const [result] = await connection.query('SELECT * FROM reparaciones WHERE id_reparacion = ?', [id]);
    return result[0];
}

async function crearReparacion(fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada) {
    const [result] = await connection.query(
        'INSERT INTO reparaciones (fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada]
    );
    return result;
}

async function modificarReparacionId(id, fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada) {
    const [result] = await connection.query(
        'UPDATE reparaciones SET fecha = ?, descripcion = ?, costo = ?, estado = ?, garantia = ?, id_vehiculo = ?, tipo_reparacion = ?, mecanico_asignado = ?, duracion_estimada = ? WHERE id_reparacion = ?',
        [fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada, id]
    );
    return result;
}

async function eliminarReparacionId(id) {
    const [result] = await connection.query('DELETE FROM reparaciones WHERE id_reparacion = ?', [id]);
    return result.affectedRows > 0;
}

async function buscarReparacionesPorParametros(campo1, valor1, campo2, valor2) {
    // Validar que los campos sean válidos para evitar inyección SQL
    const camposValidos = ['fecha', 'descripcion', 'costo', 'estado', 'garantia', 'id_vehiculo', 'tipo_reparacion', 'mecanico_asignado', 'duracion_estimada'];
    
    if (!camposValidos.includes(campo1) || !camposValidos.includes(campo2)) {
        throw new Error('Campo de búsqueda no válido');
    }
    
    const [result] = await connection.query(
        `SELECT * FROM reparaciones WHERE ${campo1} LIKE ? AND ${campo2} LIKE ?`,
        [`%${valor1}%`, `%${valor2}%`]
    );
    return result;
}

module.exports = { traerReparaciones, traerReparacion, crearReparacion, modificarReparacionId, eliminarReparacionId, buscarReparacionesPorParametros };