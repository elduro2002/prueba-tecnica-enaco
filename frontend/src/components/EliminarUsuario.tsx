import { FC } from "react";
import { Button, Modal, Row, Text, Textarea } from "@nextui-org/react"
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import { useEliminarUsuario } from "../hooks/principal/useEliminarUsuario";


interface Props {
    visible: boolean;
    onClose: (val: boolean) => void
}

export const EliminarUsuario: FC<Props> = ({ visible, onClose }) => {

    const closeHandler = () => {
        onClose(!visible)
    }
    const location = useLocation();
    const { id } = queryString.parse(location.search)

    const { register, handleSubmit, onSubmit } = useEliminarUsuario(id?.toString())

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Desea eliminar este usuario?
                </Text>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Modal.Body>
                    <Textarea
                        bordered
                        color="secondary"
                        required
                        { ...register('motivo') }
                        labelPlaceholder="Ingrese el motivo por el cual quiere eliminar este usuario"
                        css={{ marginTop: '20px' }}
                    />

                    <Row justify="space-between">

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat 
                        color="default" 
                        onPress={closeHandler}
                        >
                        Cancelar
                    </Button>
                    <Button
                        auto
                        onPress={closeHandler}
                        color="error"
                        type="submit"
                    >
                        Eliminar
                    </Button>
                </Modal.Footer>

            </form>
        </Modal>
    )
}
