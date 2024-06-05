import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,Routes, Route } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/HomePage.jsx';
import Signup from './pages/Signup';
import Login from './pages/Login.jsx';
import MoviePage from './pages/MoviePage';
import SavedMovies from './pages/SavedMovies';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';

import { AuthProvider } from './utils/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/savedmovies',
        element: <SavedMovies />
      }, {
        path: '/movie',
        element: < MoviePage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <AuthProvider> 
    <Routes> {/* Use Routes component */}
    {router}
      </Routes>
    </AuthProvider>
  </RouterProvider>
)