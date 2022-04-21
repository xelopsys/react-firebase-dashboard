import React from 'react'
import './navbar.scss'
import { IoListCircleOutline, IoLanguage, IoNotificationsCircleSharp, IoMoonSharp } from "react-icons/io5";
// import { IoLanguage } from "react-icons/io5";

function Navbar() {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search"></div>
                <div className="items">
                    <div className="item">
                        <IoLanguage size="30" />
                        <span>English</span>
                    </div>
                    <div className="item">
                        <IoListCircleOutline size="30" />
                        {/* <span>English</span> */}
                    </div>
                    <div className="item">
                        <IoNotificationsCircleSharp size="30" />
                        <div className="counter">
                            <span>1</span>
                        </div>
                        {/* <span>English</span> */}
                    </div>
                    <div className="item">
                        <IoMoonSharp size="30" />
                        {/* <span>English</span> */}
                    </div>
                    <div className="item img">
                        <img src="https://xelopsys.uz/profile.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar