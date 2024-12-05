import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';
import HistoryContext from '../../context/history/historyContext';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const historyContext = useContext(HistoryContext);
  const authContext = useContext(AuthContext);

  const { games, updateCurrentLevel, updateCurrentTheme, getGames } = historyContext;
  const [chosenTheme, setChosenTheme] = useState('');

  useEffect(() => {
    authContext.loadUser();
    getGames();
    // eslint-disable-next-line
  }, []);

  const [highScores, setHighScores] = useState({
    beginner: 'Loading...',
    intermediate: 'Loading...',
    expert: 'Loading...',
  });

  const fetchHighscore = async (level) => {
    try {
      const res = await fetch(`/api/highscore/${level}`, {
        headers: { 'x-auth-token': localStorage.token },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(`Fetched high score for ${level}:`, data);
      return data.moves === 'No high score yet' ? 'No high score yet' : data.moves;
    } catch (err) {
      console.error('Error fetching high score:', err);
      return 'Error fetching high score';
    }
  };

  useEffect(() => {
    const fetchAllHighScores = async () => {
      const beginner = await fetchHighscore('beginner');
      const intermediate = await fetchHighscore('intermediate');
      const expert = await fetchHighscore('expert');
      setHighScores({ beginner, intermediate, expert });
    };
    fetchAllHighScores();
  }, []);

  const handleClick = (e) => {
    const themeName = e.target.name;
    updateCurrentTheme(themeName);
    setChosenTheme(themeName);
  };

  const onClick = (e) => {
    updateCurrentLevel(e.target.name);
  };

  return (
    !authContext.loading && (
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f4f9' }}>
        <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2, backgroundColor: '#3b3b3b' }}>
          <CardContent sx={{ textAlign: 'center', color: '#ffffff' }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              You have played {games.length} {games.length === 1 ? 'game' : 'games'} so far!
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Your High Scores(Lowest number of moves you took to complete the game):
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Easy</Typography>
                <Typography sx={{ color: '#f9f9f9' }}>{highScores.beginner}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Medium</Typography>
                <Typography sx={{ color: '#f9f9f9' }}>{highScores.intermediate}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Hard</Typography>
                <Typography sx={{ color: '#f9f9f9' }}>{highScores.expert}</Typography>
              </Grid>
            </Grid>
            <Typography variant="h5" sx={{ mt: 4, fontWeight: 600 }}>
              Start A New Game Below!
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={4}>
                <Link to="/game" style={{ textDecoration: 'none' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#00796b',
                      color: '#ffffff',
                      '&:hover': { backgroundColor: '#004d40' },
                    }}
                    name="beginner"
                    onClick={onClick}
                  >
                    Easy
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to="/game" style={{ textDecoration: 'none' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#0288d1',
                      color: '#ffffff',
                      '&:hover': { backgroundColor: '#01579b' },
                    }}
                    name="intermediate"
                    onClick={onClick}
                  >
                    Medium
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link to="/game" style={{ textDecoration: 'none' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#d32f2f',
                      color: '#ffffff',
                      '&:hover': { backgroundColor: '#c2185b' },
                    }}
                    name="expert"
                    onClick={onClick}
                  >
                    Hard
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    )
  );
};

export default Home;
