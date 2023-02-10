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
            {!connected?"":temp_alert ? <p className='alert-abnormal'>Temperature: Abnormal</p> : <p>Temperature: Normal</p>}
            {!connected?"":humid_alert ? <p className='alert-abnormal'>Humid: Abnormal</p> : <p>Humid: Normal</p>}
            {!connected?"":flame_alert ? <p className='alert-abnormal'>Flame: Abnormal</p> : <p>Flame: Normal</p>}
            {!connected?"":ultrasonic_alert ? <p className='alert-abnormal'>Box Moved!</p> : <p>Flame: Normal</p>}
        </div>
    )


}

export default HomeComponent