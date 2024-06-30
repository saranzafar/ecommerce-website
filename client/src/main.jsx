import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, ContactUs, Shop, Signup, Login, Cart, Wishlist, PageNotFound } from "./pages/index.js";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home />
        ),
      },
      {
        path: "/shop",
        element: (
          <Shop />
        ),
      },
      {
        path: "/contact",
        element: (
          <ContactUs />
        ),
      },
      {
        path: "/cart",
        element: (
          <Cart />
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Wishlist />
        ),
      },
      {
        path: "/signup",
        element: (
          <Signup />
        ),
      },
      {
        path: "/login",
        element: (
          <Login />
        ),
      },
      {
        path: "*",
        element: (
          <PageNotFound />
        ),
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
