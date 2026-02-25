import Navbar from "./Navbar";
import Footer from "./Footer.jsx";
import SocialFloat from "../ui/SocialFloat";

export default function Layout({ children, whatsappMessage }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SocialFloat whatsappMessage={whatsappMessage} />
    </div>
  );
}