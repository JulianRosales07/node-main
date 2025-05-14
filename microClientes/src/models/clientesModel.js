const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'interchange.proxy.rlwy.net',
    port: '39809',
    user: 'root', // Reemplaza con tu usuario
    password: 'klGJkEKVAWycQdDBYJZBQZtBPRTWgZNa', // Reemplaza con tu contraseña
    database: 'railway'
});

// Opcionally, log errors from the pool
connection.on && connection.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
});

async function traerClientes() {
    try {
        const [result] = await connection.query('SELECT * FROM clientes');
        return result;
    } catch (error) {
        console.error('Error al traer clientes:', error.message);
        throw new Error('No se pudo obtener los clientes. Detalle: ' + error.message);
    }
}

async function traerCliente(id) {
    try {
        const [result] = await connection.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
        return result[0];
    } catch (error) {
        console.error('Error al traer cliente:', error.message);
        throw new Error('No se pudo obtener el cliente. Detalle: ' + error.message);
    }
}

async function crearCliente(nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero) {
    try {
        const [result] = await connection.query(
            'INSERT INTO clientes (nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero]
        );
        return result;
    } catch (error) {
        console.error('Error al crear cliente:', error.message);
        throw new Error('No se pudo crear el cliente. Detalle: ' + error.message);
    }
}

async function modificarClienteId(id, nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero) {
    try {
        const [result] = await connection.query(
            'UPDATE clientes SET nombre = ?, telefono = ?, direccion = ?, correo = ?, fecha_registro = ?, documento_identidad = ?, ciudad = ?, edad = ?, genero = ? WHERE id_cliente = ?',
            [nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero, id]
        );
        return result;
    } catch (error) {
        console.error('Error al modificar cliente:', error.message);
        throw new Error('No se pudo modificar el cliente. Detalle: ' + error.message);
    }
}

async function eliminarClienteId(id) {
    try {
        const [result] = await connection.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al eliminar cliente:', error.message);
        throw new Error('No se pudo eliminar el cliente. Detalle: ' + error.message);
    }
}

async function buscarClientesPorParametros(campo1, valor1, campo2, valor2) {
    const camposValidos = ['nombre', 'telefono', 'direccion', 'correo', 'fecha_registro', 'documento_identidad', 'ciudad', 'edad', 'genero'];
    if (!camposValidos.includes(campo1) || !camposValidos.includes(campo2)) {
        throw new Error('Campo de búsqueda no válido');
    }
    try {
        const [result] = await connection.query(
            `SELECT * FROM clientes WHERE ${campo1} LIKE ? AND ${campo2} LIKE ?`,
            [`%${valor1}%`, `%${valor2}%`]
        );
        return result;
    } catch (error) {
        console.error('Error al buscar clientes por parámetros:', error.message);
        throw new Error('No se pudo buscar clientes. Detalle: ' + error.message);
    }
}

module.exports = { traerClientes, traerCliente, crearCliente, modificarClienteId, eliminarClienteId, buscarClientesPorParametros };