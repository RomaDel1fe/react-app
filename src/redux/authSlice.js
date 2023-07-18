import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const storedUsers = localStorage.getItem('users');
const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  loginError: null,
  passwordError: null,
  registrationError: null,
  users: parsedUsers.length > 0 ? parsedUsers : [
    { username: 'romad', password: 'Vlad1986imir' },
    { username: 'alexx', password: 'Alex12345' },
  ],
};

export const login = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find((user) => user.username === userCredentials.login);
  const passwordCorrect = user && user.password === userCredentials.password;
  if (user) {
    if (passwordCorrect) {
      localStorage.setItem('isLoggedIn', 'true');
      return userCredentials;
    } else {
      return rejectWithValue({ passwordError: 'Invalid password' });
    }
  } else {
    return rejectWithValue({ loginError: 'User not found' });
  }
});

export const register = createAsyncThunk('auth/register', async (newUser, { rejectWithValue }) => {
  let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = storedUsers.find((user) => user.username === newUser.username);
  if (existingUser) {
    return rejectWithValue({ registrationError: 'User already exists' });
  } else {
    storedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(storedUsers)); 
    return newUser;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('isLoggedIn');
      state.isLoggedIn = false;
      state.loginError = null;
      state.passwordError = null;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setRegistrationError: (state, action) => {
      state.registrationError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login fulfilled, action: ', action);
        state.isLoggedIn = true;
        state.loginError = null;
        state.passwordError = null;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('Login rejected, action: ', action);
        state.loginError = action.payload.loginError;
        state.passwordError = action.payload.passwordError;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.users = [...state.users, action.payload];
        state.registrationError = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.registrationError = action.payload.registrationError;
      });
  },
});

export const { logout, setLoginError, setPasswordError, setRegistrationError } = authSlice.actions;

export default authSlice.reducer;
