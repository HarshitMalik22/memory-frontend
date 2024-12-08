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
  const [highScore, setHighScore] = useState('Not Played Yet');
  const [newGame, setNewGame] = useState({
    gameLevel: currentLevel || '',
    numOfMoves: 0,
    date: Date.now(),
  });

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!authContext.user) {
      console.warn('User is not authenticated.');
      return;
    }

    const fetchHighScore = async () => {
      try {
        if (!currentLevel || !authContext.user.email) {
          console.warn('Missing level or user information.');
          return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('Token is missing.');
          return;
        }

        const response = await fetch(`/api/auth/highscore/${currentLevel}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch high score.');

        const data = await response.json();
        setHighScore(data.moves ?? 'Not Played Yet');
      } catch (error) {
        console.error('Error fetching high score:', error.message);
        setHighScore('Not Played Yet');
      }
    };

    fetchHighScore();
  }, [currentLevel, authContext.user?.email]);

  const updateActive = () => setActive((prev) => !prev);
  const updateCurNumOfMoves = (count) => setCurNumOfMoves(count);
  const updateNewGame = (updatedGame) => setNewGame(updatedGame);

  const submitHighScore = async (username, moves, level) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('Token is missing.');
        return;
      }

      const response = await fetch(`/api/auth/highscore/${level}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ username, moves, level }),
      });

      if (!response.ok) throw new Error('Failed to submit high score.');

      const data = await response.json();
      console.log(data.message);

      if (+moves < +highScore || highScore === 'Not Played Yet') {
        setHighScore(moves);
      }
    } catch (error) {
      console.error('Error submitting high score:', error.message);
    }
  };

  const handleEndGame = async () => {
    addNewGame(newGame);
    await submitHighScore(authContext.user.email, curNumOfMoves, currentLevel);
  };

  return (
    !authContext.loading && (
      <div className="game-board">
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
            {width && height && !active && (
              <Confetti width={width} height={height} recycle={false} />
            )}
            <div className="row container">
              <div className="col s12">
                <div className="card blue-grey darken-1 small">
                  <div className="card-content white-text">
                    <span className="center card-title">Congratulations!</span>
                    <br />
                    <span className="center card-title">
                      You won in {curNumOfMoves} moves!
                    </span>
                    <br />
                    <div className="col s12 card-action">
                      <div className="col s12 center">
                        <Link
                          to="/"
                          className="waves-effect waves-red btn-flat"
                          onClick={handleEndGame}
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
