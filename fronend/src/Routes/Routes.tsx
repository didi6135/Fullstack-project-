import { createBrowserRouter, Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { VacationPage } from "../components/VacationPage/VacationPage";
import { EditTrip } from "../components/TripArea/editTrip/EditTrip";
import { PrivateArea } from "../components/privteArea/PrivateArea";
import { ManageArea } from "../components/manageArea/ManageArea";
import { HomePage } from "../components/HomePage/HomePage";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <>
        <Navbar/>
        <Outlet/>
        </>
        ,
        children: [
            {
                path: '/home',
                element: <>
                <HomePage/>
                </>
            },
            {
                path: '/vacationPage',
                element: <>
                <VacationPage/>
                </>
            },
            {
                path: '/privateArea/:id',
                element: <>
                <PrivateArea />
                </>
            },
            {
                path: '/manageArea/:id',
                element: <>
                <ManageArea />
                </>
            }
        ]
    }, 
    {
        path: '/editVacation/:id',
        element: <>
        <EditTrip/>
        </>  
    }
])