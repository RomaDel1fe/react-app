import React, { useReducer, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Tabs from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import Tab, { tabClasses } from '@mui/base/Tab';
import Badge from '@mui/material/Badge';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import PersonAddSharp from '@mui/icons-material/PersonAddSharp';
import ContactList from '../../components/ContactsList/ContactList'
import ContactsCreate from '../../components/ContactsCreate/ContactsCreate'     
import './Contacts.css'


const SET_USERS = "SET_USERS";
const ADD_USER = "ADD_USER";

const StyledTab = styled(Tab)`
font-family: IBM Plex Sans, sans-serif;
color: white;
cursor: pointer;
dispaly: flex;
flex: 50%;
align-items: center;
gap: 10px;
font-size: 0.875rem;
font-weight: bold;
background-color: transparent;
width: 100%;
padding: 12px;
margin: 6px 6px;
border: none;
border-radius: 7px;
display: flex;
justify-content: center;
transition: all .3s easy;

&:hover {
  background-color: #58afdf1a;
  color: #097ea4;
}

&:focus {
  color: #fff;
  outline: 3px solid #80BFFF;
}

&.${tabClasses.selected} {
  background-color: #097ea4;
  color: #ffffff;
}

&.${buttonClasses.disabled} {
  opacity: 0.5;
  cursor: not-allowed;
}
`;

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const StyledTabsList = styled(TabsList)(
  `
  min-width: 400px;
  background-color: #23272f;
  border-radius: 12px;
  border: 2px solid #2b2f36;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `,
);

function reducer(state, action) {
  switch(action.type) {
    case SET_USERS:
      return action.payload;
    case ADD_USER:
      return [...state, action.payload];
    case 'DELETE_USER':
      return state.filter(user => user.id !== action.payload);
    default:
      return state;
  }
}

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [users, dispatch] = useReducer(reducer, []);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [value, setValue] = useState(1);
  const [updateKey, setUpdateKey] = useState(0);
  const [hasNewContact, setHasNewContact] = useState(false);
  const [newContactCount, setNewContactCount] = useState(0);


  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch data from API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Dispatch action to set users
        dispatch({ type: 'SET_USERS', payload: data });

        // Turn off the loading state
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (value === 1) {
        setHasNewContact(false);
    }
  }, [value]);
  useEffect(() => {
    if (value === 1) {
        setNewContactCount(0); // reset newContactCount when user visits 'Contacts' tab
    }
  }, [value]);  

  const handleAddUser = (user) => {
    dispatch({ type: 'ADD_USER', payload: user });
    setNewContactCount(prevCount => prevCount + 1); // increment newContactCount when a new user is added
    setUpdateKey(prevKey => prevKey + 1);
  };


  const handleDelete = (userId) => {
    dispatch({ type: 'DELETE_USER', payload: userId });
  }

  return (
    <Tabs value={value} onChange={handleTabsChange} key={updateKey}> 
      <StyledTabsList>
        <StyledTab value={1}>
          <Badge  badgeContent={newContactCount} color="primary" className='TabBadge'>
            <GroupSharpIcon />Contacts
          </Badge>
        </StyledTab>
        <StyledTab value={2}><PersonAddSharp />Create contact</StyledTab>
      </StyledTabsList>
      <StyledTabPanel value={1}> <ContactList users={users} dispatch={dispatch} /> </StyledTabPanel>
      <StyledTabPanel value={2}> <ContactsCreate handleAddUser={handleAddUser} /> </StyledTabPanel>
    </Tabs>
  );
}

export default Contacts;

