import React from 'react'

const ChirpCard = ({username, content, location}) => {
    return (
        <>
        <div className= 'card m-6'>
            <h3>{username}</h3>
            <p>{content}</p>
            <small>{location}</small>
            <button onClick = {() => handleDeleteChirp(id)}>
                Delete
            </button>
            </div>
        </>
    )
}

export default ChirpCard;