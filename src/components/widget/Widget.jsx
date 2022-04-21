import React from 'react'
import './widget.scss'
import { MdKeyboardArrowUp } from "react-icons/md";
import { BsFillPersonFill, BsShop } from "react-icons/bs";
import { FaMoneyCheckAlt, FaWallet } from "react-icons/fa";

export default function Widget({ type }) {
    let data;

    const amount = 100
    const diff = 20

    switch (type) {
        case 'user':
            data = {
                title: 'Users',
                isMoney: false,
                link: 'See all users',
                icon: <BsFillPersonFill size="18" />,

            }
            break;
        case 'order':
            data = {
                title: 'Orders',
                isMoney: false,
                link: 'See all orders',
                icon: <BsShop size="18" />,
            }
            break;
        case 'earning':
            data = {
                title: 'Earnings',
                isMoney: true,
                link: 'View all earnings',
                icon: <FaMoneyCheckAlt size="18" />,
            }
            break;
        case 'balance':
            data = {
                title: 'Balance',
                isMoney: true,
                link: 'View all balance',
                icon: <FaWallet size="18" />,
            }
            break;
        default:
            break;

    }

    let color;
    if (type === "user") {
        color = '#fec5bb'
    }
    else if (type === "order") {
        color = '#fbf8cc'
    }
    else if (type === "earning") {
        color = '#b9fbc0'
    }
    else if (type === "balance") {
        color = '#caf0f8'
    }
    else {
        color = '#90dbf4'
    }
    return (
        <div className="widget-items" >
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percantage positive">
                    <MdKeyboardArrowUp />
                    {diff}%
                </div>
                <span className="icon" style={{ backgroundColor: color }}>
                    {data.icon}
                </span>
            </div>
        </div>
    )
}
