import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from 'src/app/App.tsx'

import {NextUIProvider} from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>,
)
