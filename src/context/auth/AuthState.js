import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
} from '../types';

// Backend URL
const BASE_URL = 'https://memory-backend-production-1b1e.up.railway.app';

const AuthState = (props) => {
  // Declare initial state
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  // Declare state/dispatch with useReducer hook
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    // Check if localStorage has a token and setAuthToken if so
    if (localStorage.token) {
      setAuthToken(localStorage.token);  // Ensure this function sets the Authorization header
    }

    try {
      // Use the backend URL
      const res = await axios.get(`${BASE_URL}/api/auth`);  // Adjust this to the correct endpoint for user loading

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response?.data?.msg || 'Error loading user',
      });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Use the backend URL
      const res = await axios.post(`${BASE_URL}/api/users`, formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();  // Call loadUser to get user data after successful registration
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response?.data?.msg || 'Registration failed',
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Use the backend URL
      const res = await axios.post(`${BASE_URL}/api/auth`, formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();  // Call loadUser to get user data after successful login
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response?.data?.msg || 'Login failed',
      });
    }
  };

  // Logout
  const logout = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  // UseEffect to load user when the component mounts (i.e., on refresh or app start)
  useEffect(() => {
    if (state.token) {
      loadUser();  // Load user if token exists in state
    } else {
      dispatch({ type: AUTH_ERROR });  // If no token, trigger auth error
    }
  }, [state.token]);  // Depend on token state to re-trigger on changes

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
