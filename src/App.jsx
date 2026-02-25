import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Seo from "./components/seo/Seo";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <Seo path={pathname} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<DestinationDetails />} />

        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:slug" element={<PackageDetails />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}