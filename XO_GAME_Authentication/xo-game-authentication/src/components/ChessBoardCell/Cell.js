import React from 'react'
import './Cell.css'

export default function Cell(props) {
    return (
        <button 
        className="chessBoardCell" 
        onClick={() => props.onClick()}
        disabled={props.value !== null ? true : false}
        style={{color: props.value === 'X' ? '#e84b3a' : '#56a560'}}>
            {props.value}
        </button>
    )
}
