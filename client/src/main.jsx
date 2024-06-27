import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'flowbite';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, About, Cart, Shop, Wishlist, PageNotFound } from "./pages/index.js";


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
        path: '/about',
        element: (
          <About />
        )
      },
      {
        path: "/wishlist",
        element: (
          <Wishlist />
        ),
      },
      {
        path: "/cart",
        element: (
          <Cart />
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
