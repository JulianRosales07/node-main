const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'interchange.proxy.rlwy.net:39809',
    user: 'root', // Reemplaza con tu usuario
    password: 'klGJkEKVAWycQdDBYJZBQZtBPRTWgZNa', // Reemplaza con tu contraseña
    database: 'railway'
});

async function traerPiezas() {
    const [result] = await connection.query('SELECT * FROM piezas');
    return result;
}

async function traerPieza(id) {
    const [result] = await connection.query('SELECT * FROM piezas WHERE id_pieza = ?', [id]);
    return result[0];
}

async function crearPieza(nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso) {
    const [result] = await connection.query(
        'INSERT INTO piezas (nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso]
    );
    return result;
}

async function modificarPiezaId(id, nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso) {
    const [result] = await connection.query(
        'UPDATE piezas SET nombre = ?, precio = ?, stock = ?, proveedor = ?, fecha_ingreso = ?, categoria = ?, marca = ?, modelo_compatible = ?, garantia = ?, peso = ? WHERE id_pieza = ?',
        [nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso, id]
    );
    return result;
}

async function eliminarPiezaId(id) {
    const [result] = await connection.query('DELETE FROM piezas WHERE id_pieza = ?', [id]);
    return result.affectedRows > 0;
}

async function buscarPiezasPorParametros(campo1, valor1, campo2, valor2) {
    // Validar que los campos sean válidos para evitar inyección SQL
    const camposValidos = ['nombre', 'precio', 'stock', 'proveedor', 'fecha_ingreso', 'categoria', 'marca', 'modelo_compatible', 'garantia', 'peso'];
    
    if (!camposValidos.includes(campo1) || !camposValidos.includes(campo2)) {
        throw new Error('Campo de búsqueda no válido');
    }
    
    const [result] = await connection.query(
        `SELECT * FROM piezas WHERE ${campo1} LIKE ? AND ${campo2} LIKE ?`,
        [`%${valor1}%`, `%${valor2}%`]
    );
    return result;
}

module.exports = { traerPiezas, traerPieza, crearPieza, modificarPiezaId, eliminarPiezaId, buscarPiezasPorParametros };