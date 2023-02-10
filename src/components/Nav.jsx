import React from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'


const Nav = () => {
    const navigate = useNavigate()
    return (
        <div className='nav-bar'>
            <h1 className='logo' onClick={()=> navigate('')}>
            Safe box system
            </h1>
            <div className='add-button-div'>
            <button className='add-button' onClick={()=> navigate('/addBox')}>add new box</button>
            </div>
        </div>
    )
}

export default Nav