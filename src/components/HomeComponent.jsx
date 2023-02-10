import React from 'react'
import './HomeComponent.css'
import { Link, useNavigate } from 'react-router-dom'


const HomeComponent = ({safe_id,safe_name,safe_pin,connected,safe_system_available,min_temp,max_temp,min_humid,max_humid,flame,temp,humid,ultrasonic}) => {
    const navigate = useNavigate()
    // console.log(temp, humid)
    return (
        <div className='box-card' onClick={() => navigate(`/safeBox/${safe_id}`)}>
            <h2>{safe_name}</h2>
            <h4>Status: {connected? "connected":"not connected"}</h4>
            {temp?<p className='alert-abnormal'>Temperature: Abnormal</p>:<p>Temperature: Normal</p>}
            {humid?<p className='alert-abnormal'>Humidity: Abnormal</p>:<p>Humidity: Normal</p>}
            {flame?<p className='alert-abnormal'>Flame: Abnormal</p>:<p>Flame: Normal</p>}
            {ultrasonic?<p className='alert-abnormal'>Box Location: Moved!</p>:<p>Box Location: Normal</p>}
        </div>
    )
}

export default HomeComponent