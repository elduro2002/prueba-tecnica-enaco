import { Button, } from "@nextui-org/react"
import { useContext, useState } from "react"
import { ContextProps } from "../context"
import { useUsuarios } from "../hooks/principal/useUsuarios"
import { EliminarUsuario } from "./EliminarUsuario"
import { useNavigate } from "react-router-dom"

export const TablaUsuarios = () => {


    const { token } = useContext(ContextProps)
    const { todosLosUsuarios } = useUsuarios(token!)
    const [eliminar, setEliminar] = useState(false)
    const navigate = useNavigate()


    const eliminarUsuario = (id: string) => {
        navigate(`?id=${ id }`)
        setEliminar(!eliminar)
    }   


    return (
        <>
            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todosLosUsuarios.data?.usuarios.map(usuario => (
                            <tr key={usuario.id} className="table_usuarios" >
                                <td>{ usuario.id }</td>
                                <td>{ usuario.usuario }</td>
                                <td>

                                    <Button
                                        color="error"
                                        onClick={ () => eliminarUsuario(usuario.id) }
                                    >
                                        Eliminar

                                    </Button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>

            </table>
            
            <EliminarUsuario
                visible={ eliminar }
                onClose={ (val) => setEliminar(val) }
            />

        </>
    )
}
