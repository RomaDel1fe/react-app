import React, {useState} from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './ContactList.css';

const ContactList = ({ users, loading, dispatch }) => {
  const [hoveredUserId, setHoveredUserId] = useState(null);

  const textSyled = {
    color: 'white', 
    borderBottom: '2px solid #2b2f36',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontWeight: 500,
  }

  const handleDelete = (userId) => {
    dispatch({ type: 'DELETE_USER', payload: userId });
  }

  return (
    <div className='Wrapper'>
      <Box sx={{ overflow: 'hidden' }} className='TableContainer'>
        <Table sx={{ minWidth: 650 }} aria-label="simple sticky table" className='Table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...textSyled,  fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ ...textSyled,  fontWeight: 700 }}>Surname</TableCell>
              <TableCell sx={{ ...textSyled,  fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ ...textSyled,  fontWeight: 700 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <TableRow 
                  key={index} 
                >
                  <TableCell component="th" scope="row">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '15px', bgcolor: '#2b2f36' }} animation="wave"/>
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '15px', bgcolor: '#2b2f36' }} animation="wave"/>
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '15px', bgcolor: '#2b2f36' }} animation="wave"/>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 }, 
                    borderColor: '#2b2f36',
                    '&:hover': {
                      backgroundColor: '#2b2f36',
                      color: '#ffffff',
                    }
                  }}
                  onMouseEnter={() => setHoveredUserId(user.id)}
                  onMouseLeave={() => setHoveredUserId(null)}
                >
                  <TableCell component="th" scope="row" sx={ textSyled }>
                    {user.name.split(' ')[0]}
                  </TableCell>
                  <TableCell sx={ textSyled }>{user.name.split(' ')[1]}</TableCell>
                  <TableCell sx={ textSyled }>{user.phone}</TableCell>
                  <TableCell sx={ textSyled }>
                    {hoveredUserId === user.id ? (
                      <IconButton
                        color="inherit"
                        onClick={() => handleDelete(user.id)}
                      >
                        <DeleteIcon fontSize="small"/>
                      </IconButton>
                    ) : (
                      <IconButton
                        color="inherit"
                        style={{ visibility: "hidden"}}
                      >
                        <DeleteIcon fontSize="small"/>
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </div>
    
  );
}

export default ContactList;