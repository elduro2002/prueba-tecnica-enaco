import { Navigate, Route, Routes } from "react-router-dom"
import { AuthLayout } from "../../layouts/autenticacion/AuthLayout"
import { Registrar } from "../../pages/autenticacion/Registrar"
import { IniciarSesion } from "../../pages/autenticacion/IniciarSesion"

export const AuthRoutes = () => {   
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />} >
                <Route path="registrar" element={<Registrar />} />
                <Route path="iniciar-sesion" element={<IniciarSesion />} />
                <Route path="/" element={<Navigate to={'/autenticacion/iniciar-sesion'} />} />
            </Route>
        </Routes>
    )
}
