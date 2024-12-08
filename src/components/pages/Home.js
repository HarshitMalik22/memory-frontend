import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';
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

  useEffect(() => {
    authContext.loadUser();
    getGames();
  }, []);

  const fetchHighscore = async (level) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token missing');
      return 'Token is missing';
    }

    const res = await fetch(`${BASE_URL}/api/highscore/${level}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
    }

    const data = await res.json();

    // Ensure proper response structure handling
    if (data && data.moves !== undefined) {
      return data.moves;
    } else {
      return 'No high score yet';
    }
  } catch (err) {
    console.error('Error fetching high score:', err);
    return 'Error fetching high score';
  }
};


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

  const handleClick = (e) => {
    const themeName = e.target.name;
    updateCurrentTheme(themeName);
  };

  const onClick = (level) => {
    updateCurrentLevel(level);
  };

  return (
    !authContext.loading && (
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f4f9' }}>
        <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2, backgroundColor: '#3b3b3b' }}>
          <CardContent sx={{ textAlign: 'center', color: '#ffffff' }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Your High Scores (Lowest number of moves you took to complete the game):
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Easy</Typography>
                <Typography sx={{ color: '#f9f9f9' }}>{loading ? 'Loading...' : highScores.beginner}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Medium</Typography>
                <Typography sx={{ color: '#f9f9f9' }}>{loading ? 'Loading...' : highScores.intermediate}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Hard</Typography>
                <Typography sx={{ color: '#f9f9f9' }}>{loading ? 'Loading...' : highScores.expert}</Typography>
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
                    onClick={() => onClick('beginner')}
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
                    onClick={() => onClick('intermediate')}
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
                    onClick={() => onClick('expert')}
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

