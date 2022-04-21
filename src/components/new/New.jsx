import React, { useRef, useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik';
import Sidebar from '../../pages/sidebar/Sidebar'
import './new.scss'
import { IoCloudUploadOutline } from "react-icons/io5";
import { userRows } from "../../../src/datatable"
import PreviewImage from './PreviewImage'
import { useNavigate } from 'react-router-dom'
import { doc, addDoc, collection, setDoc } from "firebase/firestore";
import { storage, auth, db } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// import { randomBytes } from 'crypto-browserify';
// const newId = randomBytes(32).toString('hex');

function New() {
    const fileRef = useRef(null)
    const navigate = useNavigate()
    const [perc, setPerc] = useState(null)

    return (
        <div className="addNew">
            <Sidebar />
            <div className="content">
                <h1 className="title">New user</h1>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        age: 20,
                        file: null,
                        status: '',
                        password: ''
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));

                        const name = new Date().getTime() + values.file.name
                        const storageRef = ref(storage, name);

                        const uploadTask = uploadBytesResumable(storageRef, values.file);

                        // Register three observers:
                        // 1. 'state_changed' observer, called any time the state changes
                        // 2. Error observer, called on failure
                        // 3. Completion observer, called on successful completion
                        try {
                            uploadTask.on('state_changed',
                                (snapshot) => {
                                    // Observe state change events such as progress, pause, and resume
                                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    const prog = progress.toFixed(0);
                                    setPerc(prog)
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused');
                                            break;
                                        case 'running':
                                            console.log('Upload is running');
                                            break;
                                        default:
                                            break;
                                    }
                                },
                                (error) => {
                                    // Handle unsuccessful uploads
                                },
                                () => {
                                    // Handle successful uploads on complete
                                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                        console.log('File available at', downloadURL);
                                        values.file = downloadURL
                                        // const length = Number(userRows.length) + 1
                                        await addDoc(collection(db, 'users'), {
                                            id: Math.random() * 1000000 + Math.random() * 100,
                                            firstName: values.firstName,
                                            lastName: values.lastName,
                                            email: values.email,
                                            age: 20,
                                            img: values.file,
                                            status: values.status
                                        })
                                        console.log({ ...values })
                                    });
                                }
                            );

                            await createUserWithEmailAndPassword(auth, values.email, values.password)

                            perc === 100 && navigate('/')

                            // console.log(user)
                            // navigate("/users")
                        } catch (err) {
                            console.log(err.message)
                        }

                    }}
                >
                    {({ errors, values, setFieldValue }) => (
                        <Form className="form">
                            <div className="first">
                                {values.file && <PreviewImage file={values.file} />}
                                {/* <PreviewImage file={values.file} /> */}
                                <label htmlFor="img" className="imgText">
                                    <IoCloudUploadOutline />
                                </label>
                                <input
                                    ref={fileRef}
                                    id="img"
                                    name="img"
                                    placeholder="jane@acme.com"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        // console.log(e.target.files[0])
                                        setFieldValue('file', e.target.files[0])
                                    }}
                                />
                            </div>
                            <div className="second">
                                <span className="nameIn">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field id="firstName" name="firstName" placeholder="Jamshid" className="name" />
                                </span>
                                <span className="nameIn">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field id="lastName" name="lastName" placeholder="Jurakulov" className="name" />
                                </span>
                                <span className="Email">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        placeholder="xelopsys@gmail.com"
                                        type="email"
                                        className="name"
                                    />
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        id="password"
                                        name="password"
                                        placeholder="password"
                                        type="password"
                                        className="name"
                                    />
                                </span>

                                <div role="group" aria-labelledby="radio-group" className="group">
                                    <label className="active">
                                        <Field type="radio" name="status" value="active" />
                                        Active
                                    </label>
                                    <label className="pending">
                                        <Field type="radio" name="status" value="pending" />
                                        Pending
                                    </label>
                                    <label className="passive">
                                        <Field type="radio" name="status" value="passive" />
                                        Passive
                                    </label>
                                </div>
                                <button style={{ display: perc > 0 && perc <= 100 ? "none" : "block" }} type="submit" className="submit">Add</button>
                                <span className="perc" style={{ display: perc > 0 ? "block" : "none" }} >Wait a minute ...{perc}%</span>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div >
        </div >
    )
}

export default New