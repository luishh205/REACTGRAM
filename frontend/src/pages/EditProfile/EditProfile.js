import React from 'react'
import './EditProfile.css'
import Message from '../../components/Message'

import { uploads } from '../../utils/config'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { profile, resetMessage, updateProfile } from '../../slices/UserSlice'

const EditProfile = () => {
const dispatch = useDispatch()

const { user, message, error, loading } = useSelector((state) => state.user);

const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [profileImage, setImageProfile] = useState("")
const [bio, setBio] = useState("")
const [previewimage, setPreviewImage] = useState("")

useEffect(()=>{
    dispatch(profile());
},[dispatch])

useEffect(()=>{
    if(user){
    setName(user.name)  
    setEmail(user.email)
    setBio(user.bio)
    }
}, [user])

const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
        name
    };

    if(profileImage){
        userData.profileImage = profileImage
    }

    if(bio){
        userData.bio = bio
    }

    if(password){
        userData.password = password
    }

    const formData = new FormData();

    const userFormdata = Object.keys(userData).forEach((key) => formData.append(key, userData[key]))

    formData.append("user", userFormdata)

    await dispatch(updateProfile(formData));

    setTimeout(() => {
        dispatch(resetMessage())
    }, 2000)

};

const handleFile = (e) => {
    const image = e.target.files[0];

    setPreviewImage(image);

    setImageProfile(image);
}

console.log(user)
  return (
    <div id='edit-profile'>
     <h2>Edite seus dados</h2>
     <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você...</p>
     {(user.profileImage || previewimage) && (
        <img 
        className='profile-image'
        src={
            previewimage
             ? URL.createObjectURL(previewimage)
              : `${uploads}/users/${user.profileImage}`
        }
        alt={user.name}
        />
     )}
     <form onSubmit={handleSubmit}>
        <input type="text"placeholder='Nome' onChange={(e)=> setName(e.target.value)} value={name || ""}/>
        <input type="email" placeholder='E-mail' disabled  value={email || ""}/>
        <label>
            <span>Imagem do Perfil:</span>
            <input type="file" onChange={handleFile}/>
        </label>
        <label>
            <span>Bio:</span>
            <input type="text" placeholder='Descrição do perfil' onChange={(e)=> setBio(e.target.value)} value={bio || ""}/>
        </label>
        <label>
            <span>Quer alterar sua senha?:</span>
            <input type="text" placeholder='Digite sua nova senha' onChange={(e)=> setPassword(e.target.value)} value={password || ""}/>
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
     </form>
    </div>
  )
}

export default EditProfile
