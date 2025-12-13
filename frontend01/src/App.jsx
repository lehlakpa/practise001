import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import YearlyPackages from "./pages/OurPackages";
import SubscriptionPackages from "./pages/TvPackages";
import Details from "./pages/Details";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ourpackages" element={<YearlyPackages />} />
        <Route path="/subscription" element={<SubscriptionPackages/>}/>
        <Route path="order" element={<Details />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
