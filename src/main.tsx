import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from 'src/app/App.tsx'

import {NextUIProvider} from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { authClient, AuthProvider } from 'src/processes/auth'
import { AppealPullingProvider } from 'src/features/appeal-pulling'

createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={authClient} initOptions={{onLoad: "login-required"}}>
    <StrictMode>
      <NextUIProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppealPullingProvider>
              <App />
            </AppealPullingProvider>
          </AuthProvider>
        </BrowserRouter>
      </NextUIProvider>
    </StrictMode>
  </ReactKeycloakProvider>,
)
