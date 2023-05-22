import { useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { RegistroForm, RegistroRespuesta } from "../../types/autenticacion/Registro"
import { useMutation } from "@tanstack/react-query"
import { gestorApi } from "../../api/api"
import { ContextProps } from "../../context"
import { useNavigate } from "react-router-dom"

export const useRegistrarse = () => {
  
    const { autenticar } = useContext(ContextProps);
    const navigate = useNavigate()

    const { register, formState: { errors }, handleSubmit, setError } = useForm<RegistroForm>()

    const onSbubmit: SubmitHandler<RegistroForm> = (data) => {
        mutacion.mutate(data)
    }

    const mutacion = useMutation({
        mutationFn: (data: RegistroForm) => {
            return gestorApi.post<RegistroRespuesta>('auth/register', { ...data })
        },
        onSuccess({data}) {
            sessionStorage.setItem('access_token', data.token)
            autenticar(data)
            navigate('/inicio')
        },
        onError(error: any) {
            setError('root', { type: 'custom', message: error.response.data.message[0] } )
        },
    })

    return {
        register,
        errors,
        handleSubmit,
        onSbubmit,
        setError,
        navigate,
        mutacion
    }
}
