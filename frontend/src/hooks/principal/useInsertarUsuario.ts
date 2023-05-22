import { useContext } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { ContextProps } from "../../context"
import { gestorApi } from "../../api/api"
import { toast } from "react-toastify"

interface Insertar{
    usuario: string
}

export const useInsertarUsuario = () => {

    const { register, handleSubmit, reset } = useForm<Insertar>()
    const { token } = useContext(ContextProps)
    const queryClient = useQueryClient() 

    const onSubmit:SubmitHandler<Insertar> = (data) => {
        mutation.mutate(data)
    }

    const mutation = useMutation({
        mutationFn: (data: Insertar) => {
            return gestorApi.post(`usuarios`,{...data} ,{
                headers: {
                    'Authorization': `Bearer ${ token }`
                }
            })
        },
        onSuccess: ( data ) => {
            toast.success('Usuario insertado satisfactiriamente')
            queryClient.invalidateQueries(['usuarios'])
            reset()
            console.log(data)
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
