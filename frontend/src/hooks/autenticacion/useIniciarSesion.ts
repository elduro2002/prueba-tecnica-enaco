import { SubmitHandler, useForm } from "react-hook-form"
import { IniciarSesioForm } from "../../types/autenticacion/IniciarSesion"
import { useMutation } from "@tanstack/react-query"
import { RegistroRespuesta } from "../../types/autenticacion/Registro"
import { gestorApi } from "../../api/api"
import { useContext } from "react"
import { ContextProps } from "../../context"
import { useNavigate } from "react-router-dom"


export const useIniciarSesion = () => {
    const { autenticar } = useContext(ContextProps);
    const { register, formState: { errors }, handleSubmit, setError } = useForm<IniciarSesioForm>()
    const navigate = useNavigate()

    const onSbubmit: SubmitHandler<IniciarSesioForm> = (data) => {
        mutacion.mutate(data)
    }

    const mutacion = useMutation({
        mutationFn: (data: IniciarSesioForm) => {
            return gestorApi.post<RegistroRespuesta>('auth/login', { ...data })
        },
        onSuccess({data}) {
            sessionStorage.setItem('access_token', data.token)
            autenticar(data)
            navigate('/inicio')
        },
        onError(error: any) {
            setError('root', { type: 'custom', message: error.response.data.message } )
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
