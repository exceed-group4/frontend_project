import React from 'react'
import './BoxSetting.css'


const BoxSetting = () => {
    return (
        <div class="wrapper">
            <div>Box Setting</div>

            <div class="biggy">
                <p class="texto">Safe Box System</p>

                <div class="pin-wrapper">
                    <p>PIN:</p>
                    <input id="pin" type="text" name="pin" />
                    <button id="pin-submit">Submit</button>
                </div>

                <div class="button-wrapper">
                    <button id="button-1">Button 1</button>
                    <button id="button-2">Button 2</button>
                </div>
            </div>
        </div>
    )
}

export default BoxSetting