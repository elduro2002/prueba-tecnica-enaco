import { Outlet } from "react-router-dom"
import { Nabvar } from "../../components/Navbar"

export const PrincipalLayout = () => {
    return (
        <div>
            <Nabvar />
            <div
                style={{
                    padding: '20px 20px',
                }}
            >
                <Outlet />

            </div>
        </div>
    )
}
