const express = require('express');
const router = express.Router();
const reparacionesModel = require('../models/reparacionesModel');

// Obtener todas las reparaciones: /GasMonkey/reparaciones/traer
router.get('/GasMonkey/reparaciones/traer', async (req, res) => {
    try {
        const reparaciones = await reparacionesModel.traerReparaciones();
        res.json(reparaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una reparación por ID: /GasMonkey/reparaciones/traer/:id
router.get('/GasMonkey/reparaciones/traer/:id', async (req, res) => {
    try {
        const reparacion = await reparacionesModel.traerReparacion(req.params.id);
        if (reparacion) res.json(reparacion);
        else res.status(404).json({ message: 'Reparación no encontrada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una reparación: /GasMonkey/reparaciones/crear
router.post('/GasMonkey/reparaciones/crear', async (req, res) => {
    const { fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada } = req.body;
    try {
        await reparacionesModel.crearReparacion(fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada);
        res.status(201).json({ message: 'Reparación creada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una reparación: /GasMonkey/reparaciones/modificar/:id
router.put('/GasMonkey/reparaciones/modificar/:id', async (req, res) => {
    const { fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada } = req.body;
    try {
        await reparacionesModel.modificarReparacionId(req.params.id, fecha, descripcion, costo, estado, garantia, id_vehiculo, tipo_reparacion, mecanico_asignado, duracion_estimada);
        res.json({ message: 'Reparación actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una reparación: /GasMonkey/reparaciones/eliminar/:id
router.delete('/GasMonkey/reparaciones/eliminar/:id', async (req, res) => {
    try {
        const success = await reparacionesModel.eliminarReparacionId(req.params.id);
        if (success) res.json({ message: 'Reparación eliminada' });
        else res.status(404).json({ message: 'Reparación no encontrada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar reparaciones por dos parámetros: /GasMonkey/reparaciones/buscar
router.get('/GasMonkey/reparaciones/buscar', async (req, res) => {
    try {
        const { campo1, valor1, campo2, valor2 } = req.query;
        
        // Verificar que se proporcionaron todos los parámetros necesarios
        if (!campo1 || !valor1 || !campo2 || !valor2) {
            return res.status(400).json({ 
                message: 'Se requieren todos los parámetros: campo1, valor1, campo2, valor2',
                ejemplo: '/GasMonkey/reparaciones/buscar?campo1=estado&valor1=Pendiente&campo2=mecanico_asignado&valor2=Juan'
            });
        }
        
        const reparaciones = await reparacionesModel.buscarReparacionesPorParametros(campo1, valor1, campo2, valor2);
        
        if (reparaciones.length === 0) {
            return res.status(404).json({ message: 'No se encontraron reparaciones con esos criterios' });
        }
        
        res.json(reparaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;