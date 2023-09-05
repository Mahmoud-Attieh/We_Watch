import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import './style.css'
import "./favorite-view.scss";

import PageHeader from '../page-header/PageHeader';

const UserDetail = (props) => {
    const [user, setUser] = useState({})
    const [fav, setFav] = useState([])
    const { id } = useParams();



    useEffect(() => {
        axios.get('http://localhost:8000/api/user/' + id)
            .then(res => setUser(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/favorites/${id}`)
            .then(res => setFav(res.data))
            .catch(err => console.error(err));
    }, []);


    return (
        <div>
            <div className="container">
                <PageHeader>
                    My Profile
                </PageHeader>
                <div className="card">  
                    <div className="infos">
                        <div className="name">
                            <h2>{user.fullname}</h2>
                            <h4>@{user.name}</h4>
                        </div>
                        <p className="text">
                            {user.email}
                        </p>
                        <ul className="stats">
                            <li>
                                <h3>{fav.length}</h3>
                                <h4>Favorites</h4>
                            </li>
                        </ul>
                        <div className="links">
                            <button className="follow">Edit</button>
                            <button className="view">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail;

