import React, { useState, useEffect } from 'react'
import Sidebar from '../../pages/sidebar/Sidebar'
import './list.scss'
import Navbar from '../navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatable.js"
import { Link } from 'react-router-dom'
import { IoSearchCircleOutline } from "react-icons/io5";
import { collection, getDocs, } from "firebase/firestore";
import { db } from "../../firebase"


function List() {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                console.log(querySnapshot)
                let list = []
                querySnapshot.forEach((doc) => {
                    console.log(doc)
                    list.push({ id: doc.id, ...doc.data() })
                }
                );
                setData(list)
                console.log(list)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [])
    console.log(data)
    const handleQuery = (e) => {
        setQuery(e.target.value)
        // console.log(e.target.value)
    }
    // console.log()

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id))
    }

    // useEffect(() => {
    //     if (query) {
    //         setData(data.filter(item => item.username.toLowerCase().includes(query.toLowerCase())))
    //     } else {
    //         setData(userRows)
    //     }
    // }, [data, query])

    const handleClick = () => {
        if (query) {
            if (query.length === 0 || query.length >= 2) {
                setData(data.filter(item => item.username.toLowerCase().includes(query.toLowerCase())))
            }
        } else {
            setData(userRows)
        }
        // handleClick()
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                // console.log(params)
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="list">
            <Sidebar />
            <div className="content">
                <Navbar />
                <div className="search">
                    <input id='search' type='text' placeholder="search ..." onChange={handleQuery} onKeyPress={handleKeyPress} />
                    <IoSearchCircleOutline size="30" onClick={handleClick} />
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        key={data.length}
                        className="datagrid"
                        rows={data}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                        style={{ border: 'none' }}
                    />
                    <Link to="/users/new">
                        <button className="add">Add user</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default List