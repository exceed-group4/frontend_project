import React from 'react'
import './HomeComponent.css'
import { useNavigate } from 'react-router-dom'



const HomeComponent = ({ connected,
    flame_alert,
    humid,
    humid_alert,
    locked,
    max_humid,
    max_temp,
    min_humid,
    min_temp,
    safe_id,
    safe_name,
    safe_pin,
    safe_system_available,
    salt,
    temp,
    temp_alert,
    ultrasonic_alert,
    }) => {
    // console.log(typeof temp,temp)
    const tempDec1 = parseFloat(temp).toFixed(1)
    const navigate = useNavigate()
    return (
        <div className='box-card' onClick={() => connected?navigate(`/safeBox/${safe_id}`):""}>
            <h2>{safe_name}</h2>
            <h4>Status: {connected ? "connected" : "not connected"}</h4>
            <h4>Locked: {locked ? "locked" : "not locked"}</h4>
            {!connected?"": !safe_system_available? <p><span class="material-symbols-outlined">device_thermostat</span> Temperature : None </p>: temp_alert ? 
            <p className='alert-abnormal'><span class="material-symbols-outlined">device_thermostat</span> Temperature {tempDec1}°C : Abnormal</p> : 
            <p><span class="material-symbols-outlined">device_thermostat</span> Temperature {tempDec1}°C : Normal</p>}
            {!connected?"":!safe_system_available? <p><span class="material-symbols-outlined">humidity_mid</span> Humid : None </p>:humid_alert ? 
            <p className='alert-abnormal'><span class="material-symbols-outlined">humidity_mid</span> Humid {humid}%RH : Abnormal</p> : 
            <p><span class="material-symbols-outlined">humidity_mid</span> Humid {humid}% RH : Normal</p>}
            {!connected?"":!safe_system_available? <p><span class="material-symbols-outlined">mode_heat</span> Flame : None </p>:flame_alert ? 
            <p className='alert-abnormal'><span class="material-symbols-outlined">mode_heat</span> Flame: Abnormal</p> : 
            <p><span class="material-symbols-outlined">mode_heat</span> Flame: Normal</p>}
            {!connected?"":!safe_system_available? <p><span class="material-symbols-outlined">directions_walk</span></p>:ultrasonic_alert ? 
            <p className='alert-abnormal'><span class="material-symbols-outlined">directions_walk</span> Someone near the safe!</p> : 
            <p><span class="material-symbols-outlined">directions_walk</span> Box position: Normal</p>}
        </div>
    )


}

export default HomeComponent