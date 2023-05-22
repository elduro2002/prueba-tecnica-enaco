import { useContext, useEffect } from 'react'
import { AppRouter } from './router/AppRouter'
import { ContextProps } from './context'
import { useMutation } from '@tanstack/react-query'
import { gestorApi } from './api/api'
import { RefrescarRespuesta } from './types/autenticacion/Registro'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { autenticar } = useContext(ContextProps)
  const navigate = useNavigate()

  // Esta peticion es utlizada para mantener la sesion una vez se recargue la pagina
  const token = sessionStorage.getItem('access_token') || ''

    const usuario = useMutation({
      mutationFn: () => {
        return gestorApi.get<RefrescarRespuesta>('auth/usuario', {
          headers: {
            'Authorization': `Bearer ${ token }`
          }
        })
      },
      onSuccess: (data) => {
        autenticar({ ...data.data, token })
      },
      onError: () => {
        navigate('/autenticacion')
      }
    })

  useEffect(() => {

    usuario.mutate()

  }, [])
  

  return (
    <>
      <AppRouter/>
      <ToastContainer/>
    
    </>
  )
}

export default App
