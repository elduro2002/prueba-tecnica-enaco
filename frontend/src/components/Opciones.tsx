import { Button, Dropdown } from "@nextui-org/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { InsertarMedios } from "./InsertarMedios"

export const Opciones = () => {

    const navigate = useNavigate()
    const [insertarRecurso, setinsertarRecurso] = useState(false)

    const cerrarSesion = () => {
        sessionStorage.removeItem('access_token')
        navigate('/autenticacion')
    }

    return (
        <>
        
        <Dropdown >
            <Dropdown.Button bordered color={'secondary'} >Opciones</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item
                    key="new"
                >
                    <Button
                        light color="primary"
                        onClick={ () => navigate('/usuarios') }
                    >
                        Gestionar usuarios
                    </Button>
                </Dropdown.Item>
                <Dropdown.Item key="copy">
                    <Button
                        light color="primary"
                        onClick={ () => setinsertarRecurso(!insertarRecurso) }
                    >
                        Agregar recurso
                    </Button>
                </Dropdown.Item>
                <Dropdown.Item key="delete" color="error">
                    <Button
                        light color="error"
                        onPress={ cerrarSesion }
                    >
                        Cerrar sesion
                    </Button>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <InsertarMedios
            visible={  insertarRecurso }
            onClose={ (val) => setinsertarRecurso(val) }
        />
        </>
    )
}
