import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import MyOrder from './views/MyOrder/MyOrder';

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Home/>
    },
    {
        path : '/login',
        element : <Login/>
    },
    {
        path : '/signup',
        element : <Signup/>
    },
    {
        path : '/myorder',
        element : <MyOrder/>
    },

])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);


