import React, {useContext} from 'react'
import {AppContext} from '../App'

type Props = {
    keyVal: string
    bigKey?: boolean
    disabled?: boolean
}

const idCalc = (isBig: boolean | undefined, isDisabled: boolean | undefined): string => {
    if (isBig) {
        return 'big'
    } else if (isDisabled) {
        return 'disabled'
    } else {
        return ''
    }
}

const Key = ({keyVal, bigKey, disabled}: Props) => {

    const { onEnter, onSelectLetter, onDelete } =  useContext(AppContext)
  
    const selectLetter = () => {
        if (keyVal === 'Enter') {
            onEnter()
        } else if (keyVal === 'Delete') {
            onDelete()
        } else {
            onSelectLetter(keyVal)
        }
    }

    return (
        <div className='key' id={idCalc(bigKey, disabled)} onClick={selectLetter}>{keyVal}</div>
    )
}

export default Key