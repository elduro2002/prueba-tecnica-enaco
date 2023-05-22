import { useQuery } from "@tanstack/react-query";
import { gestorApi } from "../../api/api"
import { Item } from "../../types/principal/Recursos"

const peticion = async (token: string, id: string) => {

    const { data } = await gestorApi.get<Item>(`recursos/${ id }`, {
        headers: {
            'Authorization': `Bearer ${ token }`
        }
    })

    return data;
}


export const useRecursoPorId = ( token: string, id: string ) => {

    const recurso = useQuery(
        ['recurso_id', token, id],
        () => peticion(token, id),
        {
            enabled: id !== undefined
        }
    )

    return {
        recurso
    }

}