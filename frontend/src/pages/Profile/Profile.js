import React from 'react';
import "./Profile.css";
import {uploads} from "../../utils/config";

import Message from "../../components/Message";
import {Link} from "react-router-dom";
import {BsFillEyeFill,BsPencilFill,BsXLg} from "react-icons/bs";

//hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

//redux
import { getUserDetails } from '../../slices/UserSlice';
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto } from '../../slices/PhotoSlice';

const Profile = () => {
  const {id} = useParams();

  const dispatch = useDispatch();

  const {user, loading} = useSelector((state) => state.user); 
  const {user: userAuth} = useSelector((state) => state.auth);

  const {photos, loading:loadingPhoto, message:messagePhoto, error:errorPhoto} = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(()=>{
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
}

const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage())
  }, 2000)
}

const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image
    }

  const formData = new FormData()
  const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));
  
  formData.append("photo", photoFormData)
  
  dispatch(publishPhoto(formData))

  setTitle("");

  resetComponentMessage();
}
  
const handleDelete = (id) => {
  dispatch(deletePhoto(id))

  resetComponentMessage();
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
            <input type="text" placeholder='Insira um titulo' onChange={(e) => setTitle(e.target.value)} value={title || ""}/>
          </label>
          <label>
            <span>Image:</span>
            <input type="file" onChange={handleFile}/>
          </label>
          {!loadingPhoto && <input type="submit" value="Postar"/>}
          {loadingPhoto && <input type="submit" disabled value="Aguarde..."/>}
          </form>
        </div>
        {errorPhoto && <Message msg={errorPhoto} type="error"/>}
        {messagePhoto && <Message msg={messagePhoto} type="success"/>}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas</h2>
        <div className="photos-container">
          {photos && photos.map((photo) => (
            <div className="photo" key={photo._id}>
              {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>)} 
              {id === userAuth._id ? (
              <div className="actions">
                <Link>
                  <BsFillEyeFill/>
                </Link>
                <BsPencilFill/>
                <BsXLg onClick={()=> handleDelete(photo._id)}/>
              </div>
              ) : (<Link className="btn" to={`/photo/${photo._id}`}>Ver</Link>)}
            </div>
          ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas</p>}
        </div>
      </div>
    </div>
  )
}

export default Profile
