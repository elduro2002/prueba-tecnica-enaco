import { useContext } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { ContextProps } from "../../context"
import { gestorApi } from "../../api/api"
import { toast } from "react-toastify"

interface Eliminar{
    motivo: string
}

export const useEliminarUsuario = (id?: string) => {

    const { register, handleSubmit, reset } = useForm<Eliminar>()
    const { token } = useContext(ContextProps)
    const queryClient = useQueryClient() 

    const onSubmit:SubmitHandler<Eliminar> = (data) => {
        mutation.mutate(data)
    }

    const mutation = useMutation({
        mutationFn: (data: Eliminar) => {
            return gestorApi.delete(`usuarios/${ id }`, {
                headers: {
                    'Authorization': `Bearer ${ token }`
                },
                data: {
                    ...data
                }
            })
        },
        onSuccess: ( data ) => {
            toast.success(data.data.msg)
            queryClient.invalidateQueries(['usuarios'])
            reset()
        },
        onError:(error) => {
            console.log(error)
        }
        

    })

    return {
        register,
        handleSubmit,
        onSubmit,
        mutation
    }
}
