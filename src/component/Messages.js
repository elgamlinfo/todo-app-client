import React from 'react'

const messStyle = {
    display: 'block',
    padding: '10px',
    position: 'fixed',
    minWidth: '300px',
    borderRadius: '5px',
    textAlign: 'center',
    textTransform: 'capitalize',
    top: '50px',
    left: '40%',
    background: '#F0F0F0'
}

export default function Messages(props) {
    return (
        <div style={props.message?messStyle:null}>{props.message}</div>
    )
}
