import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'

            }}

        >
            <Outlet />
        </div>
    )
}
