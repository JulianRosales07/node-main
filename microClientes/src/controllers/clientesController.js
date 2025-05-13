const express = require('express');
const router = express.Router();
const clientesModel = require('../models/clientesModel');

// Obtener todos los clientes: /GasMonkey/clientes/traer
router.get('/GasMonkey/clientes/traer', async (req, res) => {
    try {
        const clientes = await clientesModel.traerClientes();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un cliente por ID: /GasMonkey/clientes/traer/:id
router.get('/GasMonkey/clientes/traer/:id', async (req, res) => {
    try {
        const cliente = await clientesModel.traerCliente(req.params.id);
        if (cliente) res.json(cliente);
        else res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un cliente: /GasMonkey/clientes/crear
router.post('/GasMonkey/clientes/crear', async (req, res) => {
    const { nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero } = req.body;
    try {
        await clientesModel.crearCliente(nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero);
        res.status(201).json({ message: 'Cliente creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un cliente: /GasMonkey/clientes/modificar/:id
router.put('/GasMonkey/clientes/modificar/:id', async (req, res) => {
    const { nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero } = req.body;
    try {
        await clientesModel.modificarClienteId(req.params.id, nombre, telefono, direccion, correo, fecha_registro, documento_identidad, ciudad, edad, genero);
        res.json({ message: 'Cliente actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un cliente: /GasMonkey/clientes/eliminar/:id
router.delete('/GasMonkey/clientes/eliminar/:id', async (req, res) => {
    try {
        const success = await clientesModel.eliminarClienteId(req.params.id);
        if (success) res.json({ message: 'Cliente eliminado' });
        else res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar clientes por dos parámetros: /GasMonkey/clientes/buscar
router.get('/GasMonkey/clientes/buscar', async (req, res) => {
    try {
        const { campo1, valor1, campo2, valor2 } = req.query;
        
        // Verificar que se proporcionaron todos los parámetros necesarios
        if (!campo1 || !valor1 || !campo2 || !valor2) {
            return res.status(400).json({ 
                message: 'Se requieren todos los parámetros: campo1, valor1, campo2, valor2',
                ejemplo: '/GasMonkey/clientes/buscar?campo1=nombre&valor1=Juan&campo2=ciudad&valor2=Bogota'
            });
        }
        
        const clientes = await clientesModel.buscarClientesPorParametros(campo1, valor1, campo2, valor2);
        
        if (clientes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron clientes con esos criterios' });
        }
        
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;