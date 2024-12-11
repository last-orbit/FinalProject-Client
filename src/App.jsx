import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import AboutUs from './pages/AboutUs/AboutUs';

import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <main>
      <Routes>
        {/* <Route path='/' element={<SignupPage />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<ProtectedRoute>
          <HomePage />

        </ProtectedRoute>
        }/>
        <Route path='/about-us' element={<AboutUs />} />

      </Routes>
    </main>
  );
}

export default App;
