import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import HistoryContext from '../../context/history/historyContext';
import AuthContext from '../../context/auth/authContext';
import { BASE_URL } from '../../config';

const Home = () => {
  const historyContext = useContext(HistoryContext);
  const authContext = useContext(AuthContext);

  const { games, updateCurrentLevel, updateCurrentTheme, getGames } = historyContext;
  const [highScores, setHighScores] = useState({
    beginner: 'Loading...',
    intermediate: 'Loading...',
    expert: 'Loading...',
  });
  const [loading, setLoading] = useState(true);

  // Load user and games on component mount
  useEffect(() => {
    authContext.loadUser();
    getGames();
  }, [authContext, getGames]);

  // Fetch high scores for a specific level
  const fetchHighscore = async (level) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token is missing');
        return 'Error: Authorization token missing';
      }

      const res = await fetch(`${BASE_URL}/api/auth/highscore/${level}`, {
        method: 'GET',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Error fetching high score for ${level}:`, errorText);
        return 'No high score yet';
      }

      const data = await res.json();
      return data.moves || 'No high score yet';
    } catch (err) {
      console.error(`Error fetching high score for ${level}:`, err.message);
      return 'Error fetching high score';
    }
  };

  // Fetch high scores for all levels
  useEffect(() => {
    let isMounted = true;

    const fetchAllHighScores = async () => {
      setLoading(true);
      const beginner = await fetchHighscore('beginner');
      const intermediate = await fetchHighscore('intermediate');
      const expert = await fetchHighscore('expert');

      if (isMounted) {
        setHighScores({ beginner, intermediate, expert });
        setLoading(false);
      }
    };

    fetchAllHighScores();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update the theme based on user selection
  const handleClick = (e) => {
    const themeName = e.target.name;
    updateCurrentTheme(themeName);
  };

  // Update the level based on user selection
  const onClick = (level) => {
    updateCurrentLevel(level);
  };

  // Ensure proper user loading and redirection logic
  if (authContext.loading) {
    // While loading user data, show a loading spinner
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!authContext.isAuthenticated) {
    // If user is not authenticated, redirect to SignIn page (you may use react-router for redirecting)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">You need to sign in to access the Home page.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
      }}
    >
      <Card
        sx={{
          width: '100%',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#3b3b3b',
        }}
      >
        <CardContent sx={{ textAlign: 'center', color: '#ffffff' }}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Your High Scores (Lowest number of moves you took to complete the game):
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {['beginner', 'intermediate', 'expert'].map((level, index) => (
              <Grid key={level} item xs={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Typography>
                <Typography sx={{ color: '#f9f9f9' }}>
                  {loading ? 'Loading...' : highScores[level]}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ mt: 4, fontWeight: 600 }}>
            Start A New Game Below!
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {['beginner', 'intermediate', 'expert'].map((level) => (
              <Grid key={level} item xs={4}>
                <Link to="/game" style={{ textDecoration: 'none' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: level === 'beginner' ? '#00796b' : level === 'intermediate' ? '#0288d1' : '#d32f2f',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor:
                          level === 'beginner' ? '#004d40' : level === 'intermediate' ? '#01579b' : '#c2185b',
                      },
                    }}
                    onClick={() => onClick(level)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;

