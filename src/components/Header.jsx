import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'

const Header = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async() =>{

        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{
                credentials:'include'
            })
            const data = await res.json()
            if(data.success){
                toast.success(data.message)
                dispatch(logout())
                navigate("/login")
            }
        }catch(error){
            console.log(error)
        }

    }
    return (
        <nav className='navbar'>
            <Link to={"/"}>Home</Link>
            {
                user ? <>
                    <button className='form-btn' onClick={handleLogout}>Logout</button>
                </> : <> <Link to={"/register"}>Register</Link>
                    <Link to={"/Login"}>Login</Link></>
            }
        </nav>
    )
}

export default Header