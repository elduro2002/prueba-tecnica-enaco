import { Navigate, Route, Routes } from "react-router-dom"
import { PrincipalLayout } from "../../layouts/principal/PrincipalLayout"
import { Inicio } from "../../pages/principal/Inicio"
import { DescripcionRecurso } from "../../pages/principal/DescripcionRecurso"
import { Usuarios } from "../../pages/principal/Usuarios"
import { Busqueda } from "../../pages/principal/Busqueda"


export const PrincipalRoutes = () => {
  return (
    <Routes>
        <Route path="/"  element={<PrincipalLayout/>} >
            <Route path="/inicio" element={ <Inicio/> } />
            <Route path="recurso/:id" element={ <DescripcionRecurso/> } />
            <Route path="usuarios" element={ <Usuarios/> } />
            <Route path="busqueda" element={ <Busqueda/> } />
            <Route path="/" element={<Navigate to={'/inicio'} />} />
        </Route>
    </Routes>
  )
}
