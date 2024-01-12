import Login from 'main-app/pages/Login/Login';
import Register from 'main-app/pages/Register/Register';
import Homepage from 'main-app/pages/Homepage/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from 'main-app/components/helper/ProtectedRoute';
import PublicRoute from 'main-app/components/helper/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
