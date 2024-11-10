import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Homepage from './pages/Homepage.jsx'
import About from './pages/About.jsx'
import Charts from './pages/Charts.jsx'
import DisasterAlerts from './pages/DisasterAlerts.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Irrigation from './pages/Irrigation.jsx'
import Contact from './pages/Contact.jsx'
import CropSuggestion from './pages/CropSuggestion.jsx'
import Chatbot from './pages/Chatbot.jsx'
import CropsData from './pages/CropsData.jsx'
import Connect from './pages/Connect.jsx'
import Gallery from './pages/Gallery.jsx'
import WaterManagement from './pages/WaterConservation.jsx'
import Disease from './pages/Disease.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/About',
    element: <About />
  },
  {
    path: '/Charts',
    element: <Charts />
  },
  {
    path: '/DisasterAlerts',
    element: <DisasterAlerts />
  },
  {
    path: '/Irrigation',
    element: <Irrigation />
  },
  {
    path: '/contact',
    element: <Contact/>
  },
  {
    path: '/CropSuggestion',
    element: <CropSuggestion />
  },
  {
    path: '/chatbot',
    element: <Chatbot />
  },
  {
    path: '/cropdata',
    element: <CropsData />
  },
  {
    path: '/Expert',
    element: <Connect/>
  },
  {
    path: '/gallery',
    element: <Gallery />
  },
  {
    path: '/WaterManagement',
    element: <WaterManagement />
  },
  {
    path: '/disease-detection',
    element: <Disease />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)