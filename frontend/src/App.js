import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import News from "./pages/News";
import Magazine from "./pages/Magazine";
import Stories from "./pages/Stories";
import Admin from "./pages/Admin";
import TechnicalNews from "./pages/TechnicalNews";
import NonTechnicalNews from "./pages/NonTechnicalNews";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";
import BreakingNewsBar from "./components/BreakingNewsBar";
import ScrollToTop from "./components/ScrollToTop";
import Events from "./pages/Events";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />   {/* ✅ THIS LINE */}
    <Navbar />
    <BreakingNewsBar />   {/* 👈 RIGHT HERE */}
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/technical" element={<TechnicalNews />} />
        <Route path="/news/non-technical" element={<NonTechnicalNews />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:type" element={<Events />} />



      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
