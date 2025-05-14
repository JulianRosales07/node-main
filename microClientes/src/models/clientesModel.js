const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'interchange.proxy.rlwy.net',
    port:'39809',
    user: 'root', // Reemplaza con tu usuario
    password: 'klGJkEKVAWycQdDBYJZBQZtBPRTWgZNa', // Reemplaza con tu contraseña
    database: 'railway'
});

async function traerClientes() {
    const [result] = await connection.query('SELECT * FROM clientes');
    return result;
}

async function traerCliente(id) {
    const [result] = await connection.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
    return result[0];
}

async function crearCliente(nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero) {
    const [result] = await connection.query(
        'INSERT INTO clientes (nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero]
    );
    return result;
}

async function modificarClienteId(id, nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero) {
    const [result] = await connection.query(
        'UPDATE clientes SET nombre = ?, telefono = ?, direccion = ?, correo = ?, fecha_registro = ?, documento_identidad = ?, ciudad = ?, edad = ?, genero = ? WHERE id_cliente = ?',
        [nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero, id]
    );
    return result;
}

async function eliminarClienteId(id) {
    const [result] = await connection.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    return result.affectedRows > 0;
}

async function buscarClientesPorParametros(campo1, valor1, campo2, valor2) {
    // Validar que los campos sean válidos para evitar inyección SQL
    const camposValidos = ['nombre', 'telefono', 'direccion', 'correo', 'fecha_registro', 'documento_identidad', 'ciudad', 'edad', 'genero'];
    
    if (!camposValidos.includes(campo1) || !camposValidos.includes(campo2)) {
        throw new Error('Campo de búsqueda no válido');
    }
    
    const [result] = await connection.query(
        `SELECT * FROM clientes WHERE ${campo1} LIKE ? AND ${campo2} LIKE ?`,
        [`%${valor1}%`, `%${valor2}%`]
    );
    return result;
}

module.exports = { traerClientes, traerCliente, crearCliente, modificarClienteId, eliminarClienteId, buscarClientesPorParametros };