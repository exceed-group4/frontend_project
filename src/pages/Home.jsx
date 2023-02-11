import React, { useEffect, useState } from 'react'
import HomeComponent from '../components/HomeComponent'
import './Home.css'
import Nav from '../components/Nav'
import Swal from 'sweetalert2'

const Home = ({alreadyAlert,setAlreadyAlert}) => {
    const [detail, setDetail] =  useState([])
    // const [errorBadge, setErrorBadge] = useState(null)
    const detectError = (data) =>{
        let errorList = ""
        for (let d in data){
            let errorKeep = ""
            if (data[d].temp_alert){
                errorKeep += "temp "
            }
            if (data[d].flame_alert) {
                errorKeep += "flame "
            }
            if (data[d].humid_alert){
                errorKeep += "humid"
            }
            if (data[d].ultrasonic_alert){
                errorKeep += "ultrasonic "
            }
            if (errorKeep.length!==0 && data[d].connected){
                errorKeep += `warning in box${data[d].safe_id}`
                errorList += errorKeep + '\n'
            }
        }
        if ((!alreadyAlert) && errorList.length!==0){
            Swal.fire({
                title: 'Warning!',
                html: errorList,
                icon: 'warning',
                confirmButtonText: 'Dismiss'
            })
            setAlreadyAlert(true)
        }
        else if (errorList.length===0){
            setAlreadyAlert(false)
        }
    }


    setInterval(useEffect(()=>{
        fetch('http://group4.exceed19.online/safe').then((getData)=>{
            if (getData !== 400){
                getData.json().then((data)=>{setDetail(data)
                console.log(data)
                detectError(data)
                })
            }
        }).catch((error)=> console.error(error))}, [detail])
    , 3000)



    return (
        <div className='home-main'>
            <Nav/>
            {detail.map(p=>(<HomeComponent {...p}/>))}
        </div>
    )
}

export default Home