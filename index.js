const express = require('express');
const morgan = require('morgan');
const vehiculosRoutes = require('./microVehiculos/src/controllers/vehiculosController');
const clientesRoutes = require('./microClientes/src/controllers/clientesController'); 
const piezasRoutes = require('./microPiezas/src/controllers/piezasController');
const reparacionesRoutes = require('./microReparaciones/src/controllers/reparacionesController');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(vehiculosRoutes);
app.use(reparacionesRoutes);
app.use(piezasRoutes);
app.use(clientesRoutes);


app.listen(3001, () => {
    console.log('Microservicio Vehículos corriendo en puerto 3001');
});