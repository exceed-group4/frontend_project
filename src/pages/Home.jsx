import React, { useEffect, useState } from 'react'
import HomeComponent from '../components/HomeComponent'
import './Home.css'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const Home = () => {
    const [detail, setDetail] =  useState([])

    useEffect(() => {
        fetch('http://group4.exceed19.online/safe').then((getData)=>{
            if (getData !== 400){
                getData.json().then((data)=>{setDetail(data)})
            }
        }).catch((error)=> console.error(error))
    }, [])


    return (
        <div className='home-main'>
            <Nav/>
            {detail.map(p=>(<HomeComponent {...p}/>))}
        </div>
    )
}

export default Home