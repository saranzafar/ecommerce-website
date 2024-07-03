import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, ContactUs, Shop, Signup, Login, Cart, Wishlist, Admin, PageNotFound, SingleProduct } from "./pages/index.js";
import { AuthLayout } from './components/index.js';
import { Provider } from 'react-redux';
import store from './store/store.js';


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
        path: "/product/:id",
        element: (
          <SingleProduct />
        ),
      },
      {
        path: "/contact",
        element: (
          <ContactUs />
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
        path: "/admin",
        element: (
          <AuthLayout path="/admin">
            <Admin />
          </AuthLayout>
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
