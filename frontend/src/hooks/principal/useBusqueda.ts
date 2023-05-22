import { useQuery } from "@tanstack/react-query";
import { gestorApi } from "../../api/api"
import { pick } from 'underscore'
import { ResultadosBusqueda } from "../../types/principal/Busqueda";

const peticion = async( token: string, nombre?: string, tipo?: string, usuarioId?: string ) => {
    const parametros = {
        nombre,
        tipo,
        usuarioId
    }

    const { data } = await gestorApi.get<ResultadosBusqueda>('recursos/b/busqueda', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: pick(parametros, (value) => { return !!value })
    })

    console.log(data)
    return data;
}


export const useBusqueda = ( token: string, nombre?: string, tipo?: string, usuarioId?: string ) => {
    
    const busqueda = useQuery(
        ['busqueda', token, nombre, tipo, usuarioId],
        () => peticion(token, nombre, tipo, usuarioId),
        {
            enabled: token !== undefined
        }
    )

    return {
        busqueda
    }
}
