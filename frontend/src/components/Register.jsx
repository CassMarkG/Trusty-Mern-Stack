import React from "react";
import '../register.css';

function Register(){
    return(
        <>
            <div className="registerForm">
            <form>
                    <div className="textfield">
                        <input type="text" />
                    </div>
                    <div className="textfield1">
                        <input type="text" />
                    </div>
                    <div className="textfield2">
                        <input type="text" />
                    </div>
                    <div className="loginContainer">
                        <button>Login</button>
                    </div>  
                </form>
            </div>
        </>
    )
}

export default Register;