import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import YearlyPackages from "./pages/OurPackages";
import SubscriptionPackages from "./pages/TvPackages";
import Details from "./pages/Details";
import AdminDashboard from "../srcadmin/PagesAdmin/DashBoard";
import ThankYou from "./pages/ThankYou";
import Products from "../srcadmin/PagesAdmin/AdminProducts";
import Customers from "../srcadmin/PagesAdmin/AdminCustomers";
import Orders from "../srcadmin/PagesAdmin/AdminOrders";
import Settings from "../srcadmin/PagesAdmin/AdminSetting";
import Profile from "./pages/Profile";
import AddPackages from "../srcadmin/PagesAdmin/AddPackages";
import { Toaster } from "react-hot-toast";
import TvPackages from "./component/TvPackages";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ourpackages" element={<YearlyPackages />} />
        <Route path="/tvpackages" element={<TvPackages/>}/>
        <Route path="order" element={<Details />} />
        <Route path="Dashboard" element={<AdminDashboard />} />
        <Route path="/thankyou" element={<ThankYou />} /> 
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/addpackages" element={<AddPackages />}/>
        <Route path="/editpackage/:id" element={<AddPackages />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
