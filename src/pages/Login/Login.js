import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Formik } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CssTextField, StyledButton, StyledLink } from '../../constants/Index'
import { initialValues, validate, onSubmit } from './constans';
import './Login.css';

const Login = () => {
  const { isLoggedIn, login, logout, setLoginError, setPasswordError, loginError, passwordError } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    logout();
  };
  const handleFieldChange = (e) => {
    if (e.target.name === "login") {
      setLoginError(null);
    } else if (e.target.name === "password") {
      setPasswordError(null);
    }
  };

  if (isLoggedIn) {
    return (
      <div className='Form'>
        <h1 className='FormTitle'>You are logged in</h1>
        <StyledButton variant="outlined" onClick={handleLogout}>
          Logout
        </StyledButton>
      </div>
    );
  }

  return (
    <div className='Form'>
      <h1 className='FormTitle'>Log in to see more</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit(login, setLoginError, setPasswordError)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className='Login'>
            <div className='FormRow'>
              <CssTextField
                error={!!loginError || (errors.login && touched.login)}
                id="login" 
                label="Login" 
                variant="outlined"
                size="small"
                type="text"
                name="login"
                fullWidth
                onChange={e => {
                  handleChange(e); 
                  handleFieldChange(e);
                }}
                onBlur={handleBlur}
                value={values.login}
                helperText={loginError || (errors.login && touched.login && errors.login)}
              />
            </div>
            <div className='FormRow'>
              <CssTextField
                error={!!passwordError || (errors.password && touched.password)}
                id="password" 
                label="Password" 
                variant="outlined"
                size="small"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment:(
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon style={{ color: '#149ECA' }}/> : <VisibilityIcon style={{ color: '#FFFFFF' }}/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                name="password"
                fullWidth
                onChange={e => {
                  handleChange(e); 
                  handleFieldChange(e);
                }}
                onBlur={handleBlur}
                value={values.password}
                helperText={passwordError || (errors.password && touched.password && errors.password)}
              />
            </div>
            
            <StyledButton 
              type="submit" 
              variant="outlined" 
              disabled={isSubmitting}
            >
              Login
            </StyledButton>
            <StyledLink
              href="/registration"
              underline="always"
            >
            {'Registration'}
            </StyledLink>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
