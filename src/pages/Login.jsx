import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login } from '../redux/slices/authSlice'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currUser = useSelector(state=>state.auth.user)
    
     const initialData = {
       
        email:"",
        password:"",
    }
    const [loading,setLoading]= useState(false)

    const [user,setUser] = useState(initialData)

    const handleChange = (e) =>{
       const {name,value} = e.target;
       setUser({
        ...user,
        [name]:value
       })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                                   
                },
                credentials:"include",
                body:JSON.stringify(user)
            })
            const data = await res.json()
            
            if(data.success){
                toast.success(data.message)
                dispatch(login(data.user))
                setUser(initialData)
                navigate("/")

            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
            toast.error("Login Failed.")
        }
        finally{
            setLoading(false)
        }
    }

   
    if(currUser){
        return <Navigate to={"/"}/>
    }
  return (

    <section>
        <div className="form-container">
            <h2>Login Page</h2>
            <form className='form' onSubmit={handleSubmit}>
              
                <input type="email" placeholder='Enter email' name="email" className='form-input' value={user.email} onChange={handleChange} required autoComplete='off'/>

                <input type="password"  placeholder='Enter password' name="password" className='form-input' value={user.password} onChange={handleChange} required autoComplete='off'/>
                <button className='form-btn' type='Submit'>{loading ? 'Loading...':'Login'}</button>
                <p>New User ? <Link to={"/register"}>Register Here</Link></p>
            </form>
            
        </div>
    </section>
  )
}

export default Login