import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(name,email,age);
        axios.post('http://localhost:3001/createUser', {
            name: name,
            email: email,
            age: age
        }).then((res) => {
            console.log(res.data);
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });
        setName('');
        setEmail('');
        setAge('');
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary">
        <div className="bg-white p-3 rounded">
            <form onSubmit={submitHandler}>
                <h2>Add user</h2>
                <div className="mb-2 text-start">
                    <label htmlFor="">Name</label>
                    <input type="text"placeholder="Enter Name" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mb-2 text-start">
                    <label htmlFor="">Email</label>
                    <input type="email"placeholder="Enter Email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-2 text-start">
                    <label htmlFor="">Age</label>
                    <input type="number"placeholder="Enter Age" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <button className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default CreateUser;