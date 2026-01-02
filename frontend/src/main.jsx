import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary'; // Import the Error Boundary

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary> {/* Wrap App with ErrorBoundary */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);