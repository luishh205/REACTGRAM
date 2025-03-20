import "./LikeContainer.css";

import { BsHeart, BsHeartFill } from 'react-icons/bs'

const LikeContainer = ({photo, user, handleLike}) => {
  return (
    <div>
      {photo.likes && user && (
        <>
        {photo.likes.includes(user._id) ? (
            <BsHeartFill/>
        ):(
            <BsHeart onClick={() => handleLike(photo)}/>
        )}
        <p>{photo.likes.length} likes(s)</p>
        </>
      )}
    </div>
  )
}

export default LikeContainer
