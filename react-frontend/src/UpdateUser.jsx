import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+id).then((res) => {
            setName(res.data.name || '');
            setEmail(res.data.email || '');
            setAge(res.data.age || '');
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, [id]);

    const submitUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/updateUser/'+id, {
            name: name,
            email: email,
            age: age
        }).then((res) => {
            console.log(res.data);
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary">
            <div className="bg-white p-3 rounded">
                <form onSubmit={submitUpdate}>
                    <h2>Update user</h2>
                    <div className="mb-2 text-start">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2 text-start">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2 text-start">
                        <label htmlFor="">Age</label>
                        <input type="number" placeholder="Enter Age" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <button className="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;