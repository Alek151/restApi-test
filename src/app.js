import express from "express";
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

//rutas creadas
app.use(indexRoutes);
app.use('/api', employeesRoutes);

app.use((req, res, next)=>{
    res.status(404).json({
        message: "No éxiste"
    })
})

export default app;