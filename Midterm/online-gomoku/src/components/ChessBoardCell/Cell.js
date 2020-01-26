import React from 'react'
import './Cell.css'

export default function Cell(props) {
    // console.log(props.winnerMove);
    
    return (
        <button
            className="chessBoardCell"
            onClick={() => props.onClick()}
            disabled={props.value !== null || props.isDiabled ? true : false}
            style={{
                color: props.value === 'X' ? '#e84b3a' : '#56a560',
                backgroundColor: props.winnerMove ? '#ffb523' : '#fcf2eb'
            }}>
            {props.value}
        </button>
    )
}
