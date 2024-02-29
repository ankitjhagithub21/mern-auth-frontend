import React from 'react'
import {BrowserRouter,Routes,Route}  from "react-router-dom"
import Home from "./pages/Home"
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import {Toaster} from "react-hot-toast"
import "./App.css"


const App = () => {
 
  return (
    <BrowserRouter>
    <Toaster/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App