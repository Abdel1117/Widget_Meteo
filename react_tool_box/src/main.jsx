import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FormProvier from './context/storeContextValue'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormProvier>
      <App />
    </FormProvier>
  </React.StrictMode>,
)
