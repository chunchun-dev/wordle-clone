import React, {useState, createContext, useEffect} from 'react';
import './App.css';
import Board from './components/Board';
import GameOver from './components/GameOver';
import Keyboard from './components/Keyboard';
import { boardDefault } from './Words';
import { generateWordSet } from './Words'

// TODO: strongly type AppContext
export const AppContext = createContext<any>([])

function App(): any {

  const [board, setBoard] = useState<string[][]>(boardDefault)
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPosition: 0 })
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [correctWord, setCorrectWord] = useState('')

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet as any)
      setCorrectWord(words.todaysWord as any)
    })
  }, [])

  const onSelectLetter = (key: string) => {
    if (currentAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = key;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = ""
    setBoard(newBoard)
    setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition - 1 })
  }

  const onEnter = (keyVal: number) => {
    if (currentAttempt.letterPosition !== 5) return

    let currWord = ''

    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i]
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0 })
    } else {
      alert('Not a valid word.')
    }

    if (currWord === correctWord) {
      setGameOver({gameOver: true, guessedWord: true})
      return
    }

    if (currentAttempt.attempt === 4) {
      setGameOver({gameOver: true, guessedWord: false})
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      
      <AppContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters, setGameOver, gameOver }}>
        <div className='game'>
          <Board/>
          {gameOver.gameOver ? <GameOver/> : <Keyboard/>}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;