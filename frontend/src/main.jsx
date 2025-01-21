import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
  
/*StrictMode is a wrapper component used to highlight potential issues in the
development of the application, so we render the app inside it, it doesnt affect 
the production */
