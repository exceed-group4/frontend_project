import { React, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './BoxSetting.css'
import './toggleButton.css'

const BoxSetting = () => {
    const { id } = useParams();
    const API_URL = 'http://group4.exceed19.online/safe_update'
    const API_URL2 = 'http://group4.exceed19.online/password'
    const API_URL3 = 'http://group4.exceed19.online/status_pin/' + id;
    const API_URL4 = 'http://group4.exceed19.online/delay/' + id;
    const [pin2, setPin2] = useState("");
    const [lock, setLock] = useState(true);
    const [enable, setEnable] = useState(true);
    const [pinCount, setPinCount] = useState(0);
    const [insertPin, setInsertPin] = useState(null);
    setInterval(() => {
        fetch(API_URL3)
        .then((response)=>response.json())
        .then((data)=>{
            const d = new Date(data.time_next_pin);
            console.log(d.toLocaleString('en-GB'));
            if(data.can_pin===false){
                document.querySelector("#retry").style.display = "block";
                document.querySelector("#retry").innerHTML = `You can submit PIN again at ${d.toLocaleString('en-GB')}`;
                document.querySelector("#pin-submit").disabled = true;
            }
            if(data.can_pin===true && insertPin===false){
                document.querySelector("#pin-submit").disabled = false;
                setPinCount(-1);
                setInsertPin(true);
                document.querySelector("#retry").style.display = "none";
            }
            setInsertPin(data.can_pin);
        })
    }, 3000);
    const handleLock = () => {
        setLock(!lock);
    }
    const handleEnable = () => {
        setEnable(!enable);
    }
    const tryPinCount = async () => {
        if (pinCount + 1 === 3) {
            alert("You've entered incorrect PIN 3 times. Wait 10 minutes to try again");
            document.querySelector("#pin-submit").disabled = true;
            setInsertPin(false);
            const response = await fetch(API_URL4);
            const data = await response.json();
            console.log(data);
            //refresh will reset everything
        }
        setPinCount(pinCount + 1);
    }
    const payload = {
        "safe_id": id,
        "safe_pin": pin2,
        "lock": lock,
        "safe_system_available": enable
    }
    const payload2 = {
        "safe_id": parseInt(id),
        "safe_pin": pin2
    }
    const checkPin = async () => {
        const response = await fetch(API_URL2, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload2)
        });
        const data = await response.json();
        console.log(response);
        if (response.status === 200) {
            console.log(data);
            alert(data.detail);
            document.querySelector(".later").style.display = "block";
        }
        else {
            alert(data.detail);
            tryPinCount();
            console.log(data);
        }
    }
    const updateInfo = async () => {
        const response = await fetch(API_URL, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log(data.detail);
            alert(data.detail);
        }
        else {
            alert(data.detail);
            tryPinCount();
            console.log(data.detail);
        }
    }
    const handleSubmitSetting = (e) => {
        e.preventDefault();
        if (payload.safe_pin.length === 6) {
            updateInfo();
        }
        else {
            alert("Enter correct PIN.");
            tryPinCount();
        }
    }
    const handleSubmitPin = (e) => {
        e.preventDefault();
        if (payload.safe_pin.length === 6) {
            checkPin();
        }
        else {
            alert("Enter correct PIN.");
            tryPinCount();
        }
    }
    const requestOTP = async() =>{
        await fetch(`http://group4.exceed19.online/send_otp/${id}`)
        .then((getData)=>{
            console.log(566);
            console.log(getData.json());
            navigate(`/resetPIN/${id}`);
        })
        .catch((error)=> console.error(error))
    }
    const navigate = useNavigate()
    const checkLockEnable = () =>{
        if (lock){
            navigate('/')
        }
    }
    return (
        <div className="wrapper2">
            <div className='back-home-div'>
                <a onClick={()=>checkLockEnable()}><span className="material-symbols-outlined" id='back-home'>arrow_back</span></a>
            </div>
            <div className="biggy-setting">
                <p className="texto">Safe Box System</p>
                <p id="safeSafe">Safe Id: {id}</p>
                <div className="pin-wrapper">
                    <p id="retry" style={{display: "none"}}></p>
                    <div>
                        <p>PIN:</p>
                        <input id="pin" type="password" name="pin" onChange={(e) => setPin2(e.target.value)} />
                        <button id="pin-submit" type="submit" onClick={(e) => handleSubmitPin(e)}>Submit</button>
                    </div>
                    <a onClick={() => {
                        requestOTP(); 
                    }} id="resetPin" >Reset PIN</a>
                </div>
                <div className="later">
                    <div className="button-wrapper">
                        <div>
                            <p>Unlock</p>
                            <label className="switch" id="switch1">
                                <input type="checkbox" id="button-1" checked={lock} onChange={handleLock} />
                                <span className="slider round"></span>
                            </label>
                            <p>Lock</p>
                        </div>
                        <p id="secure">Security Setting</p>
                        <div>
                            <p>Unable</p>
                            <label className="switch" id="switch2">
                                <input type="checkbox" id="button-2" checked={enable} onChange={handleEnable} />
                                <span className="slider round"></span>
                            </label>
                            <p>Enable</p>
                        </div>

                    </div>
                    <button type='submit' id='submitSetting' onClick={(e) => handleSubmitSetting(e)}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default BoxSetting