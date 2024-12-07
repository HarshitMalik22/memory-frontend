import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HistoryContext from '../../context/history/historyContext';
import AuthContext from '../../context/auth/authContext';
import { BASE_URL } from '../../config';  // Ensure to import your API base URL

const Home = () => {
  const historyContext = useContext(HistoryContext);
  const authContext = useContext(AuthContext);

  const { games, updateCurrentLevel, updateCurrentTheme, getGames } = historyContext;

  // Declare component level state
  const [chosenTheme, setChosenTheme] = useState('');
  const [highScores, setHighScores] = useState({
    beginner: 'Loading...',
    intermediate: 'Loading...',
    expert: 'Loading...',
  });
  const [loading, setLoading] = useState(true);

  // Load user and get game data
  useEffect(() => {
    authContext.loadUser();
    getGames();
    fetchHighScores();
  }, []);

  // Fetch high scores from the backend
  const fetchHighScores = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        return;
      }

      const res = await fetch(`${BASE_URL}/api/highscore`, {
        headers: { 'x-auth-token': token },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch high scores');
      }

      const data = await res.json();
      setHighScores({
        beginner: data.beginner || 'No high score yet',
        intermediate: data.intermediate || 'No high score yet',
        expert: data.expert || 'No high score yet',
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching high scores:', err);
      setLoading(false);
    }
  };

  // Enable materialize dropdown functionality
  useEffect(() => {
    window.M.AutoInit();
  }, []);

  // Calculate average moves
  const getAvg = (data, level) => {
    const gameArr = data.filter((game) => game.gameLevel === level).map((game) => game.numOfMoves);

    if (gameArr.length > 0) {
      return Math.floor(gameArr.reduce((a, b) => a + b) / gameArr.length);
    } else {
      return 'No games played';
    }
  };

  // Store current level
  const onClick = (e) => {
    updateCurrentLevel(e.target.name);
  };

  // Store current theme
  const handleClick = (e) => {
    updateCurrentTheme(e.target.name);
    setChosenTheme(e.target.name);
  };

  return (
    !authContext.loading && (
      <div className="row container">
        <div className="col s12">
          <div className="card blue-grey darken-1 large">
            <div className="card-content white-text">
              <span className="center card-title hide-on-small-only">
                You have played {games.length} {games.length === 1 ? 'game' : 'games'} so far!
              </span>
              <span className="center card-title hide-on-med-and-up">
                {games.length} {games.length === 1 ? 'Game ' : 'Games '} Played!
              </span>
              <br />
              <span className="center card-title hide-on-small-only">Your Average Number of Moves:</span>
              <span className="center card-title hide-on-med-and-up">Average Moves:</span>
              <br />
              <div className="row col s12">
                <div className="col s4 center">
                  <u>Easy</u>
                </div>
                <div className="col s4 center">
                  <u>Medium</u>
                </div>
                <div className="col s4 center">
                  <u>Hard</u>
                </div>
              </div>
              <div className="row col s12">
                <div className="col s4 center">
                  <p>{loading ? 'Loading...' : highScores.beginner}</p>
                </div>
                <div className="col s4 center">
                  <p>{loading ? 'Loading...' : highScores.intermediate}</p>
                </div>
                <div className="col s4 center">
                  <p>{loading ? 'Loading...' : highScores.expert}</p>
                </div>
              </div>
              <br />
              <span className="center card-title">Start A New Game Below!</span>
            </div>
            <div className="row center-align">
              <a className="dropdown-trigger btn blue-grey darken-1" href="#" data-target="dropdown1">
                {chosenTheme.length > 0 ? chosenTheme : 'Choose A Theme!'}
              </a>
              <ul id="dropdown1" className="dropdown-content">
                <li>
                  <a href="#" onClick={handleClick} name="robots" className="blue-grey-text text-darken-1">
                    Robots
                  </a>
                </li>
                <li className="divider" tabIndex="-1"></li>
                <li>
                  <a href="#" onClick={handleClick} name="cats" className="blue-grey-text text-darken-1">
                    Cats
                  </a>
                </li>
                <li className="divider" tabIndex="-1"></li>
                <li>
                  <a href="#" onClick={handleClick} name="monsters" className="blue-grey-text text-darken-1">
                    Monsters
                  </a>
                </li>
              </ul>
            </div>
            <div className="col s12 card-action">
              <div className="col s4 center">
                <Link
                  to="/game"
                  className="waves-effect waves-red btn-flat"
                  name="beginner"
                  onClick={onClick}
                >
                  Easy
                </Link>
              </div>
              <div className="col s4 center">
                <Link
                  to="/game"
                  className="waves-effect waves-red btn-flat"
                  name="intermediate"
                  onClick={onClick}
                >
                  <span className="hide-on-small-only">Medium</span>
                  <span className="hide-on-med-and-up">Med</span>
                </Link>
              </div>
              <div className="col s4 center">
                <Link
                  to="/game"
                  className="waves-effect waves-red btn-flat"
                  name="expert"
                  onClick={onClick}
                >
                  Hard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
