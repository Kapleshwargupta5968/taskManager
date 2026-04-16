import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import ProtectedRoutes from "./ProtectedRoutes";
import UserDashboard from "../pages/dashboard/UserDashboard";

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
                <UserDashboard/>
            </ProtectedRoutes>
        }
    ]
    }
])