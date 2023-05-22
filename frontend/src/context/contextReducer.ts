import { RegistroRespuesta } from "../types/autenticacion/Registro";
import { ContextState } from "./ContextProvider";

type EntriesActionType = 
   | { type: 'autenticacion', payload: RegistroRespuesta }


export const contextReducer = ( state: ContextState, action: EntriesActionType ): ContextState => {

   switch (action.type) {

    case 'autenticacion':

    return {
        ...state,
        ...action.payload,
        estatus: 'autenticado'
    }


       default:
          return state;
   }

}