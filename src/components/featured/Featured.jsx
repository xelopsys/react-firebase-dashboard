import React from 'react'
import './featured.scss'
import { IoSettingsOutline } from "react-icons/io5";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Featured() {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <IoSettingsOutline />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={`${70}%`} strokeWidth={5} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">$420</p>
                <p className="desc">
                    lorem ipsum dolor sit amet, consectetur adip
                </p>

            </div>
        </div>
    )
}

export default Featured