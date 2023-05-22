import { Button, Card, Input, Text } from "@nextui-org/react"
import { useInsertarUsuario } from "../hooks/principal/useInsertarUsuario"

export const AgregarUsuario = () => {

    const { handleSubmit, onSubmit, register } = useInsertarUsuario()
    return (
        <Card>
            <Card.Header>
                <Text
                    h4
                    css={{
                        textAlign: 'center'
                    }}>
                    Insertar usuario
                </Text>
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit(onSubmit)} >
                <div
                    style={{
                        paddingRight: 20,
                        paddingLeft: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 30
                    }}
                >
                    <Input
                        type="text"
                        clearable
                        bordered
                        fullWidth
                        required
                        aria-label="user"
                        color="primary"
                        size="lg"
                        placeholder="usuario"
                        { ...register('usuario') }
                    />

                    <Button
                        color="primary"
                        type="submit"
                    >
                        Insertar

                    </Button>
                </div>
                </form>
            </Card.Body>
        </Card>
    )
}
