import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import EditItem from './EditItem';
import AddItem from './AddItem';
import ItemList from './ItemList';
import ProfileList from './ProfileList';

const App = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage on component mount
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      console.log('Retrieved items from local storage:', JSON.parse(storedItems));
      setItems(JSON.parse(storedItems));
    }else {
      console.log('No items found in local storage.');
    }
  }, []);

  const updateLocalStorage = (newItems) => {
    console.log('Saving items to local storage:', newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };


  const addItem = (item) => {
    const newItems = [...items, { id: Date.now(), ...item }];
    setItems(newItems);
    updateLocalStorage(newItems);
  };



  const editItem = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
     
  };



  const updateItem = (id, updatedItem) => {
    const newItems = items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item));
    setItems(newItems);
    setIsEditing(false);
    setCurrentItem(null);
    updateLocalStorage(newItems);
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    updateLocalStorage(newItems);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentItem(null);
  };

  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <h1>CRUD Application</h1>
              <div className="container">
                <div className="form-container">
                  {isEditing ? (
                    <EditItem item={currentItem} updateItem={updateItem} cancelEdit={cancelEdit} />
                  ) : (
                    <AddItem addItem={addItem} />
                  )}
                </div>
                <div className="table-container">
                  <ItemList items={items} editItem={editItem} deleteItem={deleteItem} />
                  <div className="view-button-container">
                    <Link to="/profiles">
                      <button className="view-button">View All Profiles</button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          } />
          <Route path="/profiles" element={<ProfileList items={items} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
