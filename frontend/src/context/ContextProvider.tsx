import { FC, useReducer } from "react"
import { ContextProps } from "./Context"
import { contextReducer } from "."
import {  RegistroRespuesta } from "../types/autenticacion/Registro"

interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface ContextState {
    nombre:     string | undefined;
    usuario:    string | undefined
    token:      string | undefined
    estatus:    'autenticado' | 'no-autenticado'
}

const ContexInitialState: ContextState = {
    nombre:     undefined,
    usuario:    undefined,
    token:      undefined,
    estatus:    'no-autenticado'
}

export const ContextProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(contextReducer, ContexInitialState);

    const autenticar = (data: RegistroRespuesta) => {
        dispatch({ type: 'autenticacion', payload: data })
    }

    return (
        <ContextProps.Provider
            value={{
                ...state,
                autenticar
            }}
        >
            { children }
        </ContextProps.Provider>
    )
}
