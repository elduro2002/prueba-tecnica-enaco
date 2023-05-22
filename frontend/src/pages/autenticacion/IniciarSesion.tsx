import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react"
import { useIniciarSesion } from "../../hooks/autenticacion/useIniciarSesion"
import { Link } from "react-router-dom"
import { Alert } from "../../components/Alert"

export const IniciarSesion = () => {

    const { register, handleSubmit, onSbubmit, errors, mutacion } = useIniciarSesion()

    return (
        <Grid>
            <Card css={{
                width: '500px',

            }} >
                <form onSubmit={handleSubmit(onSbubmit)} >


                    <Card.Header css={{ justifyContent: 'center' }} >
                        <Text
                            h1
                            css={{
                                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                                textAlign: 'center'
                            }}>
                            Inciar sesion
                        </Text>
                    </Card.Header>
                    <Card.Body>
                        <div
                            style={{
                                paddingRight: 40,
                                paddingLeft: 40,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 30
                            }} >


                            <Input
                                clearable
                                bordered
                                fullWidth
                                required
                                type="text"
                                aria-label="user"
                                color="primary"
                                size="lg"
                                placeholder="usuario"
                                {...register('usuario')}
                            />

                            <Input
                                clearable
                                bordered
                                fullWidth
                                required
                                type="password"
                                color="primary"
                                size="lg"
                                placeholder="contraseña"
                                {...register('contrasena')}
                            />

                            {
                                errors.root
                                    ? <Alert color="error" mensaje={errors.root.message!} />
                                    : null
                            }
                        </div>
                    </Card.Body>


                    <Card.Footer>

                        <div style={{
                            width: '100%',
                            paddingRight: 40,
                            paddingLeft: 40,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 5
                            
                        }} >

                            <Button
                                color="gradient"
                                type="submit"
                            >
                                {
                                    mutacion.isLoading
                                        ? <Loading type="points-opacity" color="currentColor" size="lg" />
                                        : 'Registrarse'
                                }

                            </Button>

                            <Text>
                                <Link to={'/autenticacion/registrar'} >
                                    ¿No tienes una cuenta? Registrate
                                </Link>
                            </Text>

                        </div>
                    </Card.Footer>
                </form>
            </Card>

        </Grid>
    )
}
