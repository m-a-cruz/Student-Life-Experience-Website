import {
    createBrowserRouter,
  } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Home from './components/Home';
import Forms from './components/Forms';
import Dashboard from './components/Dashboard';
  
  // Define your routes
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      element: <App />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forms",
          element: <Forms />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ]
    },
    {
      path: "*",  // For handling undefined routes
      element: <Notfound />,
    },
  ]);
  
  export default routers;
  