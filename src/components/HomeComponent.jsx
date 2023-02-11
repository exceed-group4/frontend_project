import React from 'react'
import './HomeComponent.css'
import { useNavigate } from 'react-router-dom'



const HomeComponent = ({ connected,
    flame_alert,
    humid_alert,
    max_humid,
    max_temp,
    min_humid,
    min_temp,
    safe_id,
    safe_name,
    safe_pin,
    safe_system_available,
    salt,
    temp_alert,
    ultrasonic_alert }) => {
    const navigate = useNavigate()
    return (
        <div className='box-card' onClick={() => connected?navigate(`/safeBox/${safe_id}`):""}>
            <h2>{safe_name}</h2>
            <h4>Status: {connected ? "connected" : "not connected"}</h4>
            {!connected?"":temp_alert ? 
            <p className='alert-abnormal'><span class="material-symbols-outlined">device_thermostat</span> Temperature: Abnormal</p> : 
            <p><span class="material-symbols-outlined">device_thermostat</span> Temperature: Normal</p>}
            {!connected?"":humid_alert ? 
            <p className='alert-abnormal'><span class="material-symbols-outlined">humidity_mid</span> Humid: Abnormal</p> : 
            <p><span class="material-symbols-outlined">humidity_mid</span> Humid: Normal</p>}
            {!connected?"":flame_alert ? 
            <p className='alert-abnormal'><span class="material-symbols-outlined">mode_heat</span> Flame: Abnormal</p> : 
            <p><span class="material-symbols-outlined">mode_heat</span> Flame: Normal</p>}
            {!connected?"":ultrasonic_alert ? 
            <p className='alert-abnormal'><span class="material-symbols-outlined">radar</span> Box Moved!</p> : 
            <p><span class="material-symbols-outlined">radar</span> Box position: Normal</p>}
        </div>
    )


}

export default HomeComponent