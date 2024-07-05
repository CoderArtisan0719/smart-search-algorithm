import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface Entity {
  id: number;
  name: string;
}

interface Result {
  city?: Entity;
  brand?: Entity;
  dish_type?: Entity;
  diet?: Entity;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Result[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get<Result[]>('http://localhost:3001/extractEntities', {
        params: { searchTerm }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Entity Extractor</h1>
        <input
          className="input-field"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <button className="button" onClick={handleSearch}>Search</button>
        <div className="results">
          {results.map((result, index) => (
            <div key={index} className="result">
              {
                Object.entries(result).length > 0 ? (
                  Object.entries(result).map(([key, value]) => (
                    <div key={key}>
                      <span className='result-key'>{key}:</span> {value?.name}
                    </div>
                  ))
                ) : <div>No Result</div>
              }
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
