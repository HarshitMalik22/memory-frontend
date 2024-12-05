import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HistoryContext from '../../context/history/historyContext';
import AuthContext from '../../context/auth/authContext';
import Cards from '../cards/Cards';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Game = () => {
  const historyContext = useContext(HistoryContext);
  const authContext = useContext(AuthContext);

  const { currentLevel, currentTheme, addNewGame } = historyContext;

  const [active, setActive] = useState(true);
  const [curNumOfMoves, setCurNumOfMoves] = useState(0);
  const [newGame, setNewGame] = useState({
    gameLevel: '',
    numOfMoves: 0,
    date: Date.now(),
  });

  const { width, height } = useWindowSize();

  useEffect(() => {
    authContext.loadUser();
  }, []);

  const updateActive = () => {
    setActive((cur) => !cur);
  };

  const updateCurNumOfMoves = (count) => {
    setCurNumOfMoves(count);
  };

  const updateNewGame = (newGame) => {
    setNewGame(newGame);
  };

  const submitHighScore = async (username, moves, level) => {
    console.log(`Submitting high score: ${moves} moves for ${username} on level ${level}`);
    await fetch('/api/highscore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
      body: JSON.stringify({ username, moves, level }),
    });
  };

  const onClick = async (e) => {
    addNewGame(newGame);
    await submitHighScore(authContext.user.name, curNumOfMoves, currentLevel);
  };

  return (
    !authContext.loading && (
      <div className='game-board'>
        {active ? (
          <Cards
            updateActive={updateActive}
            updateNumOfMoves={updateCurNumOfMoves}
            currentLevel={currentLevel}
            currentTheme={currentTheme}
            updateNewGame={updateNewGame}
          />
        ) : (
          <>
            {/* Confetti Animation */}
            <Confetti width={width} height={height} recycle={false} />

            <div className='row container'>
              <div className='col s12'>
                <div className='card blue-grey darken-1 small'>
                  <div className='card-content white-text'>
                    <span className='center card-title'>Congratulations!</span>
                    <br />
                    <span className='center card-title'>
                      You won in {curNumOfMoves} moves!
                    </span>
                    <br />
                    <div className='col s12 card-action'>
                      <div className='col s12 center'>
                        <Link
                          to='/'
                          className='waves-effect waves-red btn-flat'
                          onClick={onClick}
                        >
                          End Game
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default Game;
