// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import AppRouter from './router';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <div className="App">
            <AppRouter />
          </div>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;