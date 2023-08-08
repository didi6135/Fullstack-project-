import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./Routes/Routes";


function App() {
  return <>
  <ToastContainer/>
  <RouterProvider router={router} />
  </>
}

export default App;
