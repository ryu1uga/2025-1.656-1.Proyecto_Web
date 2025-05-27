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
import CartPage from './pages/user/CartPage.tsx';
import ResenaPage from './pages/user/ResenaPage/ResenaPage.tsx';
import ResenaConfirm from './pages/user/ResenaConfirm.tsx';
import ChangePage from './pages/user/ChangePage.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/user/confirmar" element={<ConfirmarEmail enviar={() => {}} />} />
        <Route path="/user/home" element={ <HomePage /> } />
        <Route path='/user/reset' element={ <ResetPage/> } />
        <Route path="/user/juego" element={<JuegoDetalle />} />
        <Route path='/user/edit' element={ <ChangePage />} />
        <Route path="/user/carrito" element={<CartPage />} />
        <Route path="/user/pago" element={<PagoCarrito />} />
        <Route path="/user/confirmar" element={<EmailConfirm enviar={() => {}} />} />
        <Route path="/user/resena" element={<ResenaPage/>} />
        <Route path="/user/resenaconfirm" element={<ResenaConfirm />} />
        <Route path="/admin" element={ <MainPage /> } />
        <Route path="/admin/game" element={ <GamePage /> } />
        <Route path="/admin/game/add" element={ <GameAddPage /> } />
        <Route path="/admin/game/edit/:id" element={<GameEditPage />} />
        <Route path="/admin/game/details" element={<GameDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)