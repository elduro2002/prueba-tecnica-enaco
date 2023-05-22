import { useQuery } from "@tanstack/react-query"
import { gestorApi } from "../../api/api"
import { Recursos } from "../../types/principal/Recursos"

const peticion = async ( token: string, limite?: number, pagina?: number ) => {

    const { data } = await gestorApi.get<Recursos>('recursos', {
        headers: {
            'Authorization': `Bearer ${ token }`
        },
        params: {
            limit: limite,
            page: pagina
        }
    })

    return data
}

export const useRecursos = (token: string, limite?: number, pagina?: number) => {

    const todosLosRecursos = useQuery(
        ['recursos', token, limite, pagina],
        () => peticion(token, limite, pagina)
    )

    return {
        todosLosRecursos
    }

}


