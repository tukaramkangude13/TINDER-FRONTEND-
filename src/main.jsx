import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Body } from './components/Body.jsx'
import { Provider } from 'react-redux'
import appStore from './components/utils/appStore.js'
createRoot(document.getElementById('root')).render(

  <Provider store={appStore}><Body /></Provider>
  
)
