import { useContext, useState } from 'react';
import { ContextProps } from '../../context';
import { useRecursos } from '../../hooks/principal/useRecursos';
import { Grid, Loading, Text } from '@nextui-org/react';
import { CardRecurso } from '../../components/CardRecurso';
import { Paginacion } from '../../components/Paginacion';


export const Inicio = () => {

    const [limite, setLimite] = useState(10);
    const [pagina, setPagina] = useState(1)
    const { token } = useContext(ContextProps)
    const { todosLosRecursos } = useRecursos(token!, limite, pagina)

    return (
        <>
            {
                todosLosRecursos.isLoading &&
                <Loading
                    loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
                />
            }

            <>
                {
                    (todosLosRecursos.data !== undefined && todosLosRecursos.data?.meta.totalItems <= 0)
                        ? <Text>
                            Aun no tiene recursos
                        </Text>
                        : (
                            <>
                                <Text h3 >Lista de recursos</Text>
                                <Grid.Container gap={5} >

                                    {
                                        todosLosRecursos.data?.items.map(recurso => (
                                            <CardRecurso
                                                key={recurso.id}
                                                recurso={recurso}
                                            />
                                        ))

                                    }
                                </Grid.Container>
                                <Paginacion
                                    paginaInicial={pagina}
                                    cambioPagina={(val) => setPagina(val)}
                                    cantidad={limite}
                                    totalPaginas={todosLosRecursos.data?.meta.totalItems}
                                    cambioCantidad={(val) => setLimite(val)}
                                />
                            </>
                        )
                }
            </>


        </>
    )
}
