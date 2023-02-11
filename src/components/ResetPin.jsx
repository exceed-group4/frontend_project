import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './ResetPin.css'

const ResetPin = () => {
    const API_URL = 'http://group4.exceed19.online/reset_password';
    const {id} = useParams();
    const [auth,setAuth] = useState('');
    const [newPin,setNewPin] = useState('');
    const payload = {
        "safe_id": id,
        "new_safe_pin": newPin,
        "OTP": parseInt(auth)
    }
    const updatePin = async () => {
        const response = await fetch(API_URL,{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if(response.status===200){
            console.log(data.detail);
            alert(data.detail);
        }
        else{
            console.log(data.detail);
            alert(data.detail);
        }
    }
    const handleResetPin = () => {
        if(auth!=="" && newPin.length===6){
            updatePin();
        }
        else if(newPin.length!==6){
            alert("Enter new PIN 6 digits.");
        }
        else if(auth.length!==6){
            alert("Enter correct OTP");
        }
    }
    const navigate = useNavigate()
    return (
        <div className="wrapper2">
            <div className='back-home-div'>
                <a href="" onClick={()=>navigate('/')}><span class="material-symbols-outlined" id='back-home'>home</span></a>
            </div>
            <div className="biggy">
                <p className="texto">RESET PIN</p>
                <p id="safeSafe">Safe Id: {id}</p>
                <div className="pin-wrapper2">
                    <div className='littleRight'>
                        <p>OTP:</p>
                        <input id="auth" type="password" name="auth" onChange={(e)=>setAuth(e.target.value)}/>
                    </div>
                    <div>
                        <p>new PIN:</p>
                        <input id="newPin" type="password" name="newPin" onChange={(e)=>setNewPin(e.target.value)}/>
                    </div>
                <button type='submit' id='submitReset' onClick={(e)=>handleResetPin(e)}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPin;