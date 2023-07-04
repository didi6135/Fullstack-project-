import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



export const Navbar = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/home')
        }
    })
    
    return <>
    <h3>Home</h3>

    </>
}