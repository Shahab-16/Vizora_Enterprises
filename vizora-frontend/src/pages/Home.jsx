import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import home from "../assets/images/home.png";
import vizoraLogo from "../assets/images/vizoraLogo.png";
import vizoraLogoDark from "../assets/images/vizoraLogoDark.png";
import sofa_banner from "../assets/images/sofa_banner.png";
import homeDark from "../assets/images/homeDark.png";
import room_home from "../assets/images/room_home.png";
import chair from "../assets/images/chair.png";
import kajaria from "../assets/images/kajaria.png";
import dulux from "../assets/images/dulux.png";
import asian_paints from "../assets/images/asian_paints.png";
import berger from "../assets/images/berger.png";
import somany_tiles from "../assets/images/somany_tiles.png";
import apply_design from "../assets/images/apply_design.png";
import {
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import UserContext from "../context/userContext";

const Home = () => {
  const [feature, setFeature] = useState(1);
  const [showBackground, setShowBackground] = useState(window.innerWidth > 959);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth > 959);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#0e0f11] text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-5 px-5 lg:px-24 bg-[#0d0e10] border-b border-gray-800">
        <img src={vizoraLogo} alt="Logo" className="w-[120px]" />
        <ul className="hidden lg:flex space-x-10 font-medium text-lg">
          {["Products", "How We Work?", "Contact Us"].map((item, idx) => (
            <li key={idx} className="cursor-pointer hover:text-primary-purple transition">
              {item}
            </li>
          ))}
        </ul>
        <Link
          to="/login"
          className="border-2 border-primary-purple text-primary-purple rounded-md px-6 py-2 hover:bg-primary-purple hover:text-white transition"
        >
          Login
        </Link>
      </nav>

      {/* Hero */}
      <section
        className="w-full lg:h-[100vh] px-5 lg:px-24 bg-no-repeat bg-right"
        style={{
          backgroundImage: showBackground ? `url(${homeDark})` : "none",
          backgroundSize: "58vw 75vh",
        }}
      >
        <div className="mr-[10%] pt-10 lg:pt-40 text-5xl lg:text-6xl font-bold leading-snug">
          Transform Your <br className="hidden lg:block" />
          Space with <br className="hidden lg:block" />
          Firefly's 3D 
          <br />
          Visualization
        </div>
        <p className="mt-7 lg:w-1/2 text-gray-300 lg:text-xl font-medium">
          Visualize your dream home in real-time with our cutting-edge 
          <br />technology.
        </p>
        <Link
          to="/login"
          className="inline-block mt-16 bg-primary-purple text-white py-4 px-8 lg:px-6 lg:py-3 text-3xl lg:text-xl rounded-md hover:bg-purple-700 transition"
        >
          Start for free
        </Link>
      </section>

      {!showBackground && (
        <div className="mt-5 lg:hidden">
          <img src={home} alt="Home" className="w-full rounded-md" />
        </div>
      )}

      {/* Features */}
      <section className="py-20 px-5 lg:px-24 bg-[#111215]">
        <h2 className="text-4xl font-bold text-center mb-8">
          Transform Your Space with Firefly's 3D Visualization
        </h2>

        <div className="hidden lg:flex justify-center space-x-8 mb-16">
          {["Furniture", "3D Interior model", "Customisation"].map((label, i) => (
            <button
              key={i}
              onClick={() => setFeature(i + 1)}
              className={`px-5 py-2 rounded-full border-2 ${feature === i + 1
                ? "border-primary-purple text-primary-purple"
                : "border-gray-600 text-gray-400"
                } font-semibold transition`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              onClick={() => setFeature(i)}
              className={`flex-1 bg-[#1a1b1e] rounded-xl p-6 border transition-all duration-300 ${feature === i
                ? "border-primary-purple shadow-lg"
                : "border-gray-700 hover:shadow-xl cursor-pointer"
                }`}
            >
              <div className="rounded-xl p-4 border border-gray-600 bg-[#2a2a2a] mb-4">
                <img className="mx-auto" width={150} height={150} src={chair} alt="Chair" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {["Visualize Furniture with 3D Models", "Experience Your Space", "Tailored to Your Taste"][i - 1]}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {[
                  "Upload your room plan & receive a customized design draft in 30 minutes.",
                  "Use 3D interior modeling to preview your space.",
                  "Customize interiors to reflect your unique style.",
                ][i - 1]}
              </p>
              {feature === i && (
                <Link
                  to="/login"
                  className="mx-auto bg-primary-purple text-white rounded-md py-2 px-6 font-medium"
                >
                  Try for Free
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-5 lg:px-24 bg-[#121317]">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">
          Try Designs On 3D Space
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array(4).fill(0).map((_, i) => (
            <div
              key={i}
              className="bg-[#1c1d1f] rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={apply_design}
                  alt={`room design ${i + 1}`}
                  className="rounded-lg mx-auto transition-transform duration-300 hover:scale-105"
                />
              </div>
              <Link
                to="/login"
                className="mt-4 w-full border-2 border-primary-purple text-primary-purple text-md rounded-md py-2 font-semibold hover:bg-primary-purple hover:text-white transition-colors duration-300"
              >
                Apply Design
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative text-white text-center py-20 lg:py-32 bg-cover bg-center" style={{ backgroundImage: `url(${room_home})` }}>
        <p className="text-4xl lg:text-5xl font-semibold mb-8">
          Experience efficient design solutions for your space today!
        </p>
        <Link
          to="/login"
          className="bg-[#ef7e70] hover:bg-[#dd6d60] transition rounded-full text-xl lg:text-3xl px-12 lg:px-24 py-5 lg:py-8 font-semibold"
        >
          Start your Journey
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0e10] text-white px-5 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center lg:text-left items-start">
          <div>
            <div className="mb-4 flex justify-center lg:justify-start">
              <img src={vizoraLogoDark} alt="Vizora Logo" className="w-40" />
            </div>
            <p className="text-sm text-gray-400">
              Revolutionizing interior design with 3D visualization.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Helpline</h4>
            <p className="text-lg text-gray-200">+91 7855088560</p>
            <p className="text-sm mt-2 text-gray-400">Mon - Sat | 9:00 AM - 6:00 PM</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Follow Us</h4>
            <div className="flex justify-center lg:justify-start gap-4 mt-4 text-white">
              {[FaLinkedin, FaInstagram, FaTwitter, FaFacebookF, FaYoutube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:scale-110 transition-transform duration-300 hover:text-[#FBBF24]"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-white/20 my-10" />

        <div className="text-center lg:text-left text-sm text-gray-400 space-y-4">
          <p>© {new Date().getFullYear()} Vizora. All rights reserved.</p>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-4 underline">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookies Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;