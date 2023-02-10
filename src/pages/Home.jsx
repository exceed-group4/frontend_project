import React, { useEffect, useState } from 'react'
import HomeComponent from '../components/HomeComponent'
import './Home.css'
import Nav from '../components/Nav'
import Swal from 'sweetalert2'

const Home = ({alreadyAlert,setAlreadyAlert}) => {
    const [detail, setDetail] =  useState([])
    // const [errorBadge, setErrorBadge] = useState(null)
    const detectError = (data) =>{
        let errorList = []
        for (let d in data){
            if (data[d].temp_alert){
                errorList.push("temp_alert")
            }
            if (data[d].flame_alert) {
                errorList.push("flame_alert")
            }
            if (data[d].humid_alert){
                errorList.push("humid_alert")
            }
            if (data[d].ultrasonic_alert){
                errorList.push("ultrasonic_alert")
            }
        }
        // console.log(errorList)
        console.log(errorList,alreadyAlert)
        if ((!alreadyAlert) && errorList.length!==0){
            Swal.fire({
                title: 'Error!',
                text: errorList,
                icon: 'error',
                confirmButtonText: 'Fixed'
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
                // console.log(data)
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