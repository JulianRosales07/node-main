const express = require('express');
const router = express.Router();
const piezasModel = require('../models/piezasModel');

// Obtener todas las piezas: /GasMonkey/piezas/traer
router.get('/GasMonkey/piezas/traer', async (req, res) => {
    try {
        const piezas = await piezasModel.traerPiezas();
        res.json(piezas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una pieza por ID: /GasMonkey/piezas/traer/:id
router.get('/GasMonkey/piezas/traer/:id', async (req, res) => {
    try {
        const pieza = await piezasModel.traerPieza(req.params.id);
        if (pieza) res.json(pieza);
        else res.status(404).json({ message: 'Pieza no encontrada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una pieza: /GasMonkey/piezas/crear
router.post('/GasMonkey/piezas/crear', async (req, res) => {
    const { nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso } = req.body;
    try {
        await piezasModel.crearPieza(nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso);
        res.status(201).json({ message: 'Pieza creada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una pieza: /GasMonkey/piezas/modificar/:id
router.put('/GasMonkey/piezas/modificar/:id', async (req, res) => {
    const { nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso } = req.body;
    try {
        await piezasModel.modificarPiezaId(req.params.id, nombre, precio, stock, proveedor, fecha_ingreso, categoria, marca, modelo_compatible, garantia, peso);
        res.json({ message: 'Pieza actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una pieza: /GasMonkey/piezas/eliminar/:id
router.delete('/GasMonkey/piezas/eliminar/:id', async (req, res) => {
    try {
        const success = await piezasModel.eliminarPiezaId(req.params.id);
        if (success) res.json({ message: 'Pieza eliminada' });
        else res.status(404).json({ message: 'Pieza no encontrada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar piezas por dos parámetros: /GasMonkey/piezas/buscar
router.get('/GasMonkey/piezas/buscar', async (req, res) => {
    try {
        const { campo1, valor1, campo2, valor2 } = req.query;
        
        // Verificar que se proporcionaron todos los parámetros necesarios
        if (!campo1 || !valor1 || !campo2 || !valor2) {
            return res.status(400).json({ 
                message: 'Se requieren todos los parámetros: campo1, valor1, campo2, valor2',
                ejemplo: '/GasMonkey/piezas/buscar?campo1=nombre&valor1=Freno&campo2=categoria&valor2=Suspension'
            });
        }
        
        const piezas = await piezasModel.buscarPiezasPorParametros(campo1, valor1, campo2, valor2);
        
        if (piezas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron piezas con esos criterios' });
        }
        
        res.json(piezas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;