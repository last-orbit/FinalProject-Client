import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import AboutUs from './pages/AboutUs/AboutUs';
import ImagePage from './pages/ImagePage/ImagePage';
import MyCollection from './pages/CollectionPage/MyCollection';
import { ProtectedRoute } from './components/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';
import SignupPage from './pages/SignUpPage/SignUp';

import ShufflePage from './pages/ShuffePage/ShufflePage';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/i-wanna-be-part-of-this' element={<SignupPage />} />
        <Route path='/you-shall-not-pass' element={<LoginPage />} />
        <Route
          path='/'
          element={
              <HomePage />
          }
        />
        <Route
          path='/for-frodo'
          element={
            <ProtectedRoute>
              <ImagePage />
            </ProtectedRoute>
          }
        />

        <Route path='/fellowship' element={<AboutUs />} />
        <Route
          path='/my-precious'
          element={
            <ProtectedRoute>
              <MyCollection />
            </ProtectedRoute>
          }
        />
        <Route
          path='/the-eagles-are-coming'
          element={
            <ProtectedRoute>
              <ShufflePage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
