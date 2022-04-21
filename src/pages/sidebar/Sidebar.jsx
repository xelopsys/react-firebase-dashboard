import React, { useState, useContext } from 'react'
import './sidebar.scss'
import {
    FaUserAstronaut,
    FaLayerGroup,

} from "react-icons/fa";

import { MdProductionQuantityLimits } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { auth } from '../../firebase'
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router"



function Sidebar() {
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleClick = () => {

        signOut(auth).then(() => {
            dispatch({ type: "LOGOUT" });
            navigate("/login")

            // Sign-out successful.

        }).catch((error) => {
            console.log(error.message)
        });
    }
    return (
        <div className="sidebar">
            <div>
                <h1 className="brand">xelopsys</h1>
            </div>
            <div className="sidebar_menu">
                <ul>
                    <p>Main</p>
                    <Link to="/" className="link">
                        <li>
                            <FaLayerGroup />
                            <span>Home</span>
                        </li>
                    </Link>
                    <p>Lists</p>
                    <Link to="/users" className="link">
                        <li>
                            <FaUserAstronaut />
                            <span>Users</span>
                        </li>
                    </Link>
                    <p>Useful</p>
                    <Link to="/product" className="link">
                        <li>
                            <MdProductionQuantityLimits />
                            <span>Product</span>
                        </li>
                    </Link>

                    <Link to="/login" className="link">
                        <li style={{ padding: 0, margin: 0 }}>
                            <button onClick={handleClick} style={{ outline: "none", border: "none", width: "100%", height: "100%", backgroundColor: "none", fontSize: "20px", padding: "10px 30px", textAlign: "left", cursor: "pointer" }} >

                                <IoExitOutline />
                                <span>Login out</span>

                            </button>
                        </li>
                    </Link>
                </ul>
            </div>
        </div >
    )
}

export default Sidebar