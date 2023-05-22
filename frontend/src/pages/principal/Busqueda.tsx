import { useContext } from "react"
import { Button, Card, Grid, Input, Text } from "@nextui-org/react";
import { ContextProps } from "../../context"
import { useUsuarios } from "../../hooks/principal/useUsuarios";
import { CardRecurso } from "../../components/CardRecurso";
import { useBuscar } from "../../hooks/principal/useBuscar";


const tipoSelect = [
    'video',
    'imagen'
]

export const Busqueda = () => {

    const { token } = useContext(ContextProps);
    const { todosLosUsuarios } = useUsuarios(token!)

    const { register, handleSubmit, onSubmit, nombre, tipo, usuarioId, busqueda } = useBuscar()

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} >
                <Card>
                    <Grid.Container>

                        <Grid xs={12} md={3} css={{ padding: 20 }}  >

                            <div>
                                <Input
                                    status="primary"
                                    placeholder="Buscar"
                                    size="lg"
                                    width="300px"
                                    {...register('nombre')}
                                />
                            </div>
                        </Grid>

                        <Grid xs={6} md={3} >
                            <div className="selec_cont" >
                                <select
                                    className="select_busqueda"
                                    {...register('tipo')}
                                    id=""
                                    placeholder="Seleccione un tipo"
                                >
                                    <option selected disabled value={''}> Seleccionar </option>
                                    {
                                        tipoSelect.map(tip => (
                                            <option
                                                key={tip}
                                                value={tip}>
                                                {tip}
                                            </option>
                                        ))
                                    }

                                </select>

                            </div>

                        </Grid>

                        <Grid xs={6} md={3} >
                            <div className="selec_cont" >
                                <select
                                    className="select_busqueda"
                                    id=""
                                    {...register('usuarioId')}
                                >
                                    <option disabled selected value={''} > Seleccionar </option>
                                    {
                                        todosLosUsuarios.data?.usuarios.map(tip => (
                                            <option
                                                key={tip.id}
                                                value={tip.id}>
                                                {tip.usuario}
                                            </option>
                                        ))
                                    }

                                </select>

                            </div>

                        </Grid>

                        <Grid xs={6} md={3} >
                            <div className="selec_cont" >
                                <Button
                                    bordered
                                    color="success"
                                    size="md"
                                    type="submit"
                                >
                                    Buscar
                                </Button>

                                <Button
                                    size="xs"
                                    light 
                                    color="error" 
                                    auto
                                    type="reset"
                                >
                                    Borrar filtros
                                </Button>

                            </div>
                        </Grid>

                    </Grid.Container>
                </Card>

            </form>

            {
                // Aqui estoy haciendo una condicion para que si no hay datos insertados en la busqueda, aparezca una alerta
                (!nombre
                    && !tipo
                    && !usuarioId
                ) ?
                    (
                        <Text h4 >
                            Para buscar, dirijase a la barra de busqueda, elija cualquier parametro
                        </Text>
                    )
                    : (
                        <>
                            {
                                (busqueda.data !== undefined && busqueda.data.recursosFiltrados.length < 1)
                                    ? (
                                        <>
                                            <Text h4 color="error" >No se encontraron recursos</Text>

                                        </>
                                    ) : (
                                        <Grid.Container gap={5} >
                                            {
                                                busqueda.data?.recursosFiltrados.map(reecurso => (
                                                    <CardRecurso
                                                        recurso={reecurso}
                                                    />
                                                ))
                                            }


                                        </Grid.Container>

                                    )
                            }
                        </>
                    )
            }


        </>
    )
}
