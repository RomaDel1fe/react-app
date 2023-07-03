import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from '@mui/material';


export const CssTextField = styled(TextField)({
  '& label': {
    color: '#FFFFFF',
  },
  '& label.Mui-focused': {
    color: '#149ECA',
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#149ECA',
  },
  '& .MuiOutlinedInput-root': {
    width: '100%',
    '& fieldset': {
      borderColor: '#FFFFFF',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#149ECA',
    },
  },
});

export const StyledButton = styled(Button)({
  fontWeight: '600',
  color: '#FFFFFF',
  borderColor: '#149ECA',
  '&:hover': {
    color: '#FFFFFF',
    borderColor: '#097da4c3',
  },

});

export const StyledLink = styled(Link)({
  color: '#097da4c3',
  '&:hover': {
    textDecoration: 'underline',
  },
});