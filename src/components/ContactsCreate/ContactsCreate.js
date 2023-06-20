import React, { useState } from 'react';
import Button from '../baseComponents/Button/Button';
import Input from '../baseComponents/Input/Input';
import './ContactsCreate.css';
  
const ContactsCreate = ({ handleAddUser }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!name || !surname || !phone) {
      return;
    }

    const id = Math.floor(Math.random() * 1000000);

    const newContact = { id, name: `${name} ${surname}`, phone };

    await handleAddUser(newContact); 

    setName('');
    setSurname('');
    setPhone('');
  };
  

  return(
    <form onSubmit={handleSubmit} className='FormContactsCreate'>
      <Input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input 
        type="text" 
        placeholder="Surname" 
        value={surname}
        onChange={e => setSurname(e.target.value)}
      />
      <Input 
        type="number" 
        placeholder="Phone" 
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <Button type="primary" label="Add" submit={true}/>
    </form>
  );
}

export default ContactsCreate;
