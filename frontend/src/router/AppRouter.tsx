import { Route, Routes, } from "react-router-dom"
import { AuthRoutes } from "./autenticacion/AuthRoutes"
import { PrincipalRoutes } from "./principal/PrincipalRoutes"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/autenticacion/*" element={ <AuthRoutes/> } />
        <Route path="/*" element={ <PrincipalRoutes/> } />
    </Routes>
  )
}
