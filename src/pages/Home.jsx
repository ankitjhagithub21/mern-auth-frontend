import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { login, setLoading } from '../redux/slices/authSlice'
import axios from "axios"
axios.defaults.withCredentials = true
const Home = () => {
    const {user,loading} = useSelector(state => state.auth)
    
    const dispatch = useDispatch()
    const getUser = async () => {
        dispatch(setLoading(true))
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user`)

            if (res.data.success) {
                dispatch(login(res.data.user))
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setLoading(false))
        }

    }

    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [])
    if(loading){
        return <p>Loading...</p>
    }

    return (
        <section>

            {

                user ? <h2>Welcome {user.name}</h2> : <h2>User not found.</h2>
            }

        </section>
    )
}

export default Home