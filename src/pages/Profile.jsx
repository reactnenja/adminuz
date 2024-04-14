import { useNavigate } from "react-router-dom";

import "./Profile.scss";
import { useEffect, useState } from "react";
// import { useAuth } from "../components/Auth";

const Profile = () => {
  // const { user, logOut } = useAuth();
  const [ user , setUser] =useState ({
    username: "",
    password: "",
  }) 
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    localStorage.removeItem('user')

  };

  useEffect(()=>{
    const user =  JSON.parse(localStorage.getItem('user'))
    setUser({
      username: user.username,
      password: user.password,
    })
  } , [])

  return (
    <div className="profile">
      <div className="container">
        <div className="content">
          <div className="profile_head">
            <h1>User Information</h1>
          </div>
          <div className="profile_body">
            <span>User Name: {user.username} </span>
            <span>User Password: {user.password} </span>
          </div>
          <div className="btn">
            <button onClick={handleLogOut}>Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
