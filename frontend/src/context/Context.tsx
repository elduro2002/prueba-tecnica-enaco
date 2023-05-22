import { createContext } from 'react';
import { RegistroRespuesta } from '../types/autenticacion/Registro';

interface ContextProps {
    // entries: Entry[];
    nombre:     string | undefined;
    usuario:    string | undefined
    token:      string | undefined
    estatus:    'autenticado' | 'no-autenticado'

    // Methods
    autenticar: ( data: RegistroRespuesta ) => void
}


export const ContextProps = createContext({} as ContextProps );