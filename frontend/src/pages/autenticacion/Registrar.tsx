import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react"
import { useRegistrarse } from "../../hooks/autenticacion/useRegistrarse"
import { Alert } from "../../components/Alert"
import { Link as Link2 } from 'react-router-dom'

export const Registrar = () => {

    const { register, handleSubmit, onSbubmit, errors, mutacion } = useRegistrarse()

    return (
        <Grid>
            <Card css={{
                width: '500px',
                paddingTop: 10,
                paddingBottom: 10,

            }} >
                <form onSubmit={handleSubmit(onSbubmit)} >


                    <Card.Header css={{ justifyContent: 'center' }} >
                        <Text
                            h2
                            css={{
                                textGradient: "45deg, $blue600 -20%, $pink600 50%",
                                textAlign: 'center'
                            }}>
                            Registrar Administrador
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
                                type="text"
                                aria-label="nombre"
                                color="primary"
                                size="lg"
                                required
                                placeholder="Nombre completo"
                                {...register('nombre')}
                            // contentLeft={<Mail fill="currentColor" />}
                            />

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
                                errors.root ?
                                    <Alert
                                        color={'error'}
                                        mensaje={errors.root.message!}
                                    />
                                    : null
                            }


                        </div>
                    </Card.Body>

                    <Card.Footer>

                        <div style={{
                            paddingRight: 40,
                            paddingLeft: 40,
                            width: '100%',
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
                            <Link2 to={'/autenticacion/iniciar-sesion'} >
                            ¿Tienes una cuenta? Iniciar sesion
                            </Link2>
                        </Text>
                        </div>
                    </Card.Footer>
                </form>
            </Card>

        </Grid>
    )

}
