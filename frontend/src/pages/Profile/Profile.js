import React from 'react';
import "./Profile.css";
import {uploads} from "../../utils/config";

import Message from "../../components/Message";
import {Link} from "react-router-dom";
import {BsFillEyeFill,BsPencilFill,BsXlg} from "react-icons/bs";

//hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

//redux
import { getUserDetails } from '../../slices/UserSlice';

const Profile = () => {
  const {id} = useParams();

  const dispatch = useDispatch();

  const {user, loading} = useSelector((state) => state.user); 

  const {user: userAuth} = useSelector((state) => state.auth);

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(()=>{
    dispatch(getUserDetails(id))
  }, [dispatch, id]);

const submitHandle = (e) => {
    e.preventDefault();
}
  
if(loading){
  return <p>Carregando...</p>;
}

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
        <div className="new-photo" ref={newPhotoForm}>
          <h3>Compartilhe algum momento seu:</h3>
          <form onSubmit={submitHandle}>
          <label>
            <span>Título para a foto:</span>
            <input type="text" placeholder='Insira um titulo'/>
          </label>
          <label>
            <span>Image:</span>
            <input type="file"/>
          </label>
          <input type="submit" value="Postar"/>
          </form>
        </div>
        </>
      )}
    </div>
  )
}

export default Profile
