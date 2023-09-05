import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import './style.css'
import "./favorite-view.scss";
import { useNavigate } from 'react-router-dom';
import PageHeader from '../page-header/PageHeader';

const Edit = (props) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/' + id)
            .then(res => {
                setName(res.data.name);
                setFullName(res.data.fullname);
                setEmail(res.data.email);
            })
    }, []);

    const updateUser = e => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/user/' + id, {
            name,
            fullname,
            email
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    return (
        <div className="container">
            <PageHeader>
                Edit Profile
            </PageHeader>
            <h1>Update User</h1>
            <form onSubmit={updateUser}>
                <p>
                    <label>User Name</label><br />
                    <input type="text"
                        name="name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                </p>
                <p>
                    <label>Full Name</label><br />
                    <input type="text"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => { setFullName(e.target.value) }} />
                </p>
                <p>
                    <label>Email</label><br />
                    <input type="text"
                        name="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                </p>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Edit;

