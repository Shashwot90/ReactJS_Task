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

  


  const addItem = (item) => {
    setItems([...items, { id: Date.now(), ...item }]);
  };



  const editItem = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
  };



  const updateItem = (id, updatedItem) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
    setIsEditing(false);
    setCurrentItem(null);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
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
