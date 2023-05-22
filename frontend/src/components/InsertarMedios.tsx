import { FC, useContext } from "react";
import { Button, Input, Modal, Text, Textarea } from "@nextui-org/react";
import { ContextProps } from "../context";
import { useUsuarios } from "../hooks/principal/useUsuarios";
import { useInsertarRecurso } from "../hooks/principal/useInsertarRecurso";

interface Props {
    visible: boolean;
    onClose: (val: boolean) => void;
}

const tipo = ['imagen', 'video'];

export const InsertarMedios: FC<Props> = ({ visible, onClose }) => {

    const { token } = useContext(ContextProps);
    const { todosLosUsuarios } = useUsuarios(token!);

    const { register, handleSubmit, onSubmit } = useInsertarRecurso()

    const closeHandler = () => {
        onClose(!visible)
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <form onSubmit={handleSubmit(onSubmit)} >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Insertar Recurso
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        required
                        type="text"
                        color="primary"
                        size="lg"
                        placeholder="Nombre"
                        {...register('nombre')}

                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        required
                        type="url"
                        color="primary"
                        size="lg"
                        placeholder="url"
                        {...register('url')}
                    />

                    <Textarea
                        color="primary"
                        bordered
                        required
                        label="Descripcion"
                        placeholder="Descripcion"
                        {...register('descripcion')}
                    />

                    <select
                        className="select_insertar_usuario"
                        {...register('tipo')}
                        required
                    >

                        <option disabled selected >Seleccionar</option>
                        {
                            tipo.map(tip => (
                                <option
                                    key={tip}
                                    value={tip}
                                >
                                    {tip}
                                </option>
                            ))
                        }
                    </select>

                    <select
                        className="select_insertar_usuario"
                        {...register('usuarioId')}
                        required
                    >
                        <option disabled selected >Seleccionar</option>

                        {
                            todosLosUsuarios.data?.usuarios.map(usuario => (
                                <option
                                    key={usuario.id}
                                    value={usuario.id}
                                >
                                    {usuario.usuario}
                                </option>
                            ))
                        }
                    </select>

                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button 
                        auto 
                        type="submit"
                    >
                        Sign in
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
