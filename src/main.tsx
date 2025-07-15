import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import JuegoDetalle from './pages/user/JuegoDetalle';
import ConfirmarEmail from './pages/user/ConfirmarEmail.tsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/user/HomePage.tsx'
import PagoCarrito from './pages/user/CarroCompras/PagoCarrito.tsx';
import EmailConfirm from './pages/user/ConfirmarEmail.tsx';
import ResetPage from './pages/ResetPage.tsx';
import MainPage from './pages/admin/MainPage.tsx';
import GamePage from './pages/admin/game/GamePage.tsx';
import GameAddPage from './pages/admin/game/add/GameAddPage.tsx';
import GameEditPage from './pages/admin/game/edit/GameEditPage.tsx';
import GameDetailsPage from './pages/admin/game/details/GameDetailsPage.tsx';
import ResenaConfirm from './pages/user/ResenaConfirm.tsx';
import ChangePage from './pages/user/ChangePage.tsx';
import NewsPage from './pages/admin/news/NewsPage.tsx'
import NewsAddPage from './pages/admin/news/add/NewsAddPage.tsx';
import NewsEditPage from './pages/admin/news/edit/NewsEditPage.tsx'
import Catalogo from './pages/user/CatalogoPage.tsx';
import GameSearch from './pages/admin/filter/GameFilter.tsx'
import ConfirmatedEmail from './pages/user/ConfirmadoEmail.tsx'
import NewsDetails from './pages/admin/news/details/NewsDetailsPage.tsx'

export const API_URL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/2025-1.656-1.Proyecto_Web'>
      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/user/confirmar" element={<ConfirmarEmail/>} />
        <Route path="/user/home" element={ <HomePage /> } />
        <Route path='/user/reset' element={ <ResetPage/> } />
        <Route path="/user/juego" element={<JuegoDetalle />} />
        <Route path='/user/edit' element={ <ChangePage />} />
        <Route path="/user/pago" element={<PagoCarrito />} />
        <Route path="/confirmar" element={<EmailConfirm />} />
        <Route path="/user/resenaconfirm" element={<ResenaConfirm />} />
        <Route path="/user/catalogo" element={<Catalogo />} />
        <Route path="/admin" element={ <MainPage /> } />
        <Route path="/admin/game" element={ <GamePage /> } />
        <Route path="/admin/game/add" element={ <GameAddPage /> } />
        <Route path="/admin/game/edit/:id" element={<GameEditPage />} />
        <Route path="/admin/game/details/:id" element={<GameDetailsPage />} />
        <Route path="/admin/news" element={ <NewsPage /> } />
        <Route path="/admin/news/add" element={ <NewsAddPage/>} />
        <Route path="/admin/news/edit/:id" element={<NewsEditPage />} />
        <Route path="/admin/search" element={<GameSearch />} />
        <Route path="/user/confirmated" element={<ConfirmatedEmail />} />
        <Route path="/admin/news/details/:id" element={<NewsDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)