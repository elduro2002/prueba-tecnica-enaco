import { Button, Card, Collapse, Grid, Image, Text } from "@nextui-org/react"
import { useContext } from "react"
import { ContextProps } from "../context"
import { useRecursoPorId } from "../hooks/principal/useRecursoPorId";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from 'react-player'


export const TituloDescripcion = () => {

    const { id } = useParams()
    const { token } = useContext(ContextProps);
    const { recurso } = useRecursoPorId(token!, id!)
    const navigate = useNavigate()

    return (
        <Grid.Container>

            <Grid xs={12} md={1} >
                <Button
                    size="sm"
                    light color="primary" auto
                    onPress={ () => navigate(-1) }
                >
                    Ir a atras
                </Button>
            </Grid>
            <Grid xs={12} md={6} >

                {
                    recurso.data?.tipo === 'video'
                    ? <ReactPlayer url={recurso.data?.url} />
                    : <Image 
                        src={recurso.data?.url}
                        width={600}
                        />
                }
                
            </Grid>

            <Grid xs={12} md={4} >

                <Card
                    css={{ padding: 20 }}
                >
                    <Card.Header >
                        <Text
                            className="text_center"
                            h2
                        >
                            {recurso.data?.nombre}
                        </Text>
                    </Card.Header>
                        <Collapse.Group>
                            <Collapse title="Descripcion">
                                <Text>
                                    { recurso.data?.descripcion }
                                </Text>
                            </Collapse>
                        </Collapse.Group>

                        <Collapse.Group>
                            <Collapse title="Usuario">
                                <Text h4 >
                                { recurso.data?.usuario.usuario }
                                </Text>
                            </Collapse>
                        </Collapse.Group>

                        <Collapse.Group>
                            <Collapse title="Opciones">
                                <Button
                                    color="error"
                                    size="md"
                                >
                                    Eliminar
                                </Button>
                            </Collapse>
                        </Collapse.Group>


                </Card>

            </Grid>

        </Grid.Container>
    )
}
