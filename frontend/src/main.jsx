import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { router } from './routes/router'
import App from './App'
import { Provider } from 'react-redux'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {store} from "./app/store"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from './config/config';
createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
  <GoogleOAuthProvider clientId={config.googleClientId}>
  <RouterProvider router={router}/>
  </GoogleOAuthProvider>
  <ToastContainer/>
  </Provider>
  </>
)
