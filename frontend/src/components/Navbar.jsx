import React from "react";
import "../navbar.css"

function Navbar(){
    <>
        <div className="container">
            <a> Trusty <span>.</span></a>
            <div className="itemContainer">
                <li><a href="/register">Sign in</a></li>
                <li><a href="/login">Sing up</a></li>
            </div>
        </div>
    </>
}

export default Navbar;