import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Formik } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CssTextField, StyledButton } from '../../constants/Index';
import { initialValues, validate } from './constans';
import './Registration.css';


const Registration = () => {
  const { register, setRegistrationError, registrationError } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFieldChange = (e) => {
    if (e.target.name === "login" || e.target.name === "password" || e.target.name === "confirmPassword") {
      setRegistrationError(null);
    }
  };


  return(
    <div className='Form'>
      <h1 className='FormTitle'>Registretion</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          register({ username: values.login, password: values.passwordNew });
          setSubmitting(false);
          navigate('/');
        }}
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
                error={!!registrationError || (errors.login && touched.login)}
                id="login" 
                label="New Login" 
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
                helperText={registrationError || (errors.login && touched.login && errors.login)}
              />
            </div>
            <div className='FormRow'>
              <CssTextField
                error={!!registrationError || (errors.passwordNew && touched.passwordNew)}
                id="passwordNew" 
                label="New Password" 
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
                name="passwordNew"
                fullWidth
                onChange={e => {
                  handleChange(e); 
                  handleFieldChange(e);
                }}
                onBlur={handleBlur}
                value={values.passwordNew}
                helperText={registrationError || (errors.passwordNew && touched.passwordNew && errors.passwordNew)}
              />
            </div>
            <div className='FormRow'>
              <CssTextField
                error={!!registrationError || (errors.passwordNewConfirm && touched.passwordNewConfirm)}
                id="passwordNewConfirm" 
                label="Confirm New Password" 
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
                name="passwordNewConfirm"
                fullWidth
                onChange={e => {
                  handleChange(e); 
                  handleFieldChange(e);
                }}
                onBlur={handleBlur}
                value={values.passwordNewConfirm}
                helperText={registrationError || (errors.passwordNewConfirm && touched.passwordNewConfirm && errors.passwordNewConfirm)}
              />
            </div>
            <div className='FormAction'>
              <StyledButton 
                type="button"
                variant="outlined"
                onClick={() => navigate('/')}
              >
                Back
              </StyledButton>
              <StyledButton 
                type="submit" 
                variant="outlined" 
                disabled={isSubmitting}
              >
                Registration
              </StyledButton>
            </div>
          </form>

        )}
      </Formik>
    </div>
  );
}

export default Registration;