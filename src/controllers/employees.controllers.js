import { pool } from '../db.js'
export { pool } from '../db.js'

//Declaración de las rutas

//Ruta para obtener los empleados
export const obtenerEmpleado = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal"
        })
    }

}
//ruta para crear un empleado
export const crearEmpleado = async (req, res) => {
    const { name, salary } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES(?, ?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal"
        })
    }
}

//obtener un único empleado
export const obtenerEmpleadoUnico = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Empleado no éxiste'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal"
        })
    }
}

// actualizar un empleado
export const actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
    try {
        const [result] = await pool.query('UPDATE employee SET name=ifnull(?, name) , salary=ifnull(?, salary)  WHERE id=?', [name, salary, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: "No se encuentra el empleado"
        })
        const [rows] = await pool.query('SELECT * FROM employee WHERE id=?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json('Algo salió mal')
    }
}

//Ruta y proceso para la eliminación de empleado.
export const eliminarEmpleado = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])
        if (rows.affectedRows <= 0) return res.status(404).json({
            message: "Empleado no éxiste, no puedes eliminarlo"
        })
        res.send('Empleado eliminado con éxito')
    } catch (error) {
        return res.status(500).json({
            message: "Algo salió mal"
        })
    }
}
