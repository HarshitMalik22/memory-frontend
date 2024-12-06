import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';

const Register = (props) => {
  // Declare and destructure authContext
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  // Declare and destructure component level state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Declare state for local error handling
  const [localError, setLocalError] = useState('');

  const { name, email, password } = user;

  // If user is signed in, redirect to homepage
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    // If errors, alert user and clear errors
    if (error) {
      alert(error);
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // Store user input on change
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // Register user with input object on form submit
  const onSubmit = async (e) => {
    e.preventDefault();

    // Clear previous local error messages
    setLocalError('');

    // Validate input fields
    if (!name || !email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    // Register the user via the authContext method
    try {
      await register({
        username: name,  // Adjust based on API requirement
        email,
        password,
      });
    } catch (err) {
      // Handle backend error here
      console.error('Registration error:', err.response ? err.response.data : err.message);
      if (err.response && err.response.data) {
        setLocalError(err.response.data); // Show specific error from backend
      } else {
        setLocalError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='container form-container'>
      <div className='row'>
        <form className='col s6' onSubmit={onSubmit}>
          <div className='row'>
            <div className='input-field col s9 offset-s8'>
              <input
                id='name'
                type='text'
                className='validate'
                value={name}
                onChange={onChange}
                required
              />
              <label htmlFor='user-name'>Username</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s9 offset-s8'>
              <input
                id='email'
                type='email'
                className='validate'
                value={email}
                onChange={onChange}
                required
              />
              <label htmlFor='email'>Email</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s9 offset-s8'>
              <input
                id='password'
                type='password'
                className='validate'
                value={password}
                onChange={onChange}
                required
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          
          {localError && (
            <div className="row red-text">
              <p>{localError}</p>
            </div>
          )}
          
          <div className='row'>
            <button
              className='btn waves-effect waves-light red lighten-2 col s9 m5 offset-s8 offset-m10'
              type='submit'
              name='action'
            >
              Register
              <i className='material-icons right'>send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
