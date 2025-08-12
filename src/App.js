import React from 'react';
import PhoneBook from './PhoneBook';
import PhoneBookWithEdit from './PhoneBookWithEdit';
import PhoneBookWithDelete from './PhoneBookWithDelete';
import PhoneBookWithSearch from './PhoneBookWithSearch';

function App() {
  return (
    <div>
      <h1>дз телефонна книга</h1>
      
      <PhoneBook />
      <PhoneBookWithEdit />
      <PhoneBookWithDelete />
      <PhoneBookWithSearch />
    </div>
  );
}

export default App;
