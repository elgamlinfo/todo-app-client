import React from 'react'
import '../style/todo-items.scss'

export default function TodoItem(props) {
    return (
        <div className={`todo-item ${props.completed?"check":""}`} >
            <input type="checkbox" checked={props.completed} onChange={() => props.onChangeHudler(props.id)}/>
            <p>{props.description}</p>
            <button onClick={() => props.deleteClickHudler(props.id)} id={props.id}><i className="fas fa-times"></i></button>
        </div>
    )
}
