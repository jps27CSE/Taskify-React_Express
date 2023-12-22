import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <ToastContainer />
        <Outlet />
      </div>
    </>
  );
}

export default App;
