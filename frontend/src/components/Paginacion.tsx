import { Grid, Pagination } from "@nextui-org/react"
import { FC } from "react";

interface Props {
    paginaInicial?: number;
    totalPaginas?: number;
    cambioPagina: (val: number) => void
    cantidad: number
    cambioCantidad: (val: number) => void
}

const numeroPaginas = [10, 20, 50, 100]

// Esta es la logica para la paginacion.
export const Paginacion: FC<Props> = ({ cambioPagina, paginaInicial, totalPaginas = 10, cambioCantidad, cantidad }) => {

    const cantidadOnChange = (value: string) => {
        cambioCantidad(+value)
    }

    return (
        <Grid.Container gap={2} >
            <Grid xs={12} css={{
                display: 'flex',
                gap: 20
            }} >
                <Pagination
                    color={'primary'}
                    total={totalPaginas}
                    initialPage={paginaInicial}
                    onChange={
                        (page: number) => cambioPagina(page)
                    }
                    size="xl"
                />

                <select 
                    name="" id=""
                    className="select_paginas"
                    onChange={({ target }) => cantidadOnChange(target.value) }
                    defaultValue={cantidad}
                    >
                    {
                        numeroPaginas.map(numero => (
                            <option value={numero}>
                                { numero }
                            </option>
                        ))
                    }
                </select>
            </Grid>
        </Grid.Container>
    )
}