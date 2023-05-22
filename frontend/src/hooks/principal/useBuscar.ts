import queryString from "query-string";
import { useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useBusqueda } from "./useBusqueda";
import { ContextProps } from "../../context";
import { SubmitHandler, useForm } from "react-hook-form";
import { pick } from "underscore";


interface Params {
    nombre: string,
    tipo: string,
    usuarioId: string
}


export const useBuscar = () => {

    const { token } = useContext(ContextProps);
    const location = useLocation()
    const { nombre = undefined, tipo = undefined, usuarioId = undefined } = queryString.parse(location.search);
    const { busqueda } = useBusqueda(token!, nombre?.toString(), tipo?.toString(), usuarioId?.toString())
    const [searchParams, setSearchParams] = useSearchParams({});
    const { register, handleSubmit } = useForm<Params>()


    const onSubmit:SubmitHandler<Params> = (data) => {
        setSearchParams(pick(data, (val) => { return !!val }) )
    }


    return {
        register,
        handleSubmit,
        onSubmit,
        nombre,
        tipo,
        usuarioId,
        busqueda
    }
}
