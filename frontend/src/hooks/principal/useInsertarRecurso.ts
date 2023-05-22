import { useContext } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { ContextProps } from "../../context"
import { gestorApi } from "../../api/api"
import { toast } from "react-toastify"
import { InsertarRecurso } from "../../types/principal/Recursos"

export const useInsertarRecurso = () => {

    const { register, handleSubmit, reset } = useForm<InsertarRecurso>()
    const { token } = useContext(ContextProps)
    const queryClient = useQueryClient() 

    const onSubmit:SubmitHandler<InsertarRecurso> = (data) => {
        mutation.mutate(data)
        // alert(JSON.stringify(data))
    }

    const mutation = useMutation({
        mutationFn: (data: InsertarRecurso) => {
            return gestorApi.post(`recursos`,{...data} ,{
                headers: {
                    'Authorization': `Bearer ${ token }`
                }
            })
        },
        onSuccess: ( data ) => {
            toast.success('Recurso insertado satisfactiriamente')
            queryClient.invalidateQueries(['recursos'])
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
