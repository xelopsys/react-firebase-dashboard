import React from "react";
import Sidebar from '../sidebar/Sidebar'
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'
// import { Outlet } from 'react-router-dom'

function Home() {
    return (
        <div className="home">
            <Sidebar />
            <div className="content">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />
                </div>
                <div className="charts">
                    <Featured />
                    <Chart />
                </div>
            </div>
        </div>
    );
}

export default Home;