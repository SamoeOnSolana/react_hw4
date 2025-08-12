import React, { useState } from 'react';

const PhoneBookWithEdit = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email && formData.phone) {
      if (editingId) {
        setUsers(prev => prev.map(user => 
          user.id === editingId ? { ...formData, id: editingId } : user
        ));
        setEditingId(null);
      } else {
        const newUser = {
          id: Date.now(),
          ...formData
        };
        setUsers(prev => [...prev, newUser]);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      });
    }
  };

  const startEdit = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    });
    setEditingId(user.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div style={{border: '1px solid blue', padding: '20px', margin: '10px'}}>
      <h2>завдання 2</h2>
      
      <div style={{border: '1px solid purple', padding: '15px', margin: '10px'}}>
        <h3>Телефонна книга з редагуванням</h3>
        
        <UserForm 
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancel={cancelEdit}
        />
        
        <UserListWithEdit 
          users={users} 
          onEdit={startEdit}
        />
      </div>
    </div>
  );
};

const UserForm = ({ formData, onInputChange, onSubmit, editingId, onCancel }) => {
  return (
    <form onSubmit={onSubmit} style={{border: '1px solid green', padding: '15px', margin: '10px'}}>
      <h4>{editingId ? 'Редагувати користувача:' : 'Додати користувача:'}</h4>
      
      <div style={{marginBottom: '10px'}}>
        <label>Ім'я:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onInputChange}
          required
          style={{marginLeft: '10px', padding: '5px'}}
        />
      </div>
      
      <div style={{marginBottom: '10px'}}>
        <label>Прізвище:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onInputChange}
          required
          style={{marginLeft: '10px', padding: '5px'}}
        />
      </div>
      
      <div style={{marginBottom: '10px'}}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          required
          style={{marginLeft: '10px', padding: '5px'}}
        />
      </div>
      
      <div style={{marginBottom: '15px'}}>
        <label>Телефон:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          required
          style={{marginLeft: '10px', padding: '5px'}}
        />
      </div>
      
      <div>
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: editingId ? 'lightgreen' : 'lightblue',
          border: `1px solid ${editingId ? 'green' : 'blue'}`,
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px'
        }}>
          {editingId ? 'Зберегти' : 'Додати'}
        </button>
        
        {editingId && (
          <button type="button" onClick={onCancel} style={{
            padding: '10px 20px',
            backgroundColor: 'lightcoral',
            border: '1px solid red',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Скасувати
          </button>
        )}
      </div>
    </form>
  );
};

const UserListWithEdit = ({ users, onEdit }) => {
  if (users.length === 0) {
    return (
      <div style={{border: '1px solid orange', padding: '15px', margin: '10px'}}>
        <h4>Список користувачів:</h4>
        <p>Поки що немає користувачів</p>
      </div>
    );
  }

  return (
    <div style={{border: '1px solid orange', padding: '15px', margin: '10px'}}>
      <h4>Список користувачів ({users.length}):</h4>
      {users.map(user => (
        <div key={user.id} style={{
          border: '1px solid gray',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '5px',
          backgroundColor: 'lightgray'
        }}>
          <p><strong>Ім'я:</strong> {user.firstName}</p>
          <p><strong>Прізвище:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Телефон:</strong> {user.phone}</p>
          
          <button onClick={() => onEdit(user)} style={{
            padding: '5px 15px',
            backgroundColor: 'lightyellow',
            border: '1px solid orange',
            borderRadius: '3px',
            cursor: 'pointer'
          }}>
            Редагувати
          </button>
        </div>
      ))}
    </div>
  );
};

export default PhoneBookWithEdit;
