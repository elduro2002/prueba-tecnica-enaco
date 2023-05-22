import { useQuery } from "@tanstack/react-query"
import { gestorApi } from "../../api/api"
import { Usuarios } from "../../types/principal/Usuarios"


const peticion = async ( token: string ) => {

    const { data } = await gestorApi.get<Usuarios>('usuarios', {
        headers: {
            'Authorization': `Bearer ${ token }`
        }
    })

    return data
}   


export const useUsuarios = (token: string) => {

    const todosLosUsuarios = useQuery(
        ['usuarios', token],
        () => peticion(token)
    )

    return {
        todosLosUsuarios
    }
}
