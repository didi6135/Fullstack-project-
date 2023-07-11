import { createBrowserRouter, Outlet } from "react-router-dom";
import { AddNewTrip } from "../components/TripArea/addNewTrip/AddNewTrip";
import { ModelConnect } from "../components/connectArea/ModelConnect";
import { Navbar } from "../components/navbar/Navbar";
import { VacationPage } from "../components/VacationPage/VacationPage";
import { EditTrip } from "../components/TripArea/editTrip/EditTrip";




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
                <ModelConnect/>
                <AddNewTrip/>
                </>
            },
            {
                path: '/vacationPage',
                element: <>
                <VacationPage/>
                </>
            },
            {
                path: '/editVacation/:id',
                element: <>
                <EditTrip/>
                </>
            }
        ]
    }
])