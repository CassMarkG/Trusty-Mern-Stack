import React from "react";
import '../login.css';

function Login(){
    return(
        <>
            <div className="glass">
                <form>
                    <div className="textfield">
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

export default Login;