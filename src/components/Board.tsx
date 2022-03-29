import React, { useState } from 'react'
import Letter from './Letter'

type Props = {}

const Board = (props: Props) => {

    const letterRows = [
        [0,1,2,3,4],
        [0,1,2,3,4],
        [0,1,2,3,4],
        [0,1,2,3,4],
        [0,1,2,3,4],
    ]

    return (
        <div className='board'>
            {letterRows.map((letterRow, letterRowIdx) => (
                <div className='row'>
                    {letterRow.map((letterPosition, letterPositionIdx)=>(
                        <Letter letterPosition={letterPosition} attemptValue={letterRowIdx}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board