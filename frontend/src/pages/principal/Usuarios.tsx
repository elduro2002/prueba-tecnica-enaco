import { Grid, Text } from "@nextui-org/react"
import { TablaUsuarios } from "../../components/TablaUsuarios"
import { AgregarUsuario } from "../../components/AgregarUsuario"

export const Usuarios = () => {

    return (
        <>
            <Text h2 >
                Listado de usuarios
            </Text>
            <Grid.Container>
                <Grid xs={12} md={6}  >
                    <TablaUsuarios />

                </Grid>

                <Grid xs={12} md={3} >
                    <AgregarUsuario/>
                </Grid>

            </Grid.Container>

        </>
    )
}
