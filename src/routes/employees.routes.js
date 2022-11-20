import { Router } from "express";
import {obtenerEmpleado, crearEmpleado, actualizarEmpleado, eliminarEmpleado, obtenerEmpleadoUnico} from '../controllers/employees.controllers.js'

const router = Router();

router.get('/employees',  obtenerEmpleado)
router.get('/employees/:id',  obtenerEmpleadoUnico)
router.post('/employees', crearEmpleado )
router.patch('/employees/:id', actualizarEmpleado )
router.delete('/employees/:id', eliminarEmpleado )

export default router;