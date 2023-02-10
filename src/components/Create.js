import React, { useState } from 'react'
import './Create.css'

const Create = () => {
    const API_URL = 'http://group4.exceed19.online/new_safe';
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [pin, setPin] = useState("");
    const [minTemp, setMinTemp] = useState(null); 
    const [maxTemp, setMaxTemp] = useState(null); 
    const [minHumid, setMinHumid] = useState(null); 
    const [maxHumid, setMaxHumid] = useState(null); 
    const payload = {
        "safe_id": id,
        "safe_name": name,
        "safe_pin": pin,
        "min_temp": minTemp,
        "max_temp": maxTemp,
        "min_humid": minHumid,
        "max_humid": maxHumid
    }
    const createSafe = async () => {
        const response = await fetch(API_URL,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if(data===200){
            console.log(data.detail);
        }
        else if(data===422){
            console.log("Please complete all fields.");
        }
        else{
            console.log(data.detail);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputId = document.querySelector("#safeID");
        const inputName = document.querySelector("#safeName");
        const inputPin = document.querySelector("#safePin");
        const inputMinTemp = document.querySelector("#minTemp");
        const inputMaxTemp = document.querySelector("#maxTemp");
        const inputMinHumid = document.querySelector("#minHumid");
        const inputMaxHumid = document.querySelector("#maxHumid");
        setId(parseInt(inputId.value));
        // console.log(parseInt(inputId.value));
        setName(inputName.value);
        setPin(inputPin.value);
        setMinTemp(parseInt(inputMinTemp.value));
        setMaxTemp(parseInt(inputMaxTemp.value));
        setMinHumid(parseInt(inputMinHumid.value));
        setMaxHumid(parseInt(inputMaxHumid.value));
        if(payload.safe_id!==null && payload.safe_name!=="" && payload.safe_pin!=="" && payload.min_temp!==null && payload.max_temp!==null && payload.min_humid!==null && payload.max_humid!==null){
            createSafe();
        }
        else if(payload.safe_pin.length!==6){
            alert("Enter PIN 6 digits.");
        }
        else{
            alert("Please complete all fields");
        }
    }
    return (
        <div className="wrapper">
            <h1 id="addSafe">Add Safe</h1>
            <form>
                <div className="inputDiv">
                    <label htmlFor="safeId">Safe Id</label>
                    <input type="number" name="safeId" id="safeID" value={1} className="toRight"/>
                </div>
                <div className="inputDiv">
                    <label htmlFor="safeName">Safe name</label>
                    <input type="text" name="safeName" id="safeName" className="toRight"/>
                </div>
                <div className="inputDiv">
                    <label htmlFor="safePin">Safe PIN</label>
                    <input type="password" name="safePin" id="safePin" className="toRight"/>
                </div>
                <div className="inputDiv">
                    <label htmlFor="temp">Temperature range (in Celcius)</label>
                    <label className='inlineText'>min</label>
                    <input type="number" name="temp" id="minTemp" value={20} className="inlineInput"/>
                    <label className='inlineText'>max</label>
                    <input type="number" name="temp" id="maxTemp" value={40} className="inlineInput"/>
                </div>
                <div className="inputDiv">
                    <label htmlFor="humid">Humidity range (in % RH)</label>
                    <label className='inlineText'>min</label>
                    <input type="number" name="humid" id="minHumid" value={30} className="inlineInput"/>
                    <label className='inlineText'>max</label>
                    <input type="number" name="humid" id="maxHumid" value={60} className="inlineInput"/>
                </div>
            </form>
            <button type="submit" onClick={handleSubmit} id="submitAdd">Add</button>
        </div>
    )
}

export default Create;