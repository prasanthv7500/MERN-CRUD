import axios from "axios";
import React, { useEffect } from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setusers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001').then((res) => {
            setusers(res.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/'+id).then((res) => {
            console.log(res.data);
            setusers(users.filter(user => user._id !== id));
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
    <div className="bg-blue d-flex justify-content-center align-items-center"> 
      <div className="p-3 rounded" style={{background: "cornflowerblue"}}>
       <div className="text-start mb-2"><Link to="/create" className="btn btn-success">Add User</Link></div>
        <table className="table" border="1">
            <thead>
               <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
               </tr>
            </thead>
            <tbody>
                {users.map((user,index) => (
                    <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                            <Link to={`/update/${user._id}`} className="btn btn-primary m-1">Edit User</Link>
                            <button className="btn btn-danger m-1" onClick={()=>handleDelete(user._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;