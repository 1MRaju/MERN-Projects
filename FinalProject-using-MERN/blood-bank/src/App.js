import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
// import { ToastContainer, toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./Pages/Dashboard/Donar";
import Hospitals from "./Pages/Dashboard/Hospitals";
import Organisation from "./Pages/Dashboard/Organisation";
import Consumer from "./Pages/Dashboard/Consumer";
import Donation from "./Pages/Dashboard/Donation";
import Analytics from "./Pages/Dashboard/Analytics";
import DonarList from "./Pages/Admin/DonarList";
import HospitalList from "./Pages/Admin/HospitalList";
import OrgList from "./Pages/Admin/OrgList";
import AdminHome from "./Pages/Admin/AdminHome";

function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route 
        path="/" element={<ProtectedRoute>{<Home/>}</ProtectedRoute>}
        />

        <Route 
        path="/donar" element={<ProtectedRoute>{<Donar/>}</ProtectedRoute>}
        />

        <Route 
        path="/hospital" element={<ProtectedRoute>{<Hospitals/>}</ProtectedRoute>}
        />

        <Route 
        path="/organisation" element={<ProtectedRoute>{<Organisation/>}</ProtectedRoute>}
        />
        
        <Route 
        path="/consumer" element={<ProtectedRoute>{<Consumer/>}</ProtectedRoute>}
        />

        <Route 
        path="/donation" element={<ProtectedRoute>{<Donation/>}</ProtectedRoute>}
        />

        <Route 
        path="/analytics" element={<ProtectedRoute>{<Analytics/>}</ProtectedRoute>}
        />

        <Route 
        path="/donar-list" element={<ProtectedRoute>{<DonarList/>}</ProtectedRoute>}
        />

        <Route 
        path="/hospital-list" element={<ProtectedRoute>{<HospitalList/>}</ProtectedRoute>}
        />

        <Route 
        path="/org-list" element={<ProtectedRoute>{<OrgList/>}</ProtectedRoute>}
        />

        <Route 
        path="/admin" element={<ProtectedRoute>{<AdminHome/>}</ProtectedRoute>}
        />

        <Route 
        path="/login" element={<PublicRoute>{<Login/>}</PublicRoute>}
        />

        <Route 
        path="/register" element={<PublicRoute>{<Register/>}</PublicRoute>}
        />

      </Routes>
    </div>
  );
}

export default App;
