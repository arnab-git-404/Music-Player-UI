// src/components/SearchBar.js
import React, { useContext, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { MusicContext } from '../context/MusicContext';
import '../styles/SearchBar.scss';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(MusicContext);
  const [focused, setFocused] = useState(false);
  
  const handleClear = () => {
    setSearchTerm('');
  };
  
  return (
    <div className="search-container">
      <InputGroup className={`search-bar ${focused ? 'focused' : ''}`}>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        
        <Form.Control
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        
        {searchTerm && (
          <InputGroup.Text 
            className="clear-button"
            onClick={handleClear}
          >
            <FaTimes />
          </InputGroup.Text>
        )}
      </InputGroup>
    </div>
  );
};

export default SearchBar;