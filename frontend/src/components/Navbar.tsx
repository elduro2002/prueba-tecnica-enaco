import { Button, Spacer, useTheme } from "@nextui-org/react"
import {  Text } from "@nextui-org/react";
import {  useNavigate } from "react-router-dom";
import { Opciones } from "./Opciones";


export const Nabvar = () => {
    const navigate = useNavigate()
    const { theme } = useTheme()

    return (
        <div
            style={{
                backgroundColor: theme?.colors.gray100.value,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '70px',
                padding: 10
            }}
        >

            <div
                style={{
                    display: "flex",
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
            >


                <Text h2>Gestor de recursos</Text>
            </div>


            <Spacer css={{ flex: 1 }} />

            <div style={{ paddingRight: 10 }} >
                <Button
                    bordered
                    color="secondary"
                    onPress={ () => navigate('/busqueda') }
                >
                    Buscar recursos
                </Button>
            </div>
            <Opciones />

        </div>
    )
}
