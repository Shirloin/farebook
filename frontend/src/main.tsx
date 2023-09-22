import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import {
  RecoilRoot,
} from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
    <ToastContainer />
    <App />
    </RecoilRoot>
  </React.StrictMode>,
)
