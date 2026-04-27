import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/dashboard/Dashboard";
import Features from "../pages/features/Features";

export const router = new createBrowserRouter([
    {
    path:"/",
    element:<Layout/>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/about",
            element:<About/>
        },
        {
            path:"/features",
            element:<Features/>
        },
        {
            path:"/signup",
            element: <Signup/>
        },
        {
            path:"/signin",
            element: <Signin/>
        },
        {
            path:"/dashboard",
            element:<ProtectedRoutes>
                <Dashboard/>
            </ProtectedRoutes>
        }
    ]
    }
]);