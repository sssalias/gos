import { ReactKeycloakProvider } from '@react-keycloak/web'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/app/App.tsx'
import { authClient } from './auth/kk-config'
import AuthProvider from './auth/auth-provider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={authClient} initOptions={{onLoad: "login-required"}}>
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </ReactKeycloakProvider>
)
