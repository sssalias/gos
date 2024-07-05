import { ReactKeycloakProvider } from '@react-keycloak/web'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/app/App.tsx'
import { authClient } from './auth/kk-config'
import AuthProvider from './auth/auth-provider'
import { BrowserRouter } from 'react-router-dom'
import NotificationsProvider from './api/providers/notifications-provider'
import LongPullingProvider from './api/providers/long-pulling-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={authClient} initOptions={{onLoad: "login-required"}}>
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <NotificationsProvider>
            <LongPullingProvider>
              <App/>
            </LongPullingProvider>
          </NotificationsProvider>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </ReactKeycloakProvider>
)
