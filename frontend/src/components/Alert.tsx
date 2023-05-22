import { FC } from "react"
import { Card, Text } from "@nextui-org/react"

interface Props {
    color: string
    mensaje: string
}

export const Alert: FC<Props> = ({ color, mensaje }) => {

    console.log(mensaje)

    return (
        <Card
            css={{ padding: 5 }}
            color={color}
        >
            <Text span color={color} >{mensaje} </Text>
        </Card>
    )
}
