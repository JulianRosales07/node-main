const express = require('express');
const router = express.Router();
const vehiculosModel = require('../models/vehiculosModel');

// Obtener todos los vehículos: /GasMonkey/vehiculos/traer
router.get('/GasMonkey/vehiculos/traer', async (req, res) => {
    try {
        const vehiculos = await vehiculosModel.traerVehiculos();
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un vehículo por ID: /GasMonkey/vehiculos/traer/:id
router.get('/GasMonkey/vehiculos/traer/:id', async (req, res) => {
    try {
        const vehiculo = await vehiculosModel.traerVehiculo(req.params.id);
        if (vehiculo) res.json(vehiculo);
        else res.status(404).json({ message: 'Vehículo no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un vehículo: /GasMonkey/vehiculos/crear
router.post('/GasMonkey/vehiculos/crear', async (req, res) => {
    const { marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor } = req.body;
    try {
        await vehiculosModel.crearVehiculo(marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor);
        res.status(201).json({ message: 'Vehículo creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un vehículo: /GasMonkey/vehiculos/modificar/:id
router.put('/GasMonkey/vehiculos/modificar/:id', async (req, res) => {
    const { marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor } = req.body;
    try {
        await vehiculosModel.modificarVehiculoId(req.params.id, marca, modelo, anio, placa, color, tipo, id_cliente, kilometraje, transmision, motor);
        res.json({ message: 'Vehículo actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un vehículo: /GasMonkey/vehiculos/eliminar/:id
router.delete('/GasMonkey/vehiculos/eliminar/:id', async (req, res) => {
    try {
        const success = await vehiculosModel.eliminarVehiculoId(req.params.id);
        if (success) res.json({ message: 'Vehículo eliminado' });
        else res.status(404).json({ message: 'Vehículo no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar vehículos por dos parámetros: /GasMonkey/vehiculos/buscar
router.get('/GasMonkey/vehiculos/buscar', async (req, res) => {
    try {
        const { campo1, valor1, campo2, valor2 } = req.query;
        
        // Verificar que se proporcionaron todos los parámetros necesarios
        if (!campo1 || !valor1 || !campo2 || !valor2) {
            return res.status(400).json({ 
                message: 'Se requieren todos los parámetros: campo1, valor1, campo2, valor2',
                ejemplo: '/GasMonkey/vehiculos/buscar?campo1=marca&valor1=Toyota&campo2=color&valor2=Rojo'
            });
        }
        
        const vehiculos = await vehiculosModel.buscarVehiculosPorParametros(campo1, valor1, campo2, valor2);
        
        if (vehiculos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron vehículos con esos criterios' });
        }
        
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;