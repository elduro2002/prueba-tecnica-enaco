import { FC } from "react"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { Item } from "../types/principal/Recursos"
import imagen from '../assets/imagen.jpeg'
import video from '../assets/video.png'
import { useNavigate } from "react-router-dom"

interface Props {
    recurso: Item
}

export const CardRecurso:FC<Props> = ({ recurso }) => {

    const navigate = useNavigate()

    const cardLink = () => {
        navigate(`/recurso/${ recurso.id }`)
    }

    return (
        <Grid xs={12} sm={3}>
            <Card
                isPressable
                isHoverable
                onClick={cardLink}
            >
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        src={ (recurso.tipo === 'imagen' ) ? imagen : video }
                        objectFit="cover"
                        width="100%"
                        height={200}
                        alt={recurso.nombre} />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Row wrap="wrap" justify="space-between" align="center">
                        <Text h4>{recurso.nombre}</Text>
                        <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                            {recurso.usuario.usuario}
                        </Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
