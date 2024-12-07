import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [localError, setLocalError] = useState('');

  const { name, email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Email already exists') {
      setLocalError(error); // Show specific backend error
      clearErrors(); // Clear error after showing it
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleRegisterSuccess = (token) => {
    // Save token in localStorage
    localStorage.setItem('authToken', token);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Clear previous error messages

    // Validate input fields
    if (!name || !email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      // Call register function with the form data
      const response = await register({ name, email, password });

      // Assuming the response contains the token
      const token = response.data.token;
      if (token) {
        handleRegisterSuccess(token); // Store the token for future requests
        props.history.push('/'); // Redirect to homepage after successful registration
      } else {
        setLocalError('No token received, please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      if (err.response && err.response.data) {
        setLocalError(err.response.data.msg || 'Registration failed, please try again.'); // Show specific error from backend
      } else {
        setLocalError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='container form-container'>
      <div className='row'>
        <form className='col s6' onSubmit={onSubmit}>
          {localError && <p className="error">{localError}</p>} {/* Display local errors */}

          <div className='row'>
            <div className='input-field col s9 offset-s8'>
              <input
                id='name'
                type='text'
                className='validate'
                onChange={onChange}
                value={name}
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
                onChange={onChange}
                value={email}
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
                onChange={onChange}
                value={password}
                required
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>

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

