import React from "react";
import '../home.css';

function Home(){
    return(
        <>
            <div className="homeContainer">
                <div className="imageContainer">
                    <img src="" alt="" />
                </div>
                <div className="dashboardContainer">
                    <h1>Profile</h1>
                    <div className="optionsContainer">
                        <li><button>View</button></li>
                        <li><button>Edit</button></li>
                        <li><button>Delete</button></li>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;