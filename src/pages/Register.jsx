import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import {Link} from  "react-router-dom"
const Register = () => {
    const navigate = useNavigate()
    const currUser = useSelector(state=>state.auth.user)
    const initialData = {
        name:"",
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify(user)
            })
            const data = await res.json()
            
            if(data.success){
                toast.success(data.message)
                setUser(initialData)
                navigate("/login")
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
            toast.error("Registration Failed.")
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
            <h2>Register Page</h2>
            <form className='form' onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter name' name='name' value={user.name} onChange={handleChange} className='form-input' required autoComplete='off'/>

                <input type="email" placeholder='Enter email' name="email" className='form-input' value={user.email} onChange={handleChange} required autoComplete='off'/>

                <input type="password"  placeholder='Enter password' name="password" className='form-input' value={user.password} onChange={handleChange} required autoComplete='off'/>
                <button className='form-btn' type='Submit'>{loading ? 'Loading...':'Register'}</button>
                <p>Already have an account ? <Link to={"/login"}>Login</Link></p>
            </form>

        </div>
    </section>
  )
}

export default Register