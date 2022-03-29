import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from '../App'

type Props = {
  letterPosition: number
  attemptValue: number
}

function Letter({ letterPosition, attemptValue }: Props) {

  const { board, correctWord, currentAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext)
  const letter = board[attemptValue][letterPosition]
  
  const correct = correctWord[letterPosition] === letter
  const almost = !correct && letter !== '' && correctWord.includes(letter)

  const letterState = currentAttempt.attempt > attemptValue && (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== '' && !correct && !almost) {
      setDisabledLetters((prev: any) => [...prev, letter])
    }
  }, [currentAttempt.attempt])

  return (
    <div className='letter' id={letterState as string}>{letter}</div>
  )
}

export default Letter